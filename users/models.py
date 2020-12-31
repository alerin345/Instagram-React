from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    picture = models.ImageField(default="default.png",null=True, blank=True)
    description = models.TextField(default="",blank=True)

class Image(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    picture = models.ImageField(null=True)
    description = models.TextField(default="",blank=True)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    date = models.DateTimeField(default=timezone.now)

class Like(models.Model):
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['image', 'user'], name='unique likes')
        ]

class Comment(models.Model):
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    value = models.TextField(blank=False)
    date = models.DateTimeField(default=timezone.now)

class Subscription(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="user")
    userSubscribed = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="userSubscribed")
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'userSubscribed'], name='unique subscribes')
        ]
