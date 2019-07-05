from style.models import Style, StyleImage, StyleImageAnnotation
from rest_framework import serializers
from django.contrib.auth.models import User

class StyleImageAnnotationSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImageAnnotation
		fields = ['style_image', 'url', 'image_url', 'coor_x', 'coor_y', 'title', 'price']

class StyleImageSerializer(serializers.ModelSerializer):
	style_image_annotations = StyleImageAnnotationSerializer(many=True, read_only=True)
	class Meta:
		model = StyleImage
		fields = ['style', 'image', 'style_image_annotations']

class CustomUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name', 'email']

class StyleSerializer(serializers.ModelSerializer):
	#publisher = serializers.CharField(source='publisher.username')
	style_images = StyleImageSerializer(many=True, read_only=True)
	publisher = CustomUserSerializer(read_only=True)

	class Meta:
		model = Style
		fields = [
			# 'url', Cause issue without request context 
			'title',
			'credit',
			'credit_link',
			'description',
			'publisher',
			'publish_date',
			'style_images',
		]