from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.HyperlinkedModelSerializer):
	#{
	#	"email":"abc@abc.com",
	#	"username":"abc",
	#	"password":"test1234"
	#}
    class Meta:
        model = User
        fields = ('username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('name')
