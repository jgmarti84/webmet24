# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
# Create your views here.
from api_radares.models import Radar, RadarImage, RadarProduct
from api_wrf.models import *

# @login_required(login_url='/account/login')
def home(request):
    context = {}
    context['radar_products'] = RadarProduct.objects.filter(enabled=True)
    context['wrf_layers'] = WrfLayer.objects.filter(is_active=True)
    context['wrf_products'] = WrfProduct.objects.filter(enabled=True)
    if request.GET:
        context['lat'] = request.GET.get('lat', False);
        context['long'] = request.GET.get('long', False);
        context['zoom'] = request.GET.get('zoom', False);
    return render(request, 'index.html',context)
