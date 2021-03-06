from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.validators import UniqueTogetherValidator
from django.contrib.auth import authenticate

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('__all__')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password' : {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Login or Password incorrect")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')

class ChangePasswordSerializer(serializers.Serializer):
    model = User
    oldPassword = serializers.CharField(required=True)
    newPassword = serializers.CharField(required=True)

class ChangeUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ['picture', 'description']
# class AddSubscribeSerializer(serializers.Serializer):
#     model = Subscription
#     fields = ('user','userSubscribed')
