from django.db.models import fields

from .status_choices import StatusChoices

class StatusField(fields.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 1
        kwargs['choices'] = StatusChoices.choices
        kwargs['default'] = StatusChoices.WATTING
        super().__init__(*args, **kwargs)