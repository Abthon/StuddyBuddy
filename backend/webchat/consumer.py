from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.contrib.auth import get_user_model
from server.models import Channel
from .models import Message

User = get_user_model()


class WebChatConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        self.user = self.scope["user"]
        self.accept()
        
        if not self.user.is_authenticated:
            self.close(code=4001)
            
        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        self.user = User.objects.get(id=self.user.id)
        async_to_sync(self.channel_layer.group_add)(self.channel_id, self.channel_name)

    def receive_json(self, content):
        channel_id = self.channel_id
        sender = self.user
        message = content["message"]
        channel = Channel.objects.get(id=channel_id)
        new_message = Message.objects.create(channel=channel, sender=sender, content=message)
        print(new_message.sender.profile_image.url,new_message.sender.profile_image, ">>>>>>>>>")
        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_message.id,
                    "sender_id": new_message.sender.id,
                    "sender_name": new_message.sender.username,
                    "sender_profile": new_message.sender.profile_image.url,
                    "content": new_message.content,
                    "timestamp": new_message.timestamp.isoformat(),
                },
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)
        print("Disconnected")
