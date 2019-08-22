# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from user.models import User
from look.models import Look

class Like(models.Model):
    user = models.ForeignKey(User)
    look = models.ForeignKey(Look)
    created = models.DateTimeField(auto_now_add=True)