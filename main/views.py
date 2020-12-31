from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_protect

from django.contrib.auth import authenticate, login, logout

from django.contrib import messages

from django.contrib.auth.decorators import login_required

from .forms import CreateUserForm
import time
# Create your views here.
# @cache_page(60 * 15)
# @csrf_protect

from django.http import HttpResponse
from users.models import Profile
from django.contrib.auth.models import User
from django.http import JsonResponse
from users.models import Subscription, Image, Comment, Like

from django.db import connections
@login_required(login_url='login')
def index(request): # id
    context = {}
    if(request.POST.get('loadUser') == "true" and request.POST.get('value') ):
        val = request.POST.get('value')
        users = list(User.objects.filter(username__startswith=val).values('username'))
        return JsonResponse({"valid": True, "users" : users}, status = 200)
    try:
        subscribes = Subscription.objects.filter(user=request.user).values_list('userSubscribed', flat=True)
        subscribesCount = len(subscribes)
        users = User.objects.filter(id__in=subscribes)
        images = Image.objects.filter(user__in=users)
        imagesList = []
        for i in range(0,len(images)):
            try:
                if(Like.objects.get(image=images[i].id, user=request.user.id)):
                    isLike = True
            except Like.DoesNotExist:
                isLike = False
            commentsList = []
            try:
                comments = Comment.objects.filter(image=images[i].id)
            except Comment.DoesNotExist:
                comments = []
                console.log("comments not exists")
            dic = {'user': images[i].user,'image': images[i], 'isLike' : isLike, "comments": list(comments) }
            imagesList.append(dic)
        context['posts'] = imagesList
    except Subscription.DoesNotExists:
        print('nie ma subskrypcji')
    except User.DoesNotExists:
        print('nie ma uzytkownika')
    except Image.DoesNotExists:
        print('nie ma zdjecia')
    except Comment.DoesNotExists:
        print('nie ma comment')
    except Like.DoesNotExists:
        print('nie ma like')
    return render(request, 'main/index.html', context)

def registerPage(request):
        if request.user.is_authenticated:
            return redirect('/')
        else:
            form = CreateUserForm(request.POST)

            if request.method == 'POST':
                form = CreateUserForm(request.POST)
                if form.is_valid():
                    form.save()
                    user = form.cleaned_data.get('username')
                    messages.success(request, 'Account was created for ' + user)
                    userModel = User.objects.get(username=user)
                    userProfile = Profile(user=userModel)
                    userProfile.save()
                    return redirect('/')
            context = {'form': form}
            return render(request, 'main/register.html', context)

def loginPage(request):
    if request.user.is_authenticated:
        return redirect('/')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                messages.info(request, 'Username OR password incorrect')
        context = {}
        return render(request, 'main/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')
