# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand, CommandError
from api_radares.models import Radar, RadarImage
import sys, os
from dateutil import parser
from django.core.files import File
from time import time
from shutil import copyfile
from django.conf import settings


# Old images Colmax_RMA1_0117_01_TH_20170228T141917Z.png
# New images RMA5_9005_03_20170727T200850Z_1.98_COLMAX.png

class Command(BaseCommand):
    help = '''
    Carga las imagenes de radar desde la carpeta que se pasa en el comando:
    manage.py addimages '/path/delas/imagenes'
    Suponemos que las imagenes tienen el formato:
    '''

    def handle(self, *args, **options):
        # TODO: CUANDO LOS RADARES NO ESTAN ACTiVOS, EL SHOWME (de RadarImage) ESTA EN FALSE
        ret_str = ''
        start_time = time()
        objs = []
        # source es donde se encuentran las imagenes
        source = "/app/website/new_radars_pngs"
        # media_path es donde esta el path del media
        media_path = "/app/website/media/radares/images"
        count_files = 0
        for path, subdirs, files in os.walk(source):
            for name in files:
                if name.endswith(".png"):
                    error = False
                    try:
                        count_files += 1
                        #RMA5_9005_03_20170727T200850Z_1.98_COLMAX.png
                        radar_code, strategy, scanning, date, sweep, polarimetric_var = name.split("_")
                        try:
                            radar = Radar.objects.get(code=radar_code)
                            if radar.is_active:
                                show = True
                            else:
                                show = False
                        except:
                            show = False
                        dt = parser.parse(date)
                        # Copy image
                        folder = os.path.join(str(radar_code), str(strategy), str(dt.year), str(dt.month), str(dt.day), name)
                        new_path = os.path.join(media_path, folder)
                        old_path = os.path.join(path, name)
                    except Exception as e:
                        print('Error procesando nombre: {}'.format(e))
                        error = True
                    if not error:
                        os.renames(old_path, new_path)
                        radar_image = RadarImage(radar=radar,
                                                 image=os.path.join("radares/images", folder),
                                                 polarimetric_var=polarimetric_var.replace(".png", ""),
                                                 date=dt,
                                                 strategy=strategy,
                                                 scanning=scanning,
                                                 sweep=sweep,
                                                 show_me=show
                                                 )
                        try:
                            radar_image.save()
                        except:
                            print('Error en {}'.format(name))
                            ret_str += ret_str + '\n Error en {}'.format(name)
                            shutil.move(new_path,old_path)

                    #                    if len(objs) == 999:
                    #                        RadarImage.objects.bulk_create(objs)
                    #                        del objs[:]
        #RadarImage.objects.bulk_create(objs)
        #del objs[:]
        elapsed_time = time() - start_time
        print ("Listo. Elapsed time: {:0.10f} minutos. Archivos: {}.\n Errores: {}".format(elapsed_time / 60, count_files,ret_str))
