from rest_framework import serializers
from .models import Server, Category, Channel
from django.contrib.auth import get_user_model
from datetime import timedelta, date
from account.serializers import AccountSerializer

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = '__all__'


class ChannelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Channel
		fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
	category = serializers.StringRelatedField()
	channels = ChannelSerializer(many=True, read_only=True)
	member_count = serializers.SerializerMethodField()
	owner = serializers.StringRelatedField()
	days_since_creation = serializers.SerializerMethodField()
	member = AccountSerializer(many=True, read_only=True)
	class Meta:
		model = Server
		exclude = ["created_at"]


	def get_member_count(self, obj):
		if hasattr(obj, 'member_count'):
			return obj.member_count

		return None

	def to_representation(self, instance):
		data = super().to_representation(instance)
		if not self.context.get('with_member'):
			data.pop('member_count')

		return data

	def get_days_since_creation(self, obj):
		today = date.today()
		days_difference = (today - obj.created_at).days
		if days_difference == 0:
				return "today"
		elif days_difference == 1:
				return "yesterday"
		else:
				return f"{days_difference} days ago"



