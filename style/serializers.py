from style.models import Style, StyleImage, StyleImageAnnotation
from rest_framework import serializers

class StyleImageAnnotationSerializer(serializers.ModelSerializer):
	class Meta:
		model = StyleImageAnnotation
		fields = ['style_image', 'url', 'image_url', 'coor_x', 'coor_y', 'title', 'price']

class StyleImageSerializer(serializers.ModelSerializer):
	style_image_annotations = StyleImageAnnotationSerializer(many=True, read_only=True)
	class Meta:
		model = StyleImage
		fields = ['style', 'image', 'style_image_annotations']

class StyleSerializer(serializers.ModelSerializer):
	#publisher = serializers.CharField(source='publisher.username')
	style_images = StyleImageSerializer(many=True, read_only=True)

	class Meta:
		model = Style
		fields = [
			'url', 
			'title',
			'credit',
			'credit_link',
			'description',
			'publisher',
			'publish_date',
			'style_images',
		]
		depth = 2
