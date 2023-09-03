from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status

from .models import CustomUser
from books.serializers import BookSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        name = request.data.get('name')
        password = request.data.get('password')
        user = authenticate(request, name = name, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)

            books_serializer = BookSerializer(user.books.all(), many=True)

            return Response({
                'access_token': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'name': user.name,
                    'phone' : user.phone,
                    'email' : user.email,
                    'address' : user.address,
                    'college' : user.college,
                },
                'books' : books_serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)