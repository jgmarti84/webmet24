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
    “radar”_“estrategia”_“nro de barrido”_“variable polarimétrica”_“fecha y hora UTC”.png
    '''

    def add_arguments(self, parser):
        parser.add_argument('path', nargs='+', type=str)

    def handle(self, *args, **options):
        start_time = time()
        objs = []
        # source es donde se encuentran las imagenes
        source = "/app/website/media/radares/historic_images"
        # media_path es donde esta el path del media
        media_path = "/app/website/media/radares/historical_images"
        count_files = 0
        for path, subdirs, files in os.walk(source):
            for name in files:
                if name.endswith(".png"):
                    count_files += 1
                    #RMA5_9005_03_20170727T200850Z_1.98_COLMAX.png
                    #Colmax_RMA1_0117_01_TH_20170228T141917Z.png
                    error = True
                    try:
                        colmax, radar_code, strategy, scanning, polarimetric_var, date = name.split("_")
                        try:
                            radar = Radar.objects.get(code=radar_code)
                            if radar.is_active:
                                show = True
                            else:
                                show = False
                        except:
                            show = False
                        dt = parser.parse(date.replace(".png", ""))
                        # Copy image
                        folder = os.path.join(str(radar_code), str(dt.year), str(dt.month), str(dt.day), name)
                        new_path = os.path.join(media_path, folder)
                        old_path = os.path.join(path, name)
                        print old_path
                        print new_path
                        error = False
                    except:
                        print name.split("_")

                    if not error:
                        os.renames(old_path, new_path)
                        #shutil.move(old_path, new_path)
                        radar_image = RadarImage(radar=radar,
                                                 image=os.path.join("radares/historic_images", folder),
                                                 polarimetric_var='COLMAX', #polarimetric_var.replace(".png", ""),
                                                 date=dt,
                                                 strategy=strategy,
                                                 scanning=scanning,
                                                 sweep=0,
                                                 show_me=show
                                                 )
                        objs.append(radar_image)
                        #                    if len(objs) == 999:
                        #                        RadarImage.objects.bulk_create(objs)
                        #                        del objs[:]
        RadarImage.objects.bulk_create(objs)
        del objs[:]
        elapsed_time = time() - start_time
        print "Listo. Elapsed time: {:0.10f} minutos. Archivos: {}".format(elapsed_time / 60, count_files)
