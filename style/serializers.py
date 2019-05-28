from style.models import Style, StyleImage, StyleImageAnnotation
from rest_framework import serializers
from django.contrib.auth.models import User

class StyleImageAnnotationSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImageAnnotation
		fields = ['style_image', 'product_url', 'product_image_url', 'coor_x', 'coor_y']

class StyleImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImage
		fields = ['style', 'image']

class StyleSerializer(serializers.ModelSerializer):
	#publisher = serializers.CharField(source='publisher.username')

	class Meta:
		model = Style
		fields = [
			'title',
			'credit',
			'credit_link',
			'description',
			'publisher',
			'publish_date', 
		]

