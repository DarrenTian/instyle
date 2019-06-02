from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.HyperlinkedModelSerializer):
	#{
	#	"email":"abc@abc.com",
	#	"username":"abc",
	#	"password":"test1234"
	#}
	def validate_password(self, value):
		return make_password(value)
	
	class Meta:
		model = User
		fields = ('username', 'password', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('name')
