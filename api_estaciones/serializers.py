from rest_framework import serializers
from .models import Station, Measure


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('code', 'title', 'description', 'brand_name', 'lat', 'long')
        extra_kwargs = {
            'url': {'view_name': 'station-detail', 'lookup_field': 'url'},
        }


class MeasureSerializer(serializers.HyperlinkedModelSerializer):
    station_code = serializers.ReadOnlyField(source='station.code', read_only=True)

    class Meta:
        model = Measure
        fields = ('station_code', 'date', 'temperature', 'humidity', 'pressure', 'wind_speed_max',
                  'wind_speed_avg', 'wind_deg_max', 'wind_deg_avg', 'rain')
        extra_kwargs = {
            'url': {'view_name': 'measure-detail', 'lookup_field': 'url'},
        }

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.context.get('request'),  # request object is passed here
            'format': self.format_kwarg,
            'view': self
        }

    def create(self, validated_data):
        station_code = self.context.get('request').data['code']
        station_obj = Station.objects.get(code=station_code)
        measure = Measure.objects.create(
            station=station_obj,
            date=validated_data['date'],
            temperature=validated_data['temperature'],
            humidity=validated_data['humidity'],
            pressure=validated_data['pressure'],
            wind_speed_max=validated_data['wind_speed_max'],
            wind_speed_avg=validated_data['wind_speed_avg'],
            wind_deg_max=validated_data['wind_deg_max'],
            wind_deg_avg=validated_data['wind_deg_avg'],
            rain=validated_data['rain'],
        )
        return measure
