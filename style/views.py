from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.core.files import File
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from rest_framework.decorators import action, parser_classes
from rest_framework.parsers import FileUploadParser
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

# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# TODO: Restrict acess for editing requests
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

    @action(detail=True, methods=['post'])
    @parser_classes([FileUploadParser])
    def set_image(self, request, pk=None):
      file = request.data['file']
      style = self.get_object()

      styleImage = StyleImage()
      styleImage.style = style
      styleImage.image.save(file.name, file)

      styleImage.save()
      
      print style
      return Response({}, status=status.HTTP_200_OK)

    # def _update_products(self, look_data):
    #   style = StyleSerializer(instance=self.get_object()).data
    #   pprint.pprint(json.dumps(style))
    #   # TODO: update products by look_data
    #   print "updating products"

    def _update_tags(self, look_data):
      for tag in look_data["tags"]:
        # update existing tag
        annotation = None
        if "id" in tag:
          print "here 1"
          tag_id = tag["id"]
          annotation = StyleImageAnnotation.objects.get(id=tag_id)
        # creating new tag
        else :
          image_id = look_data["imageId"]
          style_image = StyleImage.objects.get(id=image_id)
          annotation = StyleImageAnnotation()
          annotation.style_image = style_image   

        annotation.title = tag["product"]["title"]
        annotation.price = tag["product"]["price"]
        annotation.url = tag["product"]["url"]
        annotation.coor_x = tag["coor_x"]
        annotation.coor_y = tag["coor_y"]
        annotation.save()

    def _update_look(self, look_data):
      style = self.get_object()
      style.description = look_data["description"]
      style.save()

    def _update(self, look_data):
      # TODO: Create/Update product, current model doesn't have product model yet
      # self._update_products(look_data)
      self._update_tags(look_data)
      #self._update_images()
      self._update_look(look_data)

      print "updating"