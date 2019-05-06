from django import template
from django.conf import settings
from django.contrib.auth.models import User, Group

register = template.Library()

@register.simple_tag
def url_site():
    '''
        return the url configured into settings.py
        'USED_URL'
    '''
    return settings.USED_URL
