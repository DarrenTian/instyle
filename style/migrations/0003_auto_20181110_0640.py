# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-10 06:40
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('style', '0002_auto_20181018_0422'),
    ]

    operations = [
        migrations.AlterField(
            model_name='styleimageannotation',
            name='style',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='style_image_annotations', to='style.Style'),
        ),
    ]