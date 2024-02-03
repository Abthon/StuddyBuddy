from django.db import models
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.dispatch import receiver
from django.db.models.signals import (pre_save, pre_delete)
from .validators import validate_icon_image_size, validate_image_file_extension

def server_icon_upload_path(instance, filename):
	return f"server/{instance.id}/server_icon/{filename}"

def server_banner_upload_path(instance, filename):
	return f"server/{instance.id}/server_banner/{filename}"

def category_icon_upload_path(instance,filename):
	return f"category/{instance.id}/category_icon/{filename}"

class Category(models.Model):
	name = models.CharField(max_length=100)
	description = models.TextField(blank=True, null=True)
	icon = models.FileField(upload_to=category_icon_upload_path, null=True, blank=True, validators=[validate_icon_image_size, validate_image_file_extension])

	def save(self, *args, **kwargs):
		if self.id is None:
			saved_image = self.icon
			self.icon = None
			super(Category, self).save(*args, **kwargs)
			self.icon = saved_image

		super(Category, self).save(*args, **kwargs)

	def __str__(self):
		return self.name

class Server(models.Model):
	name = models.CharField(max_length=100)
	owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="servers")
	member = models.ManyToManyField(settings.AUTH_USER_MODEL)
	category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="servers")
	description = models.CharField(max_length=250, blank=True, null=True)	
	icon = models.ImageField(upload_to=server_icon_upload_path, null=True, validators=[validate_icon_image_size, validate_image_file_extension])
	banner = models.ImageField(upload_to=server_banner_upload_path, null=True, blank=True, validators=[validate_image_file_extension])
	created_at = models.DateField(null=True)
 
	def save(self, *args, **kwargs):
		if self.id is None:
			saved_icon, saved_banner = self.icon, self.banner
			self.icon, self.banner = None, None
			super(Server, self).save(*args, **kwargs)
			self.icon = saved_icon
			self.banner = saved_banner

		super(Server, self).save(*args, **kwargs)
  
	def __str__(self):
		return self.name

class Channel(models.Model):
	name = models.CharField(max_length=100)
	owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="channel_owner")
	topic = models.CharField(max_length=100)	
	server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name="channels")	

	def save(self,*args, **kwargs):
		self.name = self.name.capitalize()
		super(Channel, self).save(*args, **kwargs)

	def __str__(self):
		return self.name


@receiver(pre_save, sender=Server)
@receiver(pre_save, sender=Category)
def pre_save_receiver(sender, instance, *args, **kwargs): 
	if instance.id:
		existing = get_object_or_404(sender, id=instance.id)
		if existing.icon != instance.icon:
			existing.icon.delete(save=False)

		if getattr(instance, 'banner', None):
			if existing.banner != instance.banner:
				existing.banner.delete(save=False)


@receiver(pre_delete, sender=Server)
@receiver(pre_delete, sender=Category)
def pre_delete_reciever(sender, instance, *args, **kwargs):
	existing = get_object_or_404(sender, id=instance.id)
	if existing.icon:
		existing.icon.delete(save=False)
	if getattr(sender, 'banner', None):
		existing.banner.delete(save=False)
