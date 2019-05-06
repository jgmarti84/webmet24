"""Radar URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import (login, password_reset,
                                       password_reset_done,
                                       password_reset_complete,
                                       password_reset_confirm)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'account/', include('account.urls', namespace='account')),
    url(r'', include('frontend.urls', namespace='frontend')),
    url(r'^reset/password_reset/$',
        password_reset,
        {'template_name': 'password_reset_form.html', 'email_template_name': 'password_reset_email.html'},
        name='password_reset'),
    url(r'^reset/password_reset_done/$',
        password_reset_done,
        {'template_name': 'password_reset_done.html'},
        name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',
        password_reset_confirm,
        {'template_name': 'password_reset_confirm.html'},
        name='password_reset_confirm'),
    url(r'^reset/done/$',
        password_reset_complete,
        {'template_name': 'password_reset_complete.html'},
        name='password_reset_complete'),
    url(r'^log$', login, {'template_name': 'login.html'}, name='login'),
    url(r'api_radares/', include('api_radares.urls')),
    url(r'api_estaciones/', include('api_estaciones.urls')),
     url(r'var/', include('variables.urls')),
]
if (settings.DEBUG):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


