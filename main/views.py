# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from .models import *
import datetime
from rgd.settings import BASE_DIR
import json
# Create your views here.

def getNew(theme=None):
    out = []

    for j in Journal.objects.all():
        i = Issue.objects.get(pk=j.last_issue)
        if theme!=None:
            theme = Theme.objects.get(pk=theme)
            try:
                Theme2Journal.objects.get(theme=theme,journal=j)
                out.append(i)
            except:
                pass
        else:
            out.append(i)
    return out

def getTop(theme=None):
    out = []
    date = datetime.date.today()
    def inner(date,theme):
        items = TopJournal.objects.filter(date = date)
        cnt = len(items)
        print cnt
        if cnt == 0:
            date = date - datetime.timedelta(days=1)
            inner(date,theme)
        else:
            for i in items:
                if theme!=None:
                    #import pdb; pdb.set_trace()
                    t = Theme.objects.get(pk=theme)
                    try:
                        j = Journal.objects.get(pk=i.journal_id)
                        Theme2Journal.objects.get(theme=t,journal=j)
                        out.append(i)
                        #print i.journal_name
                    except:
                        pass
                else:
                    out.append(i)
                
    inner(date,theme)
    return out
   

def getTopArticles():
    
    out = []
    date = datetime.date.today()
    def inner(date):
        items = TopArticles.objects.filter(date=date)
        if len(items)==0:
            date = date - datetime.timedelta(days=1)
            inner(date)        
        else:
            for i in items:
                out.append(i)
    inner(date)
    return out    


def home(request):
    themes = Theme.objects.all()
    new = getNew()
    top = getTop()
    topArticles = getTopArticles()
    cnx = {'themes': themes, 'new': new, 'top': top, 'topArticles': topArticles}
    return render(request,'home.html',cnx)


def category(request,id):
    themes = Theme.objects.all()
    #category = Theme.objects.get(pk=id)
    #new = getNew(category)
    top = getTop(id)
    cnx = {'themes': themes, 'top': top}
    return render(request,'home.html',cnx)