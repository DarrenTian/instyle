# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-26 20:23
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('social', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('followee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followee_list', to=settings.AUTH_USER_MODEL)),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follower_list', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
