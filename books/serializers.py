from rest_framework import serializers
from .models import Book, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)

    class Meta:
        model = Book
        fields = '__all__'
    
    def create(self, validated_data):
        categories = validated_data.pop("categories")

        name = validated_data.pop("name")
        img = validated_data.pop("img")
        description = validated_data.pop("description")

        book = Book.objects.create(
            name = name,
            img = img,
            description = description
        )

        for each_category in categories:
            category_name = each_category['name']
            try:
                category = Category.objects.get(name = category_name)
            except Category.DoesNotExist:
                category = Category.objects.create(name = category_name)
            book.categories.add(category)
        
        return book
            