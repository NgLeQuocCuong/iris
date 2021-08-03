from django.contrib import admin
from .models import Book, Category, Author, Image

# Register your models here.
admin.site.register(Book)
admin.site.register(Category)
admin.site.register(Author)
admin.site.register(Image)