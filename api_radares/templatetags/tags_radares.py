from django import template
from api_radares.models import *


register = template.Library()



@register.filter
def format_ref(value):
    v = float(value)
    if (v%1)>0:
        if (v<1):
            return "{:.2f}".format(value)[1:]
        return "{:.1f}".format(value)
    return "{0:.0f}".format(value)

