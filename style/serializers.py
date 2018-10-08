from style.models import Style
from rest_framework import serializers


class StyleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Style
        fields = ['url', 'style_image_url']
