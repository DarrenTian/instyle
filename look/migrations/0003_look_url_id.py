# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-11 18:25
from __future__ import unicode_literals

from django.db import migrations
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('look', '0002_look_publisher'),
    ]

    operations = [
        migrations.AddField(
            model_name='look',
            name='url_id',
            field=django_extensions.db.fields.RandomCharField(blank=True, editable=False, length=8, null=True),
        ),
    ]
