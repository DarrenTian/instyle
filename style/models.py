from django.db import models

"""
style {
	styleImageUrl: 'instyle.com/1.png'
	styleImageAnnotation: [
		{
			url: 'instyle.com/product/1'
			image_url : 'instyle.com/product/1.png'
			coordinates : {
				x : 5px
				y : 10px
			}
		},
		{
			url: 'instyle.com/product/2'
			image_url : 'instyle.com/product/2.png'
			coordinates : {
				x : 50px
				y : 100px
			}
		}
	]
}
"""
class Style(models.Model):
	style_image_url = models.CharField(max_length=200)
	
		
