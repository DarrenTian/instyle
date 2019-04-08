from style.models import Style, StyleImageAnnotation
from rest_framework import serializers

class StyleImageAnnotationSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImageAnnotation
		fields = ['url', 'image_url', 'coor_x', 'coor_y']

class StyleSerializer(serializers.ModelSerializer):
	style_image_annotations = StyleImageAnnotationSerializer(many=True)

	class Meta:
		model = Style
		fields = [
			'url', 
			'title',
			'credit',
			'credit_link',
			'description',
			'publish_date',
			'style_image_url', 
			'style_image_annotations',
		]
