"""
URL configuration for projeto project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path
import study_partner.views as views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/signup/', views.signup),
    path('api/login/', views.login_view),
    path('api/logout/', views.logout_view),
    path('api/user/', views.user_view),
    path('api/messages/', views.get_messages),
    path('api/token-auth/', obtain_auth_token),
    path('api/get-channels/', views.get_channels),
    path('api/get-sessions/', views.get_sessions),

    # Session CRUD
    path('api/create-session/', views.create_session),
    path('api/delete-session/', views.delete_session),

    # UC CRUD
    path('api/create-uc/', views.create_uc),
    path('api/delete-uc/', views.delete_uc),
    path('api/get-ucs/', views.get_ucs),

    path('api/toggle-like/', views.toggle_like, name='toggle_like'),
]

