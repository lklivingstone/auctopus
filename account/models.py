from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from books.models import Book

class CustomUserManager(BaseUserManager):
    def create_user(self, name, phone, email, address, college, password=None, **extra_fields):
        if not name:
            raise ValueError('The Name field must be set')
        if not email:
            raise ValueError('The Email field must be set')
        if not phone:
            raise ValueError('The Phone field must be set')
        if not address:
            raise ValueError('The Address field must be set')
        if not college:
            raise ValueError('The College field must be set')
        
        email = self.normalize_email(email)
        user = self.model(name=name, phone=phone, email=email, address=address, college=college, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, phone, email, address=None, college=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, phone, email, address, college, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=150, unique=True)
    phone = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255, unique=False)  # Specify max_length for CharField
    college = models.CharField(max_length=255, unique=False)  # Specify max_length for CharField
    books = models.ManyToManyField(Book, related_name='users', blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()
   
    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['email', 'phone', 'address', 'college']

    def __str__(self):
        return self.name
