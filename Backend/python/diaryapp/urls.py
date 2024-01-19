from django.urls import path
from diaryapp import views

urlpatterns = [
    path('create/', views.create),
    path('read/', views.read),
    path('delete/', views.delete),
    path('update/', views.update),
    path('', views.index),
]
