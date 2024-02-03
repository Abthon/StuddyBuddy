from django.contrib import admin
from .models import Category, Server, Channel
from django.contrib import admin


class CategoryAdmin(admin.ModelAdmin):
	list_display = ['id', 'name']
# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Server)
admin.site.register(Channel)