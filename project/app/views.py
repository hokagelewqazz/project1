from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def recipe(request):
    return render(request, 'recipe.html')

def login_page(request):
    return render(request, 'login.html')

def favorites(request):
    return render(request, 'favorites.html')

def add_recipe(request):
    return render(request, 'add.html')

def profile(request):
    return render(request, 'profile.html')

def register_page(request): 
    return render(request, 'register.html') 