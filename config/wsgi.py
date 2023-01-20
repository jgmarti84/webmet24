"""
WSGI config for Radar project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os
import environ
from django.core.wsgi import get_wsgi_application
env = environ.Env()

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
settings = env.str('DJANGO_SETTINGS', 'production')
print("settings", settings)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', "config.%s" % (settings))

application = get_wsgi_application()
