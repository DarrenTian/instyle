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
		fields = ['id', 'image_thumbnail', 'tags']

class CustomUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['nickname', 'avatar_image_thumbnail']

class LookSerializer(serializers.ModelSerializer):
	#publisher = serializers.CharField(source='publisher.username')
	look_images = LookImageSerializer(many=True, read_only=True)
	publisher = CustomUserSerializer(read_only=True)
	num_likes = serializers.SerializerMethodField()
	
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
			'num_likes',
		]

	def get_num_likes(self, obj):
		return obj.like_set.count()