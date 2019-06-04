# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
	# Override inherited user fields
	email = models.EmailField(_('email address'), unique=True,
        error_messages={
            'unique': _("This email address has already been registered."),
        })
	# Additional fields
    biography = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    profile_image_url = models.URLField(max_length=200, default='')