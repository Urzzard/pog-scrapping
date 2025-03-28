from django.db import models

# Create your models here.

class SteamGdata(models.Model):
    id_game = models.CharField(max_length=500, unique=True, null=False)
    name = models.CharField(max_length=255)
    nprice = models.DecimalField(max_digits=10, decimal_places=2)
    oprice = models.DecimalField(max_digits=10, decimal_places=2)
    img = models.CharField(max_length=300)
    link = models.CharField(max_length=300)
    
    def __str__(self):
        return self.name
    
class EpicGdata(models.Model):
    name = models.CharField(max_length=255)
    nprice = models.DecimalField(max_digits=10, decimal_places=2)
    oprice = models.DecimalField(max_digits= 10, decimal_places=2)
    img = models.CharField(max_length=300)
    link = models.CharField(max_length=300)

    def __str__(self):
        return self.name