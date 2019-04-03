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
import user.views, style.views, frontend.views


router = routers.DefaultRouter()
router.register(r'users', user.views.UserViewSet)
router.register(r'groups', user.views.GroupViewSet)
router.register(r'styles', style.views.StyleViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^welcome', style.views.welcome),
    url(r'^style/new', style.views.new_style),
	url(r'^style/(?P<style_id>[0-9]+)$', frontend.views.style),
    url(r'^style/(?P<style_id>[0-9]+)/edit', style.views.edit_style),
    url(r'^api/', include(router.urls)),
    url(r'^api/auth-token', obtain_auth_token),
    url(r'.*', style.views.welcome),
    #url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)