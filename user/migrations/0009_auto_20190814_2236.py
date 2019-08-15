# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-14 22:36
from __future__ import unicode_literals

from django.db import migrations
from django.utils.crypto import get_random_string

def gen_user_id(apps, schema_editor):
    MyModel = apps.get_model('user', 'User')
    for row in MyModel.objects.all():
        row.user_id = get_random_string(length=8)
        row.save()

class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_user_user_id'),
    ]

    operations = [
        migrations.RunPython(gen_user_id, reverse_code=migrations.RunPython.noop),
    ]




