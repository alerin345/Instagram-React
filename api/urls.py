from django.urls import path
from .views import RegisterView, LoginAPI, Test, UserProfile
from knox import views as knox_views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # path('user/', UserListView.as_view()),
    # path('user/<int:id>/', UserIdView.as_view()),
    # path('user/<str:username>/', UserUsernameView.as_view()),
    path('test/', Test.as_view(), name='test'),
    path('user/', UserProfile.as_view(), name='userProfile'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]
