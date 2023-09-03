from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category
from .serializers import CategorySerializer
from .models import Book
from .serializers import BookSerializer
from account.serializers import RegisterSerializer
from account.models import CustomUser
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class AllCategoryNames(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BooksByCategoryName(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, category_name):
        try:
            category = Category.objects.get(name=category_name)
            
            books = Book.objects.filter(categories=category)
            
            serializer = BookSerializer(books, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response(
                {"detail": f"No category found with name '{category_name}'."},
                status=status.HTTP_404_NOT_FOUND
            )

class BooksRetrieveCreateAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, category_name):
        try:
            category = Category.objects.get(name = category_name)
            books = Book.objects.filter(categories=category)
            serializer = BookSerializer(books, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response(
                {"detail": f"No books found in the category '{category_name}'."},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def post(self, request):
        serializer = BookSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data,
                            status = status.HTTP_201_CREATED)

        return Response(serializer.errors,
                        status = status.HTTP_400_BAD_REQUEST)
    
class AddBooksToUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        serializer = RegisterSerializer(data=request.data)
        print(request.data)
        try:
            user = CustomUser.objects.get(id=pk)
            serializer = RegisterSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({"error": f"User with id = {pk} not found."},
                            status=status.HTTP_404_NOT_FOUND)