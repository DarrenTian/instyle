"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
import user.views, style.views, frontend.views, invitation.views

router = routers.DefaultRouter()
router.register(r'styles', style.views.StyleViewSet)
router.register(r'users', user.views.UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # Register endpoint: api/users/create_user/
    # TODO: also refactor others into UserViewSet
    url(r'^api/', include(router.urls)),
    # Log in
    url(r'^api/auth-token$', obtain_auth_token),
    # Invite Self
    url(r'^api/invitation$', invitation.views.InvitationCreate.as_view(), name='create-invitation'),
    #url(r'.*', style.views.welcome),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Append this later, otherwise all urls will hijacked by this first before resolving to static files.
urlpatterns.append(url(r'.*', frontend.views.spa))