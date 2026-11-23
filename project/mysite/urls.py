from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('recipe/', views.recipe, name='recipe'),
    path('login/', views.login_page, name='login'),
    path('register/', views.register_page, name='register'),
    path('favorites/', views.favorites, name='favorites'),
    path('add/', views.add_recipe, name='add'),
    path('profile/', views.profile, name='profile'),
]