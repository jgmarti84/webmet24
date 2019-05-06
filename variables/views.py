# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import  HttpResponse
from django.shortcuts import render
from .models import *
# Create your views here.
from django.contrib.auth.decorators import login_required


@login_required(login_url='/account/login')
def get_value(request, key):
    try:
        val = Variable.objects.get(key = key)
        return HttpResponse(val.value)
    except:
        return HttpResponse('Error')
