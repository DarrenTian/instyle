# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-14 21:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_auto_20190803_0350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar_image',
            field=models.ImageField(default='default/logo_transparent.png', upload_to=b''),
        ),
    ]
