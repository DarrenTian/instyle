from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from style.models import Style, StyleImage, StyleImageAnnotation
from style.serializers import StyleSerializer, StyleImageSerializer, StyleImageAnnotationSerializer
from user.models import User
import pprint
import json

class StyleImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = StyleImage.objects.all().order_by('id')
    serializer_class = StyleImageSerializer

class StyleImageAnnotationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = StyleImageAnnotation.objects.all().order_by('id')
    serializer_class = StyleImageAnnotationSerializer

class StyleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Style.objects.all().order_by('id')
    serializer_class = StyleSerializer
   
    def create(self, request):
    	user = request.user
    	if not isinstance(user, User):
    		return Response({}, status=status.HTTP_400_BAD_REQUEST)
        style = Style(publisher=user)
        style.save()
    	return Response({"id":style.id}, status=status.HTTP_200_OK)

    # TODO: this approach is not very restful, but can consoliate all update into one single API and leave frontend logic simple.
    # TODO: right now only assumes we have a single image.
    def update(self, request, pk=None):
    	look_data = json.loads(request.body)
    	pprint.pprint(look_data)
    	style = self.get_object()
    	self._update(look_data)
    	return Response({}, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
    	user = request.user
    	if not isinstance(user, User):
    		return Response({}, status=status.HTTP_400_BAD_REQUEST)
    	style = self.get_object()
    	if not style.publisher == user:
    		return Response({}, status=status.HTTP_400_BAD_REQUEST)

    	style.delete()
    	return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['post'])
    def from_user(self, request):
        user = request.user
        styles = StyleSerializer(Style.objects.all().filter(publisher=user), many=True)
        return Response(styles.data, status=status.HTTP_200_OK)

    def _update_products(self, look_data):
    	# TODO: update products by look_data
    	print "updating products"

    def _update(self, look_data):
    	# Create/Update product
    	self._update_products(look_data)
    	#self._update_tags()
    	#self._update_images()
    	#self._update_look()

    	print "updating"