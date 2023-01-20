from os.path import dirname, isfile
import environ
from .common import *

ROOT_DIR = environ.Path(dirname(dirname(dirname(__file__))))

env = environ.Env()

if isfile(ROOT_DIR('.env')):
    env.read_env(ROOT_DIR('.env'))

DEBUG = env.bool("DEBUG", False)

DOMAIN = env.list('DOMAIN', default=[])
# USED_URL = 'webmet.ohmc.ar:8080/'
ALLOWED_HOSTS = DOMAIN + ['127.0.0.1', 'localhost']

# Database
DATABASES = {
    'default': {
        'ENGINE': env.str("DB_ENGINE", 'django.db.backends.postgresql_psycopg2'),
        'NAME': env.str("DB_NAME", 'webmet'),
        'USER': env.str("DB_USER", 'webmet'),
        'PASSWORD': env.str("DB_PASS", 'gu3bm3t'),
        'HOST': env.str("DB_HOST", '127.0.0.1'),
        'PORT': env.int("DB_PORT", '5432'),        

    },
}

DEBUG_LEVEL = env.str('DEBUG_LEVEL', 'INFO')

EMAIL_BACKEND = env.str(
    'EMAIL_BACKEND',
    'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = env.str('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = env.int('EMAIL_PORT', 587)
EMAIL_HOST_USER = env.str('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = env.str('EMAIL_HOST_PASSWORD', '')
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = 'Equipo de Radar %s' % (EMAIL_HOST_USER)
EMAIL_SUPPORT = env.str('EMAIL_SUPPORT', '')


# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "root": {"level": DEBUG_LEVEL, "handlers": ["file"]},
#     "handlers": {
#         # 'common': {
#         #     'class': 'logging.StreamHandler',
#         #     'stream': sys.stdout,
#         #     # 'formatter': 'simple',
#         #     'level': 'DEBUG'},

#         "file": {
#             "level": DEBUG_LEVEL,
#             "class": "logging.FileHandler",
#             "filename": "/app/logs/django.log",
#             "formatter": "app",
#         },
#     },
#     "loggers": {
#         "django": {
#             "handlers": ["file"],
#             "level": DEBUG_LEVEL,
#             "propagate": True
#         },
#     },
#     "formatters": {
#         "app": {
#             "format": (
#                 u"%(asctime)s [%(levelname)-8s] "
#                 "(%(module)s.%(funcName)s) %(message)s"
#             ),
#             "datefmt": "%Y-%m-%d %H:%M:%S",
#         },
#     },
# }
