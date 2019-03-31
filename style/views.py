from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets
from style.models import Style
from style.serializers import StyleSerializer
from json import loads

class StyleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Style.objects.all().order_by('id')
    serializer_class = StyleSerializer

def welcome(request):
	return render(request, 'style/welcome.html', {})

def style_rest_api(request, style_id):
	style = Style.objects.get(id=style_id)
	style_json = loads(serializers.serialize("json", [style,]))[0]['fields']
	return JsonResponse(style_json)

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