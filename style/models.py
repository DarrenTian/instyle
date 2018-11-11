from django.db import models

"""
style {
	style_image_url: 'instyle.com/1.png'
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
"""
class Style(models.Model):
	title = models.CharField(max_length=200, default='')

	credit = models.CharField(max_length=200, default='')
	credit_link = models.URLField(max_length=200, default='')

	style_image_url = models.URLField(max_length=200, default='')

	description = models.CharField(max_length=1000, default='')

	publish_date = models.CharField(max_length=200, default='')

	def __str__(self):
		return "%s" % self.style_image_url

	
class StyleImageAnnotation(models.Model):
	style = models.ForeignKey(Style, related_name='style_image_annotations', on_delete=models.CASCADE)
	url = models.URLField(max_length=200)
	image_url = models.URLField(max_length=200)
	# Coordinates from left by percentage vs. image.
	coor_x = models.FloatField()
	# Coordinates from top by percentage vs. image.
	coor_y = models.FloatField()
