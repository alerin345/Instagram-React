from django.urls import path
from .views import RegisterView, LoginAPI, Test, UserProfile, GetUsers, AddComment, AddLike
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
    path('users/', GetUsers.as_view(), name='getUsers'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]
