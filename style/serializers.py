from style.models import Style, StyleImage, StyleImageAnnotation
from rest_framework import serializers
from django.contrib.auth.models import User
from instyle import settings
from django.contrib.sites.shortcuts import get_current_site

class StyleImageAnnotationSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImageAnnotation
		fields = ['style_image', 'url', 'image_url', 'coor_x', 'coor_y', 'title', 'price']

class StyleImageSerializer(serializers.ModelSerializer):
	style_image_annotation = StyleImageAnnotationSerializer(read_only=True, many=True)
	class Meta:
		model = StyleImage
		fields = ['style', 'image', 'style_image_annotation']

class StyleSerializer(serializers.ModelSerializer):
	style_image = StyleImageSerializer(read_only=True, many=True)

	class Meta:
		model = Style
		fields = [
			'title',
			'credit',
			'credit_link',
			'description',
      'tags',
			'publisher',
			'publish_date',
			'style_image'	
		]