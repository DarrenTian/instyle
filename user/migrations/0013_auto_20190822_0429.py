# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-22 04:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0012_auto_20190821_0319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar_image_thumbnail',
            field=models.ImageField(default='default/logo_transparent.png', upload_to=b''),
        ),
    ]