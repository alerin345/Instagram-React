from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django import forms
from django.contrib.auth.models import User
from .models import *
# from .models import Order

class ProfileForm(ModelForm):
    class Meta:
        model = Profile
        fields = '__all__'

class AddImageForm(ModelForm):
    class Meta:
        model = Image
        fields = ['user','picture','description']
