"""rgd URL Configuration

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
from django.conf.urls import url
from django.contrib import admin
from main.views import *


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^category/(?P<id>\d+)$', category),
    url(r'^top/(?P<id>\d+).html$', top_detail, name="top_detail"),
    url(r'^journal/(?P<id>\d+).html$', journal_detail, name="issue_detail"),
    url(r'^article/(?P<id>\d+).html$', article_detail, name="article_detail"),
    url(r'^$', home, name='home')
]
