# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-18 23:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('look', '0007_auto_20190814_2123'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='url',
            field=models.URLField(max_length=2048),
        ),
    ]
