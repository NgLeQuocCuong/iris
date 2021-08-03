from django.db import models

from utils.model import BaseModel

from django.core import exceptions

def validate_positive_number(value):
    if value < 0:
        raise exceptions.ValidationError(
            _('%(value)s is not an positive number'),
            params={'value':value}
        )

class Category(BaseModel):

    parent = models.ForeignKey(to='self', on_delete=models.CASCADE, null=True)

    code = models.IntegerField(default=-1)

    cf_index = models.IntegerField(default=-1)

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Author(BaseModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(BaseModel):
    
    name = models.CharField(default='Name of book', max_length=1000, unique=False)

    price = models.IntegerField(default=0, validators=[validate_positive_number])
    first_price = models.IntegerField(default=0, validators=[validate_positive_number])

    short_description = models.CharField(default='', max_length=500)
    description = models.TextField(default='')

    number_pages = models.IntegerField(default=0, validators=[validate_positive_number] )

    issuing_company = models.CharField(max_length=100, )
    publisher = models.CharField(max_length=100)

    rating_count = models.IntegerField(default=0, validators=[validate_positive_number])
    rating_sum = models.IntegerField(default=0, validators=[validate_positive_number])

    categories = models.ManyToManyField(to=Category, related_name='Categories_of_book', )

    authors = models.ManyToManyField(to=Author, related_name='Authors_of_book')

    sku = models.IntegerField(default=-1)

    @property
    def rating(self):
        return (self.rating_sum // self.rating_count) if (self.rating_count > 0) else 0

    @property
    def discount(self):
        return ((self.first_price - self.price) * 100) // self.first_price if (self.first_price > 0) else 0

    def __str__ (self):
        return self.name


class Image(BaseModel):
    url = models.CharField(max_length=500)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    description = models.CharField(default='description of image', max_length=100)

    def __str__(self):
        return self.description
