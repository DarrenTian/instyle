from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.HyperlinkedModelSerializer):
	#{
	#	"email":"abc@abc.com",
	#	"username":"abc",
	#	"password":"test1234"
	#}
	email = serializers.EmailField(
		required=True,
		validators=[UniqueValidator(queryset=User.objects.all())])
	username = serializers.CharField(
		validators=[UniqueValidator(queryset=User.objects.all())])
	password = serializers.CharField(min_length=8)

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['username'], validated_data['email'], 
			validated_data['password'])
		return user

	class Meta:
		model = User
		fields = ('username', 'email', 'password')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
