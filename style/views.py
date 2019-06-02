from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets
from style.models import Style, StyleImage, StyleImageAnnotation
from style.serializers import StyleSerializer,StyleImageSerializer, StyleImageAnnotationSerializer
from rest_framework.response import Response
import logging

class StyleViewSet(viewsets.ModelViewSet):
    queryset = Style.objects.all().order_by('id')
    serializer_class = StyleSerializer


class StyleImageViewSet(viewsets.ModelViewSet):
	queryset = StyleImage.objects.all().order_by('id')
	serializer_class = StyleImageSerializer

class StyleImageAnnotationViewSet(viewsets.ModelViewSet):
	queryset = StyleImageAnnotation.objects.all().order_by('id')
	serializer_class = StyleImageAnnotationSerializer
		