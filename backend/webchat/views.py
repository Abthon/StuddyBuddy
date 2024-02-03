from django.shortcuts import render
from rest_framework import viewsets
from .models import Message
from .serializers import MessageSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class MessageListViewSet(viewsets.ViewSet):
    queryset = Message.objects.all()
    permission_classes = [IsAuthenticated]
    def list(self,request):
        channel_id = request.query_params.get("channelId")
        self.queryset = Message.objects.filter(channel_id=int(channel_id))
        serializer = MessageSerializer(self.queryset, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
