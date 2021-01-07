from django.shortcuts import render
# from main.models import Person
# Create your views here.

# from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.models import User
# from django.contrib.auth.forms import PasswordChangeForm
# from django.shortcuts import render, redirect
# from django.contrib.auth.decorators import login_required
# from django.http import HttpResponse, HttpResponseRedirect
# from .forms import ProfileForm, AddImageForm
from .models import Profile, Image, Like, Comment, Subscription
# from django.contrib import messages

from rest_framework import generics
#, permissions
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework.response import Response
# from rest_framework.views import APIView
from knox.models import AuthToken
# from rest_framework.authtoken.serializers import AuthTokenSerializer
# from knox.views import LoginView as KnoxLoginView
# from django.contrib.auth import login

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
        "user": UserSerializer(user,
        context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })

#digest filter flat=True


class Test(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        if 'token' in request.data and 'username' in request.data:
            username = request.data['username']
            token2 = request.data['token']
            validate = IsValidate(username,token2)
            return Response({
                "msg" : validate
            })
        return Response({
            "msg" : "Bad request"
        })
class UserProfile(generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        if 'token' in request.data and 'username' in request.data:
            username = request.data['username']
            username2 = request.data['username2']
            token2 = request.data['token']
            validate = IsValidate(username,token2)
            if validate:
                images = getImages(username,username2)
                print(images)
                itsMyProfile = itsMe(username,username2)
                return Response({
                "msg" : validate,
                "user" : username,
                "images": images,
                "itsMyProfile" : itsMyProfile
                })
            else:
                return Response({
                    "msg" : "Bad request"
                })
        return Response({
            "msg" : "Bad request"
        })



def IsValidate(username, token2):
    try:
        user = User.objects.get(username=username)
        auth = AuthToken.objects.filter(user=user).values_list("digest","expiry")
        token = auth.values_list("digest", flat=True)

        if token2 in token:
            print(auth.filter(digest=token2).values_list('expiry'))
            # if expiry < data.now : logout
            return True
        return False
    except User.DoesNotExist:
        return False
    except AuthToken.DoesNotExist:
        return False


def itsMe(username, username2):
    if username == username2:
        return True
    return False



def getImages(username,username2):
    user = User.objects.get(username=username)
    user2 = User.objects.get(username=username2)
    images = Image.objects.filter(user=user2)
    imagesList = []
    for i in range(0,len(images)):
        try:
            if(Like.objects.get(image=images[i].id, user=user.id)):
                isLike = True
        except Like.DoesNotExist:
            isLike = False
        commentsList = []
        try:
            comments = Comment.objects.filter(image=images[i].id)
            data = [{'user': comment.user.username, 'value': comment.value, 'date': comment.date} for comment in comments]
            comments = data
        except Comment.DoesNotExist:
            comments = []
        dic = {'image': images[i].picture.url, 'isLike' : isLike, "comments": list(comments) }
        imagesList.append(dic)
    return imagesList
