from django.db import models

class StatusChoices(models.TextChoices):
    ACTIVE = 'A'
    WATTING = 'W'
    REMOVE = 'R'