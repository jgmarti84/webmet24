from django import template
from variables.models import Variable


register = template.Library()



@register.simple_tag()
def ret_var(value):
    try:
        return Variable.objects.get(key=value).value
    except:
        return None

@register.assignment_tag
def asign_var(variable):
    try:
        return Variable.objects.get(key=variable).value
    except:
        return None

@register.assignment_tag
def asign_boolean_var(variable):
    try:
        if (int(Variable.objects.get(key=variable).value)==1):
            return True
    except:
        pass
    return False
