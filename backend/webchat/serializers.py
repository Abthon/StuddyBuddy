from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    sender_id = serializers.SerializerMethodField()
    sender_name = serializers.SerializerMethodField()
    sender_profile = serializers.SerializerMethodField()
    channel = serializers.StringRelatedField()
    
    class Meta:
        model = Message
        fields = ['id', 'content', 'sender_name', 'channel', 'timestamp', 'sender_id', "sender_profile"]
        
    
    def get_sender_id(self, obj):
        return obj.sender.id
    
    def get_sender_name(self,obj):
        return obj.sender.username
    
    def get_sender_profile(self,obj):
        return obj.sender.profile_image.url