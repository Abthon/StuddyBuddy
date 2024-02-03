from django.db import models
from django.conf import settings
from server.models import Channel


class Message(models.Model):
    content = models.TextField()
    sender = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="user_message")
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name="channel_message")
    timestamp = models.DateTimeField(auto_now_add=True)
    