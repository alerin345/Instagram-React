from django.shortcuts import render
# from main.models import Person
# Create your views here.

from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from .forms import ProfileForm, AddImageForm
from .models import Profile, Image, Like, Comment, Subscription
from django.contrib import messages

@login_required(login_url='login')
def index(request,nickname):
    context = {'url' : nickname}
    if(request.POST.get('islike') == "true" and request.POST.get('imageId')):
        like(request,nickname)
    if(request.POST.get('iscomment') == "true" and request.POST.get('imageId') and request.POST.get('comment')):
        comment(request,nickname)
    if(request.POST.get('issubscribe') == "true" and request.POST.get('subscribed')):
        subscribe(request,nickname)
    try:
        images = Image.objects.filter(user=User.objects.get(username=nickname).id)
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
            dic = {'image': images[i], 'isLike' : isLike, "comments": list(comments) }
            imagesList.append(dic)
        context['posts'] = imagesList

        u = User.objects.get(username=nickname)
        context['user'] = u
        userProfile = Profile.objects.get(user=u)
        image = userProfile.picture
        description = userProfile.description
        context['image'] = image
        context['description'] = description
        if str(request.user) == nickname:
            context['itsMe'] = True
            print('Jestes tym użytkownikiem')
        else:
            context['itsMe'] = False

        subscriber = len(Subscription.objects.filter(userSubscribed=u))
        context['subscriber'] = int(subscriber)

        subscribes = len(Subscription.objects.filter(user=u))
        context['subscribes'] = int(subscribes)
        sub = Subscription.objects.get(user=request.user,userSubscribed=u)
        # print(sub.count())
        context['itsSubscribe'] = True
    except Subscription.DoesNotExist:
        context['itsSubscribe'] = False
        print('nie ma subskrypcji')

    except Image.DoesNotExist:
        print('nie ma zdjęcia')
    except User.DoesNotExist:
        context['user'] = None
        return render(request, 'users/404.html', context)
    except User.DoesNotExist:
        context['user'] = None
        return render(request, 'users/404.html', context)
    except Profile.DoesNotExist:
        userModel = User.objects.get(username=nickname)
        userProfile = Profile(user=userModel)
        userProfile.save()
        return redirect('/'+nickname)
    return render(request, 'users/index.html', context)

@login_required(login_url='login')
def profileSettings(request):
    userProfile = Profile.objects.get(user=request.user)
    form = ProfileForm(instance=userProfile)
    if request.method == 'POST':
        form = ProfileForm(request.POST,request.FILES,instance=userProfile)
        if form.is_valid():
            form.save()
    context = {'form' : form }
    return render(request, 'users/profileSettings.html', context)

@login_required(login_url='login')
def changePassword(request):
    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
    else:
        form = PasswordChangeForm(user=request.user)
    context = {'form': form}
    return render(request, 'users/changePassword.html', context)

@login_required(login_url='login')
def addImage(request):
    userProfile = User.objects.get(username=request.user).id
    form = AddImageForm()
    if request.method == 'POST':
        form = AddImageForm(request.POST,request.FILES)
        if form.is_valid():
            if int(request.POST.get('user')) == int(userProfile):
                form.save()
                return redirect('../'+str(request.user))
            else:
                form.add_error('user','Coś poszło nie tak')
    context = {'form' : form }
    return render(request, 'users/addImage.html', context)


def like(request, nickname):
    isLike = int(request.POST.get('isLike'))
    imageId = request.POST.get('imageId')
    img = Image.objects.get(id=int(imageId))
    us = User.objects.get(id=int(request.user.id))
    if(isLike == 0):
        addLike = Like(image=img,user=us)
        addLike.save()
    else:
        Like.objects.get(image=img,user=us).delete()
    likesCount = len(Like.objects.filter(image=img))
    img.likes = int(likesCount)
    img.save()

def comment(request, nickname):
    commentVal = request.POST.get('comment')
    imageId = request.POST.get('imageId')
    img = Image.objects.get(id=int(imageId))
    us = User.objects.get(id=int(request.user.id))
    commit = Comment(image=img,user=us,value=commentVal)
    commit.save()
def subscribe(request, nickname):
    sub = request.POST.get('subscribed')
    print(sub)
    if(int(sub) == 0):
        user = User.objects.get(username=request.user)
        userSubscribed = User.objects.get(username=nickname)
        subscription = Subscription(user=user,userSubscribed=userSubscribed)
        subscription.save()
    else:
        user = User.objects.get(username=request.user)
        userSubscribed = User.objects.get(username=nickname)
        subscription = Subscription.objects.get(user=user,userSubscribed=userSubscribed)
        subscription.delete()
    print(request.user,nickname)
