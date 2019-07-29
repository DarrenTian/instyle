from rest_framework import viewsets, status
from django.contrib.auth.models import Group
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from user.models import User
from user.serializers import UserSerializer, UserProfileSerializer, GroupSerializer

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
                response = {}
                response['token'] = token.key
                return Response(response, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

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
        print request.body
        return Response({}, status=status.HTTP_200_OK)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer