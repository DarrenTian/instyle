from django.db import models
from django.contrib.auth.models import User

class Style(models.Model):
	title = models.CharField(max_length=200, default='')
	credit = models.CharField(max_length=200, default='')
	credit_link = models.URLField(max_length=200, default='')
	description = models.CharField(max_length=1000, default='')
	publisher = models.ForeignKey(User, related_name='style', on_delete=models.CASCADE)
	publish_date = models.CharField(max_length=200, default='')
	
	def __str__(self):
		return "%s" % self.title

class StyleImage(models.Model):
	style = models.ForeignKey(Style, related_name='style_image', on_delete=models.CASCADE)
	image = models.ImageField()
	
	def __str__(self):
		return "%s" % self.id
	
	
class StyleImageAnnotation(models.Model):
	style_image = models.ForeignKey(StyleImage, related_name='style_image_annotation', on_delete=models.CASCADE)
	product_url = models.URLField(max_length=200)
	product_image_url = models.URLField(max_length=200)
	# Coordinates from left by percentage vs. image.
	coor_x = models.FloatField()
	# Coordinates from top by percentage vs. image.
	coor_y = models.FloatField()

	def __str__(self):
		return id
