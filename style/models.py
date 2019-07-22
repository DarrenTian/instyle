from django.db import models
from django.conf import settings
"""
style {
	style_image: [
		{
			image: 'instyle.com/1.png'
			style_image_annotations: [
				{
					url: 'instyle.com/product/1'
					image_url : 'instyle.com/product/1.png'
					coor_x : 40.0
					coor_y : 35.1
				},
				{
					url: 'instyle.com/product/2'
					image_url : 'instyle.com/product/2.png'
					coor_x : 70.0
					coor_y : 69.1
				}
			]
		}
	]
}
"""
class Style(models.Model):
	title = models.CharField(max_length=200, default='')
	credit = models.CharField(max_length=200, default='')
	credit_link = models.URLField(max_length=200, default='')
	description = models.CharField(max_length=1000, default='')
	tags = models.CharField(max_length=200, default='')
	publisher = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='styles', on_delete=models.CASCADE)
	publish_date = models.CharField(max_length=200, default='')
	
	PUBLISH_STATUS_TYPE = (
		('D', 'Draft'),
		('P', 'Published'),
	)
	publish_status = models.CharField(max_length=1, choices=PUBLISH_STATUS_TYPE, default='D')

	def __str__(self):
		return "Look from (publisher): %s" % self.title

class StyleImage(models.Model):
	style = models.ForeignKey(Style, related_name='style_images', on_delete=models.CASCADE)
	image = models.ImageField()
	
	def __str__(self):
		return "%s" % self.id
	
class StyleImageAnnotation(models.Model):
	style_image = models.ForeignKey(StyleImage, related_name='style_image_annotations', on_delete=models.CASCADE)
	url = models.URLField(max_length=200)
	image_url = models.URLField(max_length=200)
	# Coordinates from left by percentage vs. image.
	coor_x = models.FloatField(default=0)
	# Coordinates from top by percentage vs. image.
	coor_y = models.FloatField(default=0)

	title = models.CharField(max_length=200, default='')
	price = models.CharField(max_length=200, default='')

	def __str__(self):
		return "Annotation for %s at %s" % (self.title, self.price)
