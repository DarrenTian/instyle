# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-14 21:22
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('look', '0005_auto_20190811_1833'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='price',
            new_name='price_old',
        ),
    ]
