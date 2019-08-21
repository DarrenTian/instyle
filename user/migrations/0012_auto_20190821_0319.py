# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-08-21 03:19
from __future__ import unicode_literals

from django.db import migrations
from PIL import Image
import tempfile
import os
import boto3

def gen_avatar_image_thumbnail(apps, schema_editor):
    MyModel = apps.get_model('user', 'User')
    print ''
    for user in MyModel.objects.all():
        s3 = boto3.resource('s3', region_name='us-east-2')
        bucket = s3.Bucket('eastyler-static')
        print 'media/'+user.avatar_image.__str__()
        object = bucket.Object('media/'+user.avatar_image.__str__())
        try:
            response = object.get() 
        except Exception as e:
            print e
            continue
        
        file_stream = response['Body']
        imageTemproary = Image.open(file_stream)
        imageTemproary = imageTemproary.convert('RGB')
        imageTemproary.thumbnail((300, 300), Image.ANTIALIAS) 
        compressed_image = tempfile.SpooledTemporaryFile()
        imageTemproary.save(compressed_image , format='JPEG', quality=85, progressive=True, optimize=True)

        url = user.avatar_image.__str__()
        name, extension = os.path.splitext(url)

        user.avatar_image_thumbnail.save(name + '-thumbnail' + extension, compressed_image)
        user.save()

class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_user_avatar_image_thumbnail'),
    ]

    operations = [
        migrations.RunPython(gen_avatar_image_thumbnail, reverse_code=migrations.RunPython.noop),
    ]
