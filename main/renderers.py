from django_medusa.renderers import StaticSiteRenderer
from .models import *
from .views import getTop, getNew, getTopArticles


class HomeRenderer(StaticSiteRenderer):
    def get_paths(self):

        paths = ["/", ]

        #journals = Journal.objects.all()
        #for item in getTop():
        for item in Issue.objects.all():
            paths.append('/journal/%s.html' % item.id)
        #for item in getTopArticles():
        for item in TopArticles.objects.all():
            #try:
            #top = TopArticles.objects.get(item=item.id)
            paths.append('/top/%s.html' % item.id)

        for item in Articles.objects.all():
            #try:
            #top = TopArticles.objects.get(item=item.id)
            paths.append('/article/%s.html' % item.id)


        return paths

renderers = [HomeRenderer, ]