from rest_framework import serializers
from .models import CustomUser
from books.models import Book

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'phone', 'email', 'address', 'college', 'books']

class CustomBookField(serializers.RelatedField):
    def get_queryset(self):
        return Book.objects.all()

    def to_representation(self, value):
        return value.name

    def to_internal_value(self, data):
        try:
            book = Book.objects.get(id = data)
        except Book.DoesNotExist:
            book = Book.objects.create(id = data)
        return book
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    books = CustomBookField(many=True, required=False)

    class Meta:
        model = CustomUser
        fields = ['name', 'phone', 'email', 'address', 'college', 'password', 'books']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            name=validated_data['name'],
            phone=validated_data['phone'],
            email=validated_data['email'],
            address=validated_data['address'],
            college=validated_data['college'],
            password=validated_data['password'],
        )

        return user
    
    def update(self, instance, validated_data):
        # Update the individual fields of the instance
        instance.name = validated_data.pop('name', instance.name)
        instance.phone = validated_data.pop('phone',
                                                  instance.phone)
        instance.email = validated_data.pop('email', instance.email)
        instance.address = validated_data.pop('address', instance.address)
        instance.college = validated_data.pop('college', instance.college)
        instance.password = validated_data.pop('password', instance.password)

        # Remove all existing tags from the task
        if 'books' in validated_data:
            books_data = validated_data.pop('books')
            # instance.tags.clear()
            for book_data in books_data:
                instance.books.add(book_data)

        instance.save()
        return instance