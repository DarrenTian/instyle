# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-06-02 05:21
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('style', '0007_auto_20190519_0429'),
    ]

    operations = [
        migrations.CreateModel(
            name='StyleImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=b'')),
            ],
        ),
        migrations.RemoveField(
            model_name='style',
            name='style_image_url',
        ),
        migrations.RemoveField(
            model_name='styleimageannotation',
            name='style',
        ),
        migrations.AddField(
            model_name='styleimage',
            name='style',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='style_image', to='style.Style'),
        ),
        migrations.AddField(
            model_name='styleimageannotation',
            name='style_image',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='style_image_annotations', to='style.StyleImage'),
            preserve_default=False,
        ),
    ]