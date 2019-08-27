# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets, status
from django.shortcuts import render
from social.models import Like, Follow
from look.models import Look
from user.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
import json

class SocialViewSets(viewsets.GenericViewSet):
    queryset = Like.objects.all().order_by('id')

    @action(detail=False, methods=['post'])
    def like(self, request):
        like_request = json.loads(request.body)
        url_id = like_request['look_id']
        like_result = Like.objects.filter(user=request.user, look__url_id=url_id)
        if like_result.exists():
            pass
        else :
            try:
                look = Look.objects.filter(url_id=url_id)[:1].get()
                like = Like.objects.create(user=request.user, look=look)
            except Exception as e:    
                return Response({}, status=status.HTTP_400_BAD_REQUEST)
        return Response({}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def unlike(self, request):
        unlike_request = json.loads(request.body)
        url_id = unlike_request['look_id']
        like_result = Like.objects.filter(user=request.user, look__url_id=url_id)
        if like_result.exists():
            like_result.delete()
        return Response({}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def follow(self, request):
        follow_request = json.loads(request.body)
        user_id = follow_request['user_id']
        follow_result = Follow.objects.filter(followee=request.user, follower__nickname=user_id)
        if follow_result.exists():
            pass
        else :
            try:
                user = User.objects.filter(nickname=user_id)[:1].get()
                follow = Follow.objects.create(follower=request.user, followee=user)
            except Exception as e:    
                return Response({}, status=status.HTTP_400_BAD_REQUEST)
        return Response({}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def unfollow(self, request):
        unfollow_request = json.loads(request.body)
        user_id = unfollow_request['user_id']
        unfollow_result = Follow.objects.filter(followee=request.user, follower__nickname=user_id)
        if unfollow_result.exists():
            unfollow_result.delete()
        return Response({}, status=status.HTTP_200_OK)

