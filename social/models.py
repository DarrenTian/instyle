# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from user.models import User
from look.models import Look

class Like(models.Model):
    user = models.ForeignKey(User)
    look = models.ForeignKey(Look)
    created = models.DateTimeField(auto_now_add=True)

class Follow(models.Model):
    followee = models.ForeignKey(User, related_name='followee_list')
    follower = models.ForeignKey(User, related_name='follower_list')
    created = models.DateTimeField(auto_now_add=True)