# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, status
from django.shortcuts import render
from social.models import Like
from rest_framework.decorators import action
from rest_framework.response import Response

class SocialViewSets(viewsets.GenericViewSet):
    queryset = Like.objects.all().order_by('id')

    @action(detail=False, methods=['post'])
    def like(self, request):
        url_id = "OMkn5vfm"
        like = Like.objects.filter(user=request.user, look__url_id=url_id)
        print like
        return Response({}, status=status.HTTP_200_OK)
