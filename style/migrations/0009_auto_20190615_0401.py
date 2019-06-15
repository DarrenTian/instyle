# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-06-15 04:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('style', '0008_auto_20190602_0521'),
    ]

    operations = [
        migrations.AlterField(
            model_name='styleimage',
            name='style',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='style_images', to='style.Style'),
        ),
    ]
