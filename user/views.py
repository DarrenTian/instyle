from rest_framework import viewsets, status
from django.contrib.auth.models import Group
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action, parser_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FileUploadParser
from user.models import User
from user.serializers import UserSerializer, UserProfileSerializer, GroupSerializer
import os
import time

# Login
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'profile': UserProfileSerializer(user).data,
        })

class UserViewSet(viewsets.GenericViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def sign_up(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                return Response({
                    'token': token.key,
                    'profile': UserProfileSerializer(user).data,
                }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserProfileSerializer

    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def get_profile(self, request):
        user = request.user
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'profile': UserProfileSerializer(user).data,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def update_profile(self, request):
        user = request.user
        profile = request.data
        user.nickname = profile['nickname']
        user.biography = profile['biography']
        token, created = Token.objects.get_or_create(user=user)
        try:
            user.save()
        except Exception as e:
            return Response({
                'error': "Please try another one",
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'token': token.key,
            'profile': UserProfileSerializer(user).data,
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    @parser_classes([FileUploadParser])
    def set_avatar_image(self, request):
        user = request.user
        token, created = Token.objects.get_or_create(user=user)
        file = request.data['file']
        name, extension = os.path.splitext(file.name)
        if user.avatar_image!="default/logo_transparent.png":
            user.avatar_image.delete()
        user.avatar_image.save('avatar/'+user.user_id + '-' + str(int(time.time())) + extension, file)
        user.save()
        return Response({
            'token': token.key,
            'profile': UserProfileSerializer(user).data,
        }, status=status.HTTP_200_OK)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer