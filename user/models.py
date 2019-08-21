# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.contrib import admin
from django_extensions.db.fields import RandomCharField

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
    user_id = RandomCharField(length=8, unique=True)

    # Override the inherited user fields
    username = None
    email = models.EmailField('email address', unique=True,
        error_messages={
            'unique': "This email address has already been registered.",
        })

    # Additional fields
    nickname = models.CharField(max_length=50, unique=True,
        error_messages={
            'unique': "This display name has already been registered.",
        })
    avatar_image = models.ImageField(default='default/logo_transparent.png')
    avatar_image_thumbnail = models.ImageField(default='default/logo_transparent.png')

    biography = models.TextField(max_length=500, default='')

    USERNAME_FIELD = 'email'
    # email is already required as username_field
    REQUIRED_FIELDS = ['nickname']

    # Assign the custom UserManager
    objects = UserManager()

class UserAdmin(admin.ModelAdmin):
    fields = ('email', 'nickname')
admin.site.register(User, UserAdmin)