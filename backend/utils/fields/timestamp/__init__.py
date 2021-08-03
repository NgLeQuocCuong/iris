from datetime import datetime
from django.utils import timezone
from django.db.models import fields

TIMEZONE = timezone.get_default_timezone()

class TimeStamp(fields.DateTimeField):
    def pre_save(self, instance, add):
        if (self.auto_now) or (self.auto_now_add and add):
            value = timezone.now()
        else:
            value = getattr(instance, self.attname)
            if not isinstance(value, datetime):
                value = datetime.fromtimestamp(int(value), tz=TIMEZONE)
        setattr(instance, self.attname, value)
        return value
