from django.shortcuts import render
from rest_framework import viewsets
from .models import Server, Category
from .serializers import ServerSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter

class ServerListViewSet(viewsets.ViewSet):
	queryset = Server.objects.all()
	permission_classes = [IsAuthenticated]	
	def list(self,request):
		category = request.query_params.get('category')
		by_user = request.query_params.get('by_user') == "true"
		by_server_id = request.query_params.get('server_id')
		with_member = request.query_params.get('with_member') == "true"

		if category:
			self.queryset = self.queryset.filter(category__name=category)	

		if by_user:
			user_id = request.user.id
			self.queryset = self.queryset.filter(id=user_id)

		if with_member:
			self.queryset = self.queryset.annotate(member_count=Count('member'))

		if by_server_id:
			try:
				self.queryset = self.queryset.filter(id=by_server_id)
			except ValueError:
				raise ValidationError(detail="Need integer value!")

		if self.queryset: 
			serializer = ServerSerializer(self.queryset, many=True, context={"with_member": with_member})
			return Response(serializer.data, status=status.HTTP_200_OK)

		return Response(status=status.HTTP_204_NO_CONTENT)



class CategoryListViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
       
    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)
        
        
        
class ServerListView(ListAPIView):
    queryset = Server.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ServerSerializer
    filter_backends = [SearchFilter]
    search_fields = ["name", "owner__username", "description", "category__name"]