# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand, CommandError
from api_radares.models import Radar, RadarImage
import sys, os
from dateutil import parser
from django.core.files import File
from time import time
from shutil import copyfile
from django.conf import settings

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
        POLARIMETRICS_VARS = {'TH': 'TH',
                             'DBZH':'TH',
                             'TV':'TV',
                             'TDR':'TDR',
                             'PHIDP':'PHIDP',
                             'KDP':'KDP',
                             'RHOHV':'RHOHV',
                             'VRAD':'VRAD',
                             'WRAD':'WRAD',
                             'HID':'HID'}
        objs = []
        print options['path'][0]
        count_folders=0
        count_files = 0
        work_path=None;
        len_basepath = -1
        for path, subdirs, files in os.walk(options['path'][0]):
            if len_basepath < 0:
                len_basepath = len(path)
            if '-loaded' in path:
                self.stdout.write(self.style.SUCCESS('Salteando {}'.format(path)))
                continue
            for name in files:
                self.stdout.write(self.style.SUCCESS('Current path {}'.format(os.path.abspath(name))))
                self.stdout.write(self.style.ERROR('Current file {} in {}'.format(name, work_path)))
                if work_path == None:
                    work_path = path
                if (path!=work_path):
                    RadarImage.objects.bulk_create(objs)
                    del objs[:]
                    new_path = str(work_path) + '-loaded/'
                    old_path = str(work_path)+ '/'
                    self.stdout.write(self.style.SUCCESS('Cambiando nombre de {} a {}'.format(old_path, new_path)))
                    os.rename(old_path, new_path)
                    work_path = path


                #self.stdout.write(self.style.SUCCESS('{}/{} '.format(path, name, )))

                if name.endswith(".png"):
                    count_files+=1

                    img_source,radar_code, strategy, scanning, polarimetric_var, date = name.split("_")
                    radar = Radar.objects.get(code=radar_code)
                    dt = parser.parse(date.replace(".png", ""))
                    #Copy image
                    radar_image = RadarImage(radar=radar,
                                             image=os.path.join('radares/images/', name),
                                             polarimetric_var=POLARIMETRICS_VARS[polarimetric_var],
                                             strategy=strategy,
                                             scanning=scanning,
                                             date=dt)
                    src = os.path.abspath(name)
                    dst = os.path.join(settings.MEDIA_ROOT,'radares/images/', name)
                    copyfile(src, dst)
                    objs.append(radar_image)
#                    if len(objs) == 999:
#                        RadarImage.objects.bulk_create(objs)
#                        del objs[:]
        if work_path!=None:
            RadarImage.objects.bulk_create(objs)
            del objs[:]
            new_path = str(work_path) + '-loaded/'
            old_path = str(work_path)+ '/'
            self.stdout.write(self.style.SUCCESS('Cambiando nombre de {} a {}'.format(old_path, new_path)))
            os.rename(old_path, new_path)
        elapsed_time = time() - start_time
        self.stdout.write(self.style.SUCCESS("Listo. Elapsed time: {:0.10f} minutos. Archivos: {}".format(elapsed_time/60,count_files)))
