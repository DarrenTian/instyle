from style.models import Style
from rest_framework import viewsets
from style.serializers import StyleSerializer


class StyleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Style.objects.all().order_by('id')
    serializer_class = StyleSerializer