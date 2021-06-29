"""insta URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView


urlpatterns = [
    path('api/', include('api.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('register/', TemplateView.as_view(template_name='index.html'), name='register'),
    path('accounts/profileSettings/', TemplateView.as_view(template_name='index.html'), name='profileSettings'),
    path('accounts/changePassword/', TemplateView.as_view(template_name='index.html'), name='changePassword'),
    path('<str:username>/', TemplateView.as_view(template_name='index.html'), name='username'),
    path('direct/inbox/', TemplateView.as_view(template_name='index.html'), name='chatbox'),
    path('panel/admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
