from django.urls import path
from .views import *
from knox import views as knox_views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # path('user/', UserListView.as_view()),
    # path('user/<int:id>/', UserIdView.as_view()),
    # path('user/<str:username>/', UserUsernameView.as_view()),
    path('test/', Test.as_view(), name='test'),
    path('userProfile/<str:username>/', UserProfile.as_view(), name='userProfile'),
    path('addComment/', AddComment.as_view(), name='addComment'),
    path('addLike/', AddLike.as_view(), name='addLike'),
    path('addSubscribe/', AddSubscribe.as_view(), name='addSubscribe'),
    path('addPhoto/', AddPhoto.as_view(), name='addPhoto'),
    path('deletePhoto/', DeletePhoto.as_view(), name='deletePhoto'),
    path('users/', GetUsers.as_view(), name='getUsers'),
    path('subscribedImages/', GetSubscribedImages.as_view(), name='getSubscribedImages'),
    path('accounts/changePassword/', ChangePassword.as_view(), name='changePassword'),
    path('accounts/changeUserProfile/', ChangeUserProfile.as_view(), name='changeUserProfile'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]
