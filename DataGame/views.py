from django.shortcuts import render
from rest_framework import viewsets
from .models import SteamGdata, EpicGdata
from .serializers import SteamGdataSerializer, EpicGdataSerializer

# Create your views here.

class SteamGdataViewSet(viewsets.ModelViewSet):
    queryset = SteamGdata.objects.all()
    serializer_class = SteamGdataSerializer

class EpicGdataViewSet(viewsets.ModelViewSet):
    queryset = EpicGdata.objects.all()
    serializer_class = EpicGdataSerializer


