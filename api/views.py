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
#FormParser, MultiPartParser,
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser, FileUploadParser
from rest_framework import generics, viewsets
#, permissions
from .serializers import *
#, AddSubscribeSerializer
from rest_framework.response import Response
# from rest_framework.views import APIView
from django.contrib.auth.forms import PasswordChangeForm
from knox.models import AuthToken
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authtoken.serializers import AuthTokenSerializer
# from knox.views import LoginView as KnoxLoginView
# from django.contrib.auth import login
from knox.auth import TokenAuthentication
from rest_framework import status
import json

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        print(user)
        try:
            profile = Profile(user=user)
            profile.save()
        except Profile.DoesNotExist:
            print('not exists profile')
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
                profile, created = Profile.objects.get_or_create(user=user2)
                if created:
                    image = profile.picture.url
                    description = profile.description
                else:
                    image = profile.picture.url
                    description = profile.description
                subscriber = len(Subscription.objects.filter(user=user2))
                subscribes = len(Subscription.objects.filter(userSubscribed=user2))
                isSubscribe = Subscription.objects.filter(user=user2, userSubscribed=user).exists()
            except User.DoesNotExist:
                return Response({
                    "error" : "Bad request user"
                })
            # except Profile.DoesNotExist:
            #     return Response({
            #         "error" : "Bad request profile"
            #     })

            print(images)
            itsMyProfile = itsMe(username,username2)
            return Response({
                "msg" : "msg",
                "user" : username2,
                "itsMyProfile" : itsMyProfile,
                "image" : image,
                "isSubscribe" : isSubscribe,
                "subscriber" : subscriber,
                "subscribes" : subscribes,
                "description" : description,
                "images": images
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

class ChangePassword(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        if 'newPassword' in request.data and 'oldPassword' in request.data:
            oldPassword = request.data['oldPassword']
            newPassword = request.data['newPassword']
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            obj = request.user
            if not obj.check_password(serializer.data.get("oldPassword")):
                return Response({"oldPassword": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            obj.set_password(serializer.data.get("newPassword"))
            obj.save()
            return Response({
                'message' : 'success',
                'newPassword' : newPassword
            })
        return Response({
            'message' : 'bad request'
        })
class ChangeUserProfile(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ChangeUserProfileSerializer
    # parser_classes = [MultiPartParser]
    def post(self, request, *args, **kwargs):
        picture = request.FILES['picture']
        description = request.data['description']
        profile, created = Profile.objects.get_or_create(user=request.user)
        if created:
            profile.description = description
            profile.picture = picture
            profile.save()
        else:
            profile.description = description
            profile.picture = picture
            profile.save()
        return Response({
            "message" : "user porfile has been changed"
        }, status=200)


class AddSubscribe(generics.UpdateAPIView):
    # serializer_class = AddSubscribeSerializer
    # model = Subscription
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        if 'username' in request.data:
            username = request.data['username']
            try:
                user = User.objects.get(username=username)
                userSubscribed = User.objects.get(username=request.user)
                isSubscribe = Subscription.objects.filter(user=user, userSubscribed=userSubscribed).exists()
                print('is:',isSubscribe)
                if(isSubscribe):
                    subscribe = Subscription.objects.filter(user=user, userSubscribed=userSubscribed)
                    subscribe.delete()
                else:
                    subscribe = Subscription(user=user, userSubscribed=userSubscribed)
                    subscribe.save()
            except User.DoesNotExist:
                return Response({
                    'message' : 'bad request user'
                }, status=status.HTTP_400_BAD_REQUEST)
            except Subscription.DoesNotExist:
                return Response({
                    'message' : 'bad request subscribe'
                }, status=status.HTTP_400_BAD_REQUEST)
            if isSubscribe:
                return Response({
                'message' : 'successfully unsubscribed '+str(userSubscribed)
                })
            else:
                return Response({
                'message' : 'successfully subscribed '+str(userSubscribed)
                })
        return Response({
            'message' : 'bad request'
        })

class AddPhoto(generics.UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        if 'description' in request.data:
            if 'picture' in request.FILES:
                image = request.FILES['picture']
                description = request.data['description']
                print(request.user)
                print(image)
                print(description)
                try:
                    user = User.objects.get(username=request.user)
                    img = Image(user=user,picture=image,description=description)
                    img.save()
                except Image.DoesNotExist:
                    return Response({
                        'message' : 'bad request image'
                    }, status=status.HTTP_400_BAD_REQUEST)
                except User.DoesNotExist:
                    return Response({
                        'message' : 'bad request user'
                    }, status=status.HTTP_400_BAD_REQUEST)
                return Response({
                    'message' : 'successfully added image'
                })
        return Response({
            'message' : 'bad request'
        })

class DeletePhoto(generics.UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        if 'imageId' in request.data:
            user = request.user
            imageId = request.data['imageId']
            try:
                image = Image.objects.get(id=imageId)
                image.delete()
            except Image.DoesNotExist:
                return Response({
                    'message' : 'image not exists',
                }, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'message' : 'image was successfully deleted',
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
        dic = {'id': id, 'image': images[i].picture.url, 'description' : description, 'date' : date, 'isLike' : isLike, 'likesCount': likesCount, 'commentsCount' : commentsCount, "comments": list(comments) }
        imagesList.append(dic)
    return imagesList
