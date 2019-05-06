from django.conf.urls import url, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'station', views.StationView, 'station_view')
router.register(r'measure', views.MeasureView, 'measure_view')

urlpatterns = [
               url(r'^', include(router.urls, namespace='estacion')),
               url(r'^dummy/showstation',views.get_data_station, name='showstation')
               ]
