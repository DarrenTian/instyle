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
    	return Response({}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def from_user(self, request):
        user = request.user
        styles = StyleSerializer(Style.objects.all().filter(publisher=user), many=True)
        return Response(styles.data, status=status.HTTP_200_OK)

def welcome(request):
	return render(request, 'style/welcome.html', {})

def new_style(request):
	if request.method == 'POST' and request.FILES['style_image']:
		# style_image = request.FILES['style_image']
		# fs = FileSystemStorage()
		# filename = fs.save(style_image.name, style_image)
		# uploaded_file_url = fs.url(filename)

		# new_style = Style()
		# new_style.style_image_url = uploaded_file_url
		# new_style.save()
		# image_id = str(new_style.pk)
		image_id = '13'
		return redirect('/style/'+image_id+'/edit')
	return render(request, 'style/new.html')

def edit_style(request, style_id):
	style = Style.objects.get(id=style_id)
	context = { 'style': style }
	return render(request, 'style/edit.html', context)