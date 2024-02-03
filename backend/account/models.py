from django.contrib.auth.models import AbstractUser
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from django.db.models.signals import (
	pre_delete,pre_save
)

def profile_icon_upload_path(instance, filename):
	return f"user/{instance.id}/{filename}"

class Account(AbstractUser):
	profile_image = models.ImageField(upload_to=profile_icon_upload_path, blank=True, null=True)
	Address = models.CharField(max_length=100)
	def save(self, *args, **kwargs):
		if self.id is None:
			self.set_password(self.password)
			saved_image = self.profile_image
			self.profile_image = None
			super(Account, self).save(*args, **kwargs)
			self.profile_image = saved_image

		super(Account, self).save(*args, **kwargs)


@receiver(pre_save, sender=Account)
def pre_save_receiver(sender, instance, *args, **kwargs): 
	if instance.id:
		existing = get_object_or_404(sender, id=instance.id)
		if existing.profile_image != instance.profile_image:
			existing.profile_image.delete(save=False)


@receiver(pre_delete, sender=Account)
def pre_delete_reciever(sender, instance, *args, **kwargs):
	existing = get_object_or_404(sender, id=instance.id)
	if existing.profile_image:
		existing.profile_image.delete(save=False)

