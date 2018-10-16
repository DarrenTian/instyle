from django.http import HttpResponse
from django.shortcuts import render
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
