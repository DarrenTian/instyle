# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    # Create a custom UserManager to handle create_user without user_name
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        # Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    # Override the inherited user fields
    username = None
    email = models.EmailField('email address', unique=True,
        error_messages={
            'unique': "This email address has already been registered.",
        })
    # Additional fields
    nickname = models.CharField(max_length=30)
    biography = models.TextField(max_length=500, default='')
    location = models.CharField(max_length=30, blank=True)
    profile_image_url = models.URLField(max_length=200, default='')

    USERNAME_FIELD = 'email'
    # email is already required as username_field
    REQUIRED_FIELDS = ['nickname']

    # Assign the custom UserManager
    objects = UserManager()
