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
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authtoken.serializers import AuthTokenSerializer
# from knox.views import LoginView as KnoxLoginView
# from django.contrib.auth import login
from knox.auth import TokenAuthentication

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


# class Test(generics.GenericAPIView):
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated,)
#
#     def post(self, request, *args, **kwargs):
#         if 'token' in request.data and 'username' in request.data:
#             print(request.headers.get("Authorization"))
#             username = request.data['username']
#             token2 = request.data['token']
#             validate = IsValidate(username,token2)
#             return Response({
#                 "msg" : validate
#             })
#         return Response({
#             "msg" : "Bad request"
#         })
class Test(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if 'username' in request.data:
            #userToken: request.uesr
            print(request.user)
            return Response({
                "msg" : "nice"
            })
        return Response({
            "msg" : "Bad request"
        })


class UserProfile(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        print(kwargs)
        if 'username' in kwargs:
            username = str(request.user)
            username2 = kwargs['username']
            try:
                user = User.objects.get(username=username)
                user2 = User.objects.get(username=username2)
                images = getImages(user,user2)
            except User.DoesNotExist:
                return Response({
                    "error" : "Bad request user"
                })

            print(images)
            itsMyProfile = itsMe(username,username2)
            return Response({
                "msg" : "msg",
                "user" : username2,
                "images": images,
                "itsMyProfile" : itsMyProfile
            })
        return Response({
            "error" : "Bad request"
        })

class GetUsers(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        try:
            users = list(User.objects.all().values_list('username', flat=True))
            # users = ['abc']
        except User.DoesNotExist:
            users = []
        return Response({
            'usersList' : users
        })
class AddComment(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        print(request.data)
        if 'value' in request.data and 'imageId' in request.data:
            try:
                commentVal = request.data['value']
                print(commentVal)
                print(request.data)
                imageId = request.data['imageId']
                img = Image.objects.get(id=int(imageId))
                us = User.objects.get(id=int(request.user.id))
                commit = Comment(image=img,user=us,value=commentVal)
                commit.save()
                return Response({
                    'message' : 'successfully add comment'
                })
            except User.DoesNotExist:
                return Response({
                    'message' : 'bad request'
                })
            except Image.DoesNotExist:
                return Response({
                    'message' : 'bad request'
                })
        return Response({
            'message' : 'bad request no data'
        })

class AddLike(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        if 'isLike' in request.data and 'imageId' in request.data:
            isLike = int(request.data['isLike'])
            imageId = request.data['imageId']
            print(isLike)
            try:
                img = Image.objects.get(id=int(imageId))
                us = User.objects.get(id=int(request.user.id))
                if(isLike == False):
                    addLike = Like(image=img,user=us)
                    addLike.save()
                else:
                    Like.objects.get(image=img,user=us).delete()
                likesCount = len(Like.objects.filter(image=img))
                img.likes = int(likesCount)
                img.save()
                return Response({
                    'message' : 'successfully add like'
                })
            except Image.DoesNotExist:
                return Response({
                    'message' : 'bad request i'
                })
            except User.DoesNotExist:
                return Response({
                    'message' : 'bad request u'
                })
            except Like.DoesNotExist:
                return Response({
                    'message' : 'bad request l'
                })
        return Response({
            'message' : 'bad request'
        })
def itsMe(username, username2):
    if username == username2:
        return True
    return False


def getImages(user,user2):
    images = Image.objects.filter(user=user2)
    imagesList = []
    for i in range(0,len(images)):
        id = images[i].id
        description = images[i].description
        date = images[i].date
        try:
            likesCount = len(Like.objects.filter(image=images[i].id))
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

        commentsCount = len(comments)
        dic = {'id': id,'image': images[i].picture.url, 'description' : description, 'date' : date, 'isLike' : isLike, 'likesCount': likesCount, 'commentsCount' : commentsCount, "comments": list(comments) }
        imagesList.append(dic)
    return imagesList
