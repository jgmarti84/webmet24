# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class WrfLayer(models.Model):
    title = models.CharField('Título de la capa WRF', max_length=10, default='')
    description = models.CharField('Descripción', max_length=64)
    lat_point_1 = models.DecimalField('Latitud punto 1', max_digits=12, decimal_places=8)
    long_point_1 = models.DecimalField('Longitud punto 1', max_digits=12, decimal_places=8)
    lat_point_2 = models.DecimalField('Latitud punto 2', max_digits=12, decimal_places=8)
    long_point_2 = models.DecimalField('Longitud punto 2', max_digits=12, decimal_places=8)
    is_active = models.BooleanField('Radar activo?', default=True);

    def __str__(self):
        return '{} ({})'.format(self.product_key, self.product_title)

    class Meta:
        verbose_name = 'Capa WRF'
        verbose_name_plural = 'Capas WRF'
        ordering = ['title']

class WrfProduct(models.Model):
    product_key = models.CharField('Código de Producto WRF (Nombre de la imagen)', max_length=10, default='', unique=True)
    product_title = models.CharField('Título de Producto WRF', max_length=32, default='')
    product_description = models.TextField('Descripción de Producto', default='')
    enabled = models.BooleanField('Se muestra?', default=True)
    see_in_open = models.BooleanField('Mostrar al inicio', default=False)

    def __str__(self):
        return '{} ({})'.format(self.product_key, self.product_title)

    class Meta:
        verbose_name = 'Producto WRF'
        verbose_name_plural = 'Productos WRF'
        ordering = ['product_title']


class Reference(models.Model):
    product = models.ForeignKey(WrfProduct, related_name='references')
    title = models.CharField('Referencia', max_length=64, default='')
    description = models.CharField('Descripción', max_length=255, default='')
    unit = models.CharField('Unidad', max_length=64, default='')
    value = models.FloatField('Valor', default=0)
    color = models.CharField('Color (RGB con # al principio)', max_length=7, default='#000000')
    color_font = models.CharField('Color de texto (RGB con # al principio)', max_length=7, default='#FFFFFF')

    class Meta:
        ordering = ['-value']
        verbose_name = 'Referencia WRF'
        verbose_name_plural = 'Referencias WRF'
