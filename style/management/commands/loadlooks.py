from django.core.exceptions import ObjectDoesNotExist
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from style.models import Style, StyleImage, StyleImageAnnotation
import csv
from django.core.files import File

class Command(BaseCommand):
    help = '''A command line tool to load looks from spreadsheets to database: "python manage.py loadlooks".
              All Images should be copied to /tmp folder before running the command on the CSV'''

    file_path = '/Users/yayunt/Downloads/sample_looks.csv'

    # https://docs.google.com/spreadsheets/d/1ScImDJLRqSbd3AjYeK-xqE75mX9oCMOwwUmALjNhal0/edit#gid=0
    indicies = {
        'publisher':0,
        'image_file_name':1,  # All images should be copied to /tmp folder
        'title':2,
        'description':3,
        'date':4,
        'tags':5,
        'annotation':6,
        'annotation_length':5,
    }

    annotation_indicies = {
        'coor_x':0,
        'coor_y':1,
        'title':2,
        'price':3,
        'url':4,
    }

    def add_arguments(self, parser):
        return
        #parser.add_argument('poll_id', nargs='+', type=int)

    def get_user(self, name):
        try:
            user = User.objects.get(username=name)
        except ObjectDoesNotExist:
            user = User(username=name)
            user.save()
        return user

    def row_to_style_annotations(self, row):
        annotations = []
        annotation_cursor = self.indicies['annotation']
        annotation_length = self.indicies['annotation_length']
        while annotation_cursor < len(row):
            annotation_row = row[annotation_cursor:annotation_cursor+self.indicies['annotation_length']]
            if annotation_row[1] != '':
                annotation = StyleImageAnnotation()
                annotation.coor_x = annotation_row[self.annotation_indicies['coor_x']]
                annotation.coor_y = annotation_row[self.annotation_indicies['coor_y']] 
                annotation.title = annotation_row[self.annotation_indicies['title']]
                annotation.price = annotation_row[self.annotation_indicies['price']]
                annotation.url = annotation_row[self.annotation_indicies['url']]

                print annotation

                annotations.append(annotation)
            annotation_cursor += annotation_length
        return annotations

    def row_to_style(self, row):
        publisher = self.get_user(row[self.indicies['publisher']])

        style = Style()
        #style.style_image_url = '/static/looks/' + row[self.indicies['image_url']]
        style.title = row[self.indicies['title']]
        style.description = row[self.indicies['description']]
        style.publish_date = row[self.indicies['date']]
        style.tags = row[self.indicies['tags']]
        style.publisher = publisher
        style.save()
        print style

        style_image = StyleImage()
        style_image.style = style
        style_image.image.save(row[self.indicies['image_file_name']], File(open('/tmp/' + row[self.indicies['image_file_name']], 'rb')))
        style_image.save()
        print style_image

        style_annotations = self.row_to_style_annotations(row)
        for style_annotation in style_annotations:
            style_annotation.style_image = style_image
            style_annotation.save()

    def handle(self, *args, **options):
        sample_looks_file = self.file_path
        with open(sample_looks_file) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            next(csv_reader)
            for row in csv_reader:
                print'Parsing row:', row
                self.row_to_style(row)
                