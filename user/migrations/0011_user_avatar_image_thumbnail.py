# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-21 01:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_auto_20190814_2236'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar_image_thumbnail',
            field=models.ImageField(default='default/logo_transparent.png', upload_to=b'', null=True),
        ),
    ]