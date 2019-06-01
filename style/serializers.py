from style.models import Style, StyleImage, StyleImageAnnotation
from rest_framework import serializers
from django.contrib.auth.models import User
from instyle import settings
from django.contrib.sites.shortcuts import get_current_site

class StyleImageAnnotationSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImageAnnotation
		fields = ['style_image', 'product_url', 'product_image_url', 'coor_x', 'coor_y']

class StyleImageAnnotationReadSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImageAnnotation
		fields = ['product_url', 'product_image_url', 'coor_x', 'coor_y']

class StyleImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImage
		fields = ['style', 'image']

class StyleImageReadSerializer(StyleImageSerializer):
    image = serializers.SerializerMethodField('get_image_url')
    def get_image_url(self, obj):
    	return ''.join(['http://', get_current_site(self.context['request']).domain, obj.image.url])

    class Meta:
		model = StyleImage
		fields = ['image']

class StyleImageReadSerializerNested(serializers.Serializer):
    image = serializers.SerializerMethodField('get_image_url')
    image_annotations = serializers.SerializerMethodField('get_image_annotation')
    def get_image_url(self, obj):
    	return ''.join(['http://', get_current_site(self.context['request']).domain, obj.image.url])

    def get_image_annotation(self, obj):
    	sia_qs = StyleImageAnnotation.objects.filter(style_image = obj)
    	sia_s = StyleImageAnnotationReadSerializer(sia_qs, many=True) 
    	return sia_s.data

    class Meta:
		fields = ['image', 'image_annotations']

class StyleSerializer(serializers.ModelSerializer):
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

	def create(self, validated_data):
		return Style.objects.create(**validated_data)

class StyleReadSerializerNested(serializers.Serializer):
	style = serializers.SerializerMethodField('get_style_description')
	images = serializers.SerializerMethodField('get_images_description')

	def get_style_description(self, obj):
		return StyleSerializer(obj).data

	def get_images_description(self, obj):
		style_image_queryset = StyleImage.objects.filter(style = obj)
		style_image_serializer = StyleImageReadSerializerNested(style_image_queryset, many=True, context={'request': self.context['request']})
		return style_image_serializer.data
		
	class Meta:
		fields = ['style', 'images']



