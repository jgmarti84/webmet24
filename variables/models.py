# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Variable(models.Model):
    key = models.CharField('Clave', max_length=64, default='', unique=True)
    value = models.CharField('Valor', max_length=256, default='')

    def __str__(self):
        return '{} - {}'.format(self.key, self.value)

    class Meta:
        verbose_name = 'Variable'
        verbose_name_plural = 'Variables'
