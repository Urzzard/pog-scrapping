from rest_framework import serializers
from .models import SteamGdata, EpicGdata

class SteamGdataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SteamGdata
        fields = '__all__'

class EpicGdataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EpicGdata
        fields = '__all__'
        

