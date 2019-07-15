# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-07-15 03:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('style', '0002_style_publisher'),
    ]

    operations = [
        migrations.AddField(
            model_name='style',
            name='PUBLISH_STATUS',
            field=models.CharField(choices=[(b'D', b'Draft'), (b'P', b'Published')], default=b'D', max_length=1),
        ),
    ]