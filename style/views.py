from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets
from style.models import Style
from style.serializers import StyleSerializer

class StyleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Style.objects.all().order_by('id')
    serializer_class = StyleSerializer

def style(request, style_id):
	style = Style.objects.get(id=style_id)
	context = { 'style': style }
	return render(request, 'style/style.html', context)

def new_style(request):
	if request.method == 'POST' and request.FILES['style_image']:
		style_image = request.FILES['style_image']
		fs = FileSystemStorage()
		filename = fs.save(style_image.name, style_image)
		uploaded_file_url = fs.url(filename)

		new_style = Style()
		new_style.style_image_url = uploaded_file_url
		new_style.save()
		return redirect('/style/'+str(new_style.pk)+'/edit')
	return render(request, 'style/new.html')

def edit_style(request, style_id):
	style = Style.objects.get(id=style_id)
	context = { 'style': style }
	return render(request, 'style/edit.html', context)