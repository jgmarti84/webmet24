# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import *

class ReferenceInline(admin.TabularInline):
    model = Reference
    exclude = ('unit','description')


class WrfProductAdmin(admin.ModelAdmin):
    empty_value_display = '-S/D-'
    exclude = ()
    inlines = [
        ReferenceInline,
    ]
    list_filter = ('enabled',)
    search_fields = ('product_key', 'product_title')
    list_display = ('product_key', 'product_title', 'enabled')
# Register your models here.

#admin.site.register(WrfLayer)
admin.site.register(WrfProduct, WrfProductAdmin)
