import uuid

from django.db import models
from django.conf import settings
from django_extensions.db.fields import RandomCharField
from django.dispatch import receiver
from django.contrib import admin

class Look(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

	url_id = RandomCharField(length=8, unique=True)
	title = models.CharField(max_length=200, default='')
	description = models.CharField(max_length=1000, default='')
	publish_date = models.CharField(max_length=200, default='')
	publisher = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='looks', on_delete=models.CASCADE)
	
	PUBLISH_STATUS_TYPE = (
		('D', 'Draft'),
		('P', 'Published'),
	)

	publish_status = models.CharField(max_length=1, choices=PUBLISH_STATUS_TYPE, default='D')

	def __str__(self):
		return "UrlId: looks/%s" % self.url_id

class LookImage(models.Model):
	look = models.ForeignKey(Look, related_name='look_images', on_delete=models.CASCADE)
	image = models.ImageField()
	image_thumbnail = models.ImageField(default='default/logo_transparent.png')
	
	def __str__(self):
		return "%s" % self.id

class Product(models.Model):
	url = models.URLField(max_length=2048)
	title = models.CharField(max_length=200, default='')
	price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
	
class Tag(models.Model):
	look_image = models.ForeignKey(LookImage, related_name='tags', on_delete=models.CASCADE)
	# Coordinates from left by percentage vs. image.
	coor_x = models.FloatField(default=0)
	# Coordinates from top by percentage vs. image.
	coor_y = models.FloatField(default=0)

	product = models.ForeignKey(Product, related_name='tags', on_delete=models.CASCADE)

	def __str__(self):
		return "Tag"

@receiver(models.signals.pre_delete, sender=LookImage)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    instance.image.delete()
    instance.image_thumbnail.delete()

class LookAdmin(admin.ModelAdmin):
    fields = ['publish_status']
admin.site.register(Look, LookAdmin)

