# -*- coding: utf-8 -*-
# Generated by Django 1.11.22 on 2019-08-03 03:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_auto_20190801_0207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar_image',
            field=models.ImageField(default='logo_transparent.png', upload_to=b''),
        ),
    ]
