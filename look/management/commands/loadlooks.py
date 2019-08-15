from django.core.exceptions import ObjectDoesNotExist
from django.core.management.base import BaseCommand, CommandError
from look.models import Look, LookImage, Tag, Product
from user.models import User
import csv
import os
from django.core.files import File
from django.contrib.auth.hashers import make_password
import time

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
    look_path = os.path.join(dirname, '../../../looks/')

    # https://docs.google.com/spreadsheets/d/1ScImDJLRqSbd3AjYeK-xqE75mX9oCMOwwUmALjNhal0/edit#gid=0
    indicies = {
        'publisher':0,
        'image_file_name':1,  # All images should be copied to /tmp folder
        'title':2,
        'description':3,
        'date':4,
        'hash_tags':5,
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

    def look_break(self, txt):
        return not txt == ""

    def row_to_tags(self, row):
        tags = []
        annotation_cursor = self.indicies['annotation']
        annotation_length = self.indicies['annotation_length']
        while annotation_cursor < len(row):
            annotation_row = row[annotation_cursor:annotation_cursor+self.indicies['annotation_length']]
            if annotation_row[1] != '':
                annotation = Tag()
                annotation.coor_x = annotation_row[self.annotation_indicies['coor_x']]
                annotation.coor_y = annotation_row[self.annotation_indicies['coor_y']]

                product = Product()
                product.title = annotation_row[self.annotation_indicies['title']]
                product.price = annotation_row[self.annotation_indicies['price']]
                product.url = annotation_row[self.annotation_indicies['url']]
                product.save()

                annotation.product = product

                tags.append(annotation)
            annotation_cursor += annotation_length
        return tags

    def row_to_look(self, row, look):
        if (look is None) or (self.look_break(row[self.indicies['publisher']])):
            publisher = self.get_user(row[self.indicies['publisher']])
            look = Look()
            look.title = row[self.indicies['title']]
            look.description = row[self.indicies['description']]
            look.publish_date = row[self.indicies['date']]
            look.publisher = publisher
            look.save()
            print look

        look_image = LookImage()
        look_image.look = look

        file = File(open(self.look_path + row[self.indicies['image_file_name']], 'rb'))
        name, extension = os.path.splitext(file.name)
        look_image.image.delete()
        look_image.image.save('looks/'+look.url_id+'-'+str(int(time.time())) + extension, file)

        look_image.save()
        print look_image

        tags = self.row_to_tags(row)
        for tag in tags:
            tag.look_image = look_image
            tag.save()

        return look

    def handle(self, *args, **options):
        sample_looks_file = self.file_path
        with open(sample_looks_file) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            next(csv_reader)
            look = None
            for row in csv_reader:
                print'Parsing row:', row
                look = self.row_to_look(row, look)
                