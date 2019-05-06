# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.

class Station(models.Model):
    code = models.CharField('Código de la estación', max_length=64, unique=True)
    title = models.CharField('Título de la estación', max_length=128)
    description = models.CharField('Descripción', max_length=128)
    brand_name = models.CharField('Marca', max_length=64)
    lat = models.DecimalField('Latitud', max_digits=12, decimal_places=8)
    long = models.DecimalField('Longitud ', max_digits=12, decimal_places=8)

    def __str__(self):
        return '{} {}'.format(self.title, self.code)

    class Meta:
        verbose_name = 'Estación'
        verbose_name_plural = 'Estaciones'


class Measure(models.Model):
    station = models.ForeignKey(Station)
    date = models.DateTimeField('Fecha', auto_now=False)
    temperature = models.DecimalField('Temperatura', max_digits=8, decimal_places=2)
    humidity = models.DecimalField('Humedad', max_digits=8, decimal_places=2)
    pressure = models.DecimalField('Presión', max_digits=8, decimal_places=2)
    wind_speed_max = models.DecimalField('Dirección de viento en rafaga máxima', max_digits=8, decimal_places=2)
    wind_speed_avg = models.DecimalField('Dirección de viento promedio', max_digits=8, decimal_places=2)
    wind_deg_max = models.DecimalField('Velocidad de viento en rafaga máxima', max_digits=8, decimal_places=2)
    wind_deg_avg = models.DecimalField('Velocidad de viento en promedio', max_digits=8, decimal_places=2)
    rain = models.DecimalField('Lluvia acumulada', max_digits=8, decimal_places=2)

    def __str__(self):
        return '{} - {}'.format(self.station, self.date)

    class Meta:
        verbose_name = 'Medición'
        verbose_name_plural = 'Mediciones'
