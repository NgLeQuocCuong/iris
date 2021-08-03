import uuid
from django.db import models
from utils.fields import (status, timestamp)

class BaseModel(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    status = status.StatusField()

    created_at = timestamp.TimeStamp(
        auto_now_add=True,
        auto_now=False
    )

    updated_at = timestamp.TimeStamp(
        auto_now_add=False,
        auto_now=True
    )

    class Meta:
        abstract = True
