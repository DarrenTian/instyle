from django.core.files.storage import FileSystemStorage
from django.core import serializers
from django.core.files import File
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action, parser_classes
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from look.models import Look, LookImage, Tag, Product
from look.serializers import LookSerializer, LookImageSerializer, TagSerializer
from user.models import User
import pprint
import json


class LookImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = LookImage.objects.all().order_by('id')
    serializer_class = LookImageSerializer

class TagViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Tag.objects.all().order_by('id')
    serializer_class = TagSerializer

class LookViewSet(viewsets.ModelViewSet):
    queryset = Look.objects.all().order_by('id')
    serializer_class = LookSerializer

# Look API restricted per user access.
class UserLookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows looks per user to be viewed or edited.
    """
    queryset = Look.objects.all().order_by('id')
    serializer_class = LookSerializer

    permission_classes = [IsAuthenticated]

    def list(self, request):
      user = request.user
      looks = LookSerializer(Look.objects.all().filter(publisher=user), many=True)
      return Response(looks.data, status=status.HTTP_200_OK)
   
    def create(self, request):
      user = request.user
      look = Look(publisher=user)
      look.save()
      return Response({"id":look.id}, status=status.HTTP_200_OK)

    # TODO: this approach is not very restful, but can consoliate all update into one single API and leave frontend logic simple.
    # TODO: right now only assumes we have a single image.
    def update(self, request, pk=None):
      look_data = json.loads(request.body)
      pprint.pprint(look_data)
      look = self.get_object()
      self._update(look_data)
      return Response(LookSerializer(look).data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
      user = request.user
      look = self.get_object()
      if not look.publisher == user:
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

      look.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['post'])
    @parser_classes([FileUploadParser])
    def set_image(self, request, pk=None):
      file = request.data['file']
      look = self.get_object()

      lookImage = LookImage()
      lookImage.look = look
      lookImage.image.save(file.name, file)

      lookImage.save()
      
      return Response(LookSerializer(look).data, status=status.HTTP_200_OK)

    # def _update_products(self, look_data):
    #   style = StyleSerializer(instance=self.get_object()).data
    #   pprint.pprint(json.dumps(style))
    #   # TODO: update products by look_data
    #   print "updating products"

    def _update_tags(self, look_data):
      if 'look_images' not in look_data or not len(look_data['look_images']) > 0:
        return
      cover_image = look_data['look_images'][0]

      if 'tags' not in cover_image:
        return
      tags = cover_image['tags']

      for tag in tags:
        # update existing tag
        updatable_tag = None
        if "id" in tag:
          tag_id = tag["id"]
          updatable_tag = Tag.objects.get(id=tag_id)
        # creating new tag
        else :
          look_image_id = cover_image['id']
          look_image = LookImage.objects.get(id=look_image_id)
          updatable_tag = Tag()
          product = Product()
          product.save()
          updatable_tag.product = product
          updatable_tag.look_image = look_image

        product = updatable_tag.product
        product.title = tag["product"]["title"]
        product.price = tag["product"]["price"]
        product.url = tag["product"]["url"]
        product.save()
        updatable_tag.coor_x = tag["coor_x"]
        updatable_tag.coor_y = tag["coor_y"]
        updatable_tag.save()

    def _update_look(self, look_data):
      look = self.get_object()
      look.description = look_data["description"]
      look.save()

    def _update(self, look_data):
      # TODO: Create/Update product, current model doesn't have product model yet
      # self._update_products(look_data)
      self._update_tags(look_data)
      #self._update_images()
      self._update_look(look_data)

      print "updating"