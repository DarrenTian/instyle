from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets
from style.models import Style, StyleImage, StyleImageAnnotation
from style.serializers import StyleSerializer,StyleReadSerializerNested, StyleImageSerializer, StyleImageAnnotationSerializer
from rest_framework.response import Response
import logging

class StyleViewSet(viewsets.ModelViewSet):
    queryset = Style.objects.all().order_by('id')
    serializer_class = StyleSerializer

    def list(self, request):
    	return Response(StyleReadSerializerNested(Style.objects.all(), many=True, context={'request': request}).data)

    def retrieve(self, request, pk=None):
    	style_queryset = Style.objects.all()
    	style = get_object_or_404(style_queryset, pk=pk)
    	style_serializer = StyleReadSerializerNested(style, context={'request': request})
    	return Response(style_serializer.data)

    def update(self, request, pk=None):
    	pass

    def partial_update(self, request, pk=None):
    	pass

    def destroy(self, request, pk=None):
    	pass


class StyleImageViewSet(viewsets.ModelViewSet):
	queryset = StyleImage.objects.all().order_by('id')
	serializer_class = StyleImageSerializer

class StyleImageAnnotationViewSet(viewsets.ModelViewSet):
	queryset = StyleImageAnnotation.objects.all().order_by('id')
	serializer_class = StyleImageAnnotationSerializer
		