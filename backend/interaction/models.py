from django.db import models

# Create your models here.
from utils.model import BaseModel
from user_account.models import User
from product.models import Book

class Interaction(BaseModel):
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    book = models.ForeignKey(to=Book, on_delete=models.CASCADE)
    rating = models.IntegerField()
    content = models.TextField()
    header = models.TextField()
    

