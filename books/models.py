from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    name = models.CharField(max_length=100)
    img = models.TextField()  # Store image URLs as text
    description = models.TextField()
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name