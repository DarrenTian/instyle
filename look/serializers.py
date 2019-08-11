from rest_framework import serializers
from look.models import Look, LookImage, Tag, Product
from user.models import User

class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Product
		fields = ['url', 'title', 'price']

class TagSerializer(serializers.ModelSerializer):
	product = ProductSerializer(read_only=True)
	class Meta:
		model = Tag
		fields = ['id', 'coor_x', 'coor_y', 'product']

class LookImageSerializer(serializers.ModelSerializer):
	tags = TagSerializer(many=True, read_only=True)
	class Meta:
		model = LookImage
		fields = ['id', 'image', 'tags']

class CustomUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['nickname', 'avatar_image']

class LookSerializer(serializers.ModelSerializer):
	#publisher = serializers.CharField(source='publisher.username')
	look_images = LookImageSerializer(many=True, read_only=True)
	publisher = CustomUserSerializer(read_only=True)
	
	class Meta:
		model = Look
		fields = [
			# 'url', Cause issue without request context \
			'id',
			'url_id',
			'title',
			'description',
			'publisher',
			'publish_date',
			'publish_status',
			'look_images',
		]