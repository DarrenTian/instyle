# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-21 01:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('look', '0008_auto_20190818_2308'),
    ]

    operations = [
        migrations.AddField(
            model_name='lookimage',
            name='image_thumbnail',
            field=models.ImageField(default=b'default/logo_transparent.png', upload_to=b'', null=True),
        ),
    ]