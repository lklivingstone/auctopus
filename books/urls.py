from django.urls import path
from .views import (
    BooksRetrieveCreateAPIView,
    AllCategoryNames,
    BooksByCategoryName,
    AddBooksToUser
)

urlpatterns = [
    path('', BooksRetrieveCreateAPIView.as_view()),
    path('<int:pk>/', AddBooksToUser.as_view()),

    path('category/', AllCategoryNames.as_view()),
    path('category/<str:category_name>/', BooksByCategoryName.as_view()),
]
