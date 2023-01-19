#!/bin/bash
python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py makemigrations api_wrf
python manage.py makemigrations api_estaciones
python manage.py makemigrations api_radares
python manage.py makemigrations frontend
python manage.py makemigrations variables
python manage.py migrate

python manage.py createsuperuser
#python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin','admin@admin.com', 'radar2017')"

# dump database
# python manage.py dumpdata --natural-foreign --natural-primary -e auth.permission -e contenttypes -e sessions -e admin -e api_radares.RadarImage --indent=4 > db_bak.json
python manage.py loaddata ./deploy/init_database_data.json