# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import *
# Register your models here.

class RadarImageAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'
    empty_value_display = '-S/D-'
    exclude = ()
    list_filter = ('radar', 'date', 'polarimetric_var','show_me')
    list_display = ('radar', 'date', 'polarimetric_var','show_me')


class ReferenceInline(admin.TabularInline):
    model = Reference
    exclude = ('unit','description')


class RadarProductAdmin(admin.ModelAdmin):
    empty_value_display = '-S/D-'
    exclude = ()
    inlines = [
        ReferenceInline,
    ]
    list_filter = ('enabled',)
    search_fields = ('product_key', 'product_title')
    list_display = ('product_key', 'product_title', 'enabled')


admin.site.register(Radar)
admin.site.register(Estrategia)
admin.site.register(Volumen)
admin.site.register(RadarImage,RadarImageAdmin)
admin.site.register(RadarProduct,RadarProductAdmin)
