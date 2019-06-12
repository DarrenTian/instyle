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
import user.views, style.views, frontend.views, invitation.views

router = routers.DefaultRouter()
if settings.PROD_ENV == "DEV":
    # Retrieve Style:       GET  /api/styles/$id/?format=json                   
    router.register(r'styles', style.views.StyleViewSet)
    router.register(r'style_images', style.views.StyleImageViewSet)
    router.register(r'styles_image_annotations', style.views.StyleImageAnnotationViewSet)
    # Register User:        POST /api/users/create_user/?format=json 
    # Login User:           POST /api/obtain_auth_token/?format=json
    router.register(r'users', user.views.UserViewSet)

# Invite Self:          POST /api/invitation/
router.register(r'invitation', invitation.views.InvitationViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = []    
urlpatterns.append(url(r'^api/', include(router.urls)))

# Put all To-Be-Developed API under DEV
if settings.PROD_ENV == "DEV":
    # Log in API is registered here since we are using built-in API View.
    urlpatterns.append(url(r'^api/obtain_auth_token/$', user.views.CustomAuthToken.as_view()))
    urlpatterns += (static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Append this later, otherwise all urls will hijacked by this first before resolving to static files.
urlpatterns.append(url(r'.*', frontend.views.spa))