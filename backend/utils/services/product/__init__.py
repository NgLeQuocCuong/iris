from product import models, serializers
from django.core.paginator import Paginator
from rest_framework import pagination


PAGE_NUMBER = 1
PAGE_SIZE = 10

class Pagination(pagination.PageNumberPagination):

    # def get_page_size

    def get_paginated_response(self, data, page_size):
        pass


def get_item_list(keyword = None, page_number = PAGE_NUMBER, page_size = PAGE_SIZE, option=''):
    if keyword:
        books = models.Book.objects.filter(name=keyword)
    else:
        books = models.Book.objects.all()

    data = serializers.ItemSerializer(books, many=True).data

    pagination_data = Paginator(object_list=data, per_page=page_size).get_page(page_size)

    return list(pagination_data)
    
def add_new_item(name, price, first_price, short_description, description, number_pages, issuing_company, publisher, categories, authors):
    categories_list = [category for category in models.Category.objects.all() if category.uid in categories]
    authors_list = [author for author in models.Author.objects.all() if author.uid in authors]
    book = models.Book(name=name, price=price, first_price=first_price, short_description=short_description,\
        description=description, number_pages=number_pages, issuing_company=issuing_company, publisher=publisher)
    book.save()
    [book.categories.add(category) for category in categories_list]
    [book.authors.add(author) for author in authors_list]
    return None