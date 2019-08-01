from django.contrib.auth.hashers import make_password

from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from user.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
	#{
	#	"email":"abc@abc.com",
	#	"password":"test1234"
	#}
	def validate_password(self, value):
		return make_password(value)
	
	class Meta:
		model = User
		fields = [
		  'email',
		  'password',
		  'nickname',
		]

class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = [
		  'email',
		  'nickname',
		  'avatar_image',
		  'biography',
		]

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('name')
