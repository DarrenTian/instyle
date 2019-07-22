from django.core.exceptions import ObjectDoesNotExist
from django.core.management.base import BaseCommand, CommandError
from style.models import Style, StyleImage, StyleImageAnnotation
from user.models import User
import csv
import os
from django.core.files import File
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = '''A command line tool to load looks from spreadsheets to database: "python manage.py loadlooks".
              All Images should be copied to /tmp folder before running the command on the CSV.
              The expected format of file is as follows:
              Line 1: <non-empty-publisher> <image 1> ...
              Line 2: <empty-publisher> <image 2> ...
              Line 3: <non-empty-publisher> <image 3> ...

              Here Line 1 creates new style and line 2 (with empty publisher) adds new image to the previous style.
              Any number of annotations can be added to an image when added to the same line as image
              A subsequent line with a non-empty-publisher (line 3 in this case) creates new style'''

    dirname = os.path.dirname(__file__)
    file_path = os.path.join(dirname, '../../../sample_looks.csv')

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
        # fake email adrress using the username
        email = name + "@gmail.com"
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            user = User(email=email, password=make_password('test'), nickname=name)
            user.save()
        return user

    def style_break(self, txt):
        return not txt == ""

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

    def row_to_style(self, row, style):
        if (style is None) or (self.style_break(row[self.indicies['publisher']])):
            publisher = self.get_user(row[self.indicies['publisher']])
            style = Style()
            style.title = row[self.indicies['title']]
            style.description = row[self.indicies['description']]
            style.publish_date = row[self.indicies['date']]
            style.tags = row[self.indicies['tags']]
            style.publisher = publisher
            style.save()
            print style

        style_image = StyleImage()
        style_image.style = style
        style_image.image.save(row[self.indicies['image_file_name']], File(open('./looks/' + row[self.indicies['image_file_name']], 'rb')))
        style_image.save()
        print style_image

        style_annotations = self.row_to_style_annotations(row)
        for style_annotation in style_annotations:
            style_annotation.style_image = style_image
            style_annotation.save()

        return style

    def handle(self, *args, **options):
        sample_looks_file = self.file_path
        with open(sample_looks_file) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            next(csv_reader)
            style = None
            for row in csv_reader:
                print'Parsing row:', row
                style = self.row_to_style(row, style)
                