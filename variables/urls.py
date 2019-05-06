#!/usr/bin/python
# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
                url(r'(?P<key>[\w-]+)$', views.get_value, name='get_value'),
               ]
