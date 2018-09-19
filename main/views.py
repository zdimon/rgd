# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from .models import *
import datetime
from rgd.settings import BASE_DIR
import json
# Create your views here.

def getNew():
    out = []
    for j in Journal.objects.all():
        i = Issue.objects.get(pk=j.last_issue)
        out.append(i)
    return out

def getTop(lst):
    out = []
    date = datetime.date.today()
    def inner(date):
        items = TopJournal.objects.filter(date = date)
        cnt = len(items)
        print cnt
        if cnt == 0:
            date = date - datetime.timedelta(days=1)
            inner(date)
        else:
            for i in items:
                out.append(i)
    inner(date)
    return out
   

def getTopArticles():
    dir = BASE_DIR+'/static/data/top10'
    if not os.path.exists(dir):
        os.makedirs(dir) 
    out = []
    date = datetime.date.today()
    def inner(date):
        url = 'http://pressa.ru/mts/api/top10/%s.json' % (date.strftime("%Y-%m-%d"))
        print url
        rez = json.loads(makeRequest(url))
        if len(rez['articles'])==0:
            date = date - datetime.timedelta(days=1)
            inner(date)        
        else:
            for i in rez['articles']:
                out.append(i)
    inner(date)
    path = '%s/%s.json' % (dir,date.strftime("%Y-%m-%d"))
    f = open(path,'w')
    f.write(json.dumps(out))
    f.close()
    return out    


def home(request):
    themes = Theme.objects.all()
    new = getNew()
    top = getTop([])
    cnx = {'themes': themes, 'new': new, 'top': top}
    return render(request,'home.html',cnx)