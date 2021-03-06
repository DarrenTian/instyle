# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-11 18:33
from __future__ import unicode_literals

from django.db import migrations
from django_extensions.db.fields import RandomCharField
from django.utils.crypto import get_random_string

def gen_url_id(apps, schema_editor):
    MyModel = apps.get_model('look', 'Look')
    for row in MyModel.objects.all():
        row.url_id = get_random_string(length=8)
        row.save()

class Migration(migrations.Migration):

    dependencies = [
        ('look', '0003_look_url_id'),
    ]

    operations = [
            # omit reverse_code=... if you don't want the migration to be reversible.
        migrations.RunPython(gen_url_id, reverse_code=migrations.RunPython.noop),
    ]
