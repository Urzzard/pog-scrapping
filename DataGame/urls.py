from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SteamGdataViewSet, EpicGdataViewSet
from . import scrap

router = DefaultRouter()
router.register(r'Steam', SteamGdataViewSet, 'steam')
router.register(r'Epic', EpicGdataViewSet, 'epic')

urlpatterns = [
    path('', scrap.scrap_steam, name="inicio"),
    path('epic/', scrap.scrap_epic, name="epic"),
    path('api/v1/', include(router.urls)),
]
