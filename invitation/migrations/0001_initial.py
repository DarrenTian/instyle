# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-05-06 05:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(default='', max_length=200)),
                ('invitation_type', models.CharField(choices=[('S', 'Self'), ('F', 'Fridends')], default='S', max_length=1)),
            ],
        ),
    ]
