# -*- coding: utf-8 -*-
# Generated by Django 1.11.22 on 2019-08-01 02:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20190801_0202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar_image',
            field=models.ImageField(default='/static/logo_transparent.png', upload_to=b''),
        ),
    ]