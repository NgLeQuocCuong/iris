from rest_framework import serializers

from .models import Interaction


class InteractionSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Interaction
        fields = ('uid', 'name', 'rating', 'content', 'header', 'updated_at' )

    def get_name(self, instance):
        return instance.user.name
