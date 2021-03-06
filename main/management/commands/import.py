# -*- coding: utf-8 -*-
#http://office.sud.kz/courtActs/site/lawsuitList.xhtml
from django.core.management.base import BaseCommand, CommandError
import json
from rgd.settings import BASE_DIR, SUPER_PDF_PROTECTION
import os
import sys
from main.models import *
import requests
import os.path
import time
import json
import datetime
import urllib
import hashlib

def makeRequest(url):
    try:
        txt = requests.get(url).text     
        return txt       
    except requests.exceptions.ReadTimeout as errh:
        print ("Http Error timeout!")    

def importTopJournal():
    date = datetime.date.today()
    TopJournal.objects.filter(date=date).delete()
    print 'Start importing TOP Journal'
    url = 'http://pressa.ru/zd/top.json'
    txt = makeRequest(url)
    arr = json.loads(txt)
    for i in arr:
        #print i
        print 'Saving %s' % i['journal_name']
        t = TopJournal()
        t.issue_name = i['issue_name']
        t.issue_id = i['issue_id']
        t.journal_id = i['journal_id']
        t.journal_name = i['journal_name']
        t.journal_name_en = i['journal_name_en']
        t.reader_url = i['reader_url']
        t.cover_url = i['cover_url']
        t.date = date
        t.save()

def importCatalog():
    print 'Start importing Catalog'
    url = 'http://pressa.ru/zd/catalog.json'
    txt = makeRequest(url)
    arr = json.loads(txt) 
    for a in arr['categories']:
        print a
        try:
            cat = Theme.objects.get(pk=a)
        except:
            print 'No theme %s' % a
            continue
        print 'Processing %s' % cat.name
        Theme2Journal.objects.filter(theme=cat).delete()
        for j in arr['categories'][a]['journals']:
            print j
            try:
                j = Journal.object.get(pk=j)
                j.delete()
                print 'Deleting journal!'
            except:
                print 'No journal'
            
            nj = Journal()
            nj.id = int(arr['categories'][a]['journals'][j]['id'])
            nj.name = arr['categories'][a]['journals'][j]['name']
            nj.last_issue = arr['categories'][a]['journals'][j]['last_issue']
            nj.description = arr['categories'][a]['journals'][j]['description']
            nj.cover = arr['categories'][a]['journals'][j]['cover']
            nj.thumb = arr['categories'][a]['journals'][j]['thumb']
            nj.mobile_cover = arr['categories'][a]['journals'][j]['mobile_cover']
            nj.mobile_thumb = arr['categories'][a]['journals'][j]['mobile_thumb']
            nj.save()
            t2j = Theme2Journal()
            t2j.journal = nj
            t2j.theme = cat
            t2j.save()
            print 'Saving %s' % nj.name
            for i in arr['categories'][a]['journals'][j]['issues']:

                issue = Issue()
                issue.mobile_thumb = arr['categories'][a]['journals'][j]['issues'][i]['mobile_thumb']
                issue.name  = arr['categories'][a]['journals'][j]['issues'][i]['name']
                issue.has_articles = arr['categories'][a]['journals'][j]['issues'][i]['has_articles']
                issue.release_date = arr['categories'][a]['journals'][j]['issues'][i]['release_date']
                issue.cover = arr['categories'][a]['journals'][j]['issues'][i]['cover']
                issue.journal = nj
                issue.mobile_cover = arr['categories'][a]['journals'][j]['issues'][i]['mobile_cover']
                issue.journal_name = arr['categories'][a]['journals'][j]['issues'][i]['journal_name']
                issue.amount_of_pages = arr['categories'][a]['journals'][j]['issues'][i]['amount_of_pages']
                issue.id = arr['categories'][a]['journals'][j]['issues'][i]['id']
                issue.thumb = arr['categories'][a]['journals'][j]['issues'][i]['thumb']
                issue.save()
                print 'Saving issue %s' % issue.name

        #break

def createIssueImageList():
    lst = []
    for i in Issue.objects.all():
        lst.append({
            'cover': i.cover,
            'mobile_cover': i.mobile_cover,
            'thumb': i.thumb,
            'issue_id': i.id,
            'journal_id': i.journal.id
        })    
    return lst

'''
cover
thumb
mobile_cover
'''

def saveFile(path,source):
    output = open(path,"wb")
    output.write(source)
    output.close()

def saveImages(lst):  
    for i in lst:
        print  i['mobile_cover']
        path = '%s/static/data/%s/%s/%s.png' % (BASE_DIR,i['journal_id'],i['issue_id'],'520-680')
        saveFile(path,urllib.urlopen(i['mobile_cover']).read())
        print  i['cover']
        path = '%s/static/data/%s/%s/%s.png' % (BASE_DIR,i['journal_id'],i['issue_id'],'306-433')
        saveFile(path,urllib.urlopen(i['cover']).read())   
        print  i['thumb']
        path = '%s/static/data/%s/%s/%s.png' % (BASE_DIR,i['journal_id'],i['issue_id'],'170-220')
        saveFile(path,urllib.urlopen(i['thumb']).read())    
        #break
    

def importMedia():
    dir = BASE_DIR+'/static/data'
    if not os.path.exists(dir):
        os.makedirs(dir)    
    for i in createIssueImageList():
        dj = dir+'/'+str(i['journal_id'])
        if not os.path.exists(dj):
            os.makedirs(dj)     
        di = dj+'/'+str(i['issue_id'])
        if not os.path.exists(di):
            os.makedirs(di)   
    lst = createIssueImageList()
    saveImages(lst)


def saveImagesTopArticle(date):
    for i in TopArticles.objects.filter(date=date):
        path = '%s/static/data/top10/%s_small.png' % (BASE_DIR,i.id)
        saveFile(path,urllib.urlopen(i.small_image_portrait).read())
        print path
        path = '%s/static/data/top10/%s.png' % (BASE_DIR,i.id)
        saveFile(path,urllib.urlopen(i.image).read())
        print path
        

def importTopArticles():
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
            TopArticles.objects.filter(date=date).delete()
            for i in rez['articles']:
                t = TopArticles()
                t.author = i['author']
                t.text = i['text']
                t.text_continue = i['text_continue']
                t.small_image_square = i['small_image_square']
                t.image = i['image']
                t.short_text = i['short_text']
                t.reader_url = i['reader_url']
                t.title = i['title']
                t.small_image_portrait = i['small_image_portrait']
                t.small_image = i['small_image']
                t.issue_id = i['issue_id']
                t.issue = i['issue']
                t.journal = i['journal']
                t.date = date
                t.save()
                print 'Saving %s' % (t.title)
                
    inner(date)
    saveImagesTopArticle(date)
    return out

def importImageArticle(art):
    path = BASE_DIR+'/static/data/articles/%s' % art.id
    if not os.path.exists(path):
        os.makedirs(path)     
    path = '%s/static/data/articles/%s/square_image.png' % (BASE_DIR,art.id)
    saveFile(path,urllib.urlopen(art.square_image).read())
    print path
    path = '%s/static/data/articles/%s/small_image.png' % (BASE_DIR,art.id)
    saveFile(path,urllib.urlopen(art.small_image).read())
    print path
    path = '%s/static/data/articles/%s/image.png' % (BASE_DIR,art.id)
    saveFile(path,urllib.urlopen(art.image).read())
    print path
    


def importArticles():
    dir = BASE_DIR+'/static/data/articles'
    if not os.path.exists(dir):
        os.makedirs(dir)
    print 'Import articles'
    for i in Issue.objects.all():
        if i.has_articles == True:
            Articles.objects.filter(issue=i).delete()
            print 'Processing....%s' % i.id
            url = 'http://pressa.ru/zd/txt/%s.json' % i.id
            txt = makeRequest(url)
            arr = json.loads(txt)
            for it in arr['articles']:
                print it['title']
                a = Articles()
                a.issue = i
                a.reader_url = it['reader_url']
                a.title = it['title']
                a.text = it['text']
                a.image = it['image']
                a.author = it['author']
                a.small_image = it['small_image']
                a.square_image = it['square_image']
                a.short_text = it['short_text']
                a.page = it['page'] 
                a.save()
                importImageArticle(a)
            #break


def importPdfs():
    print 'Importing pdfs'
    for i in Issue.objects.filter(is_downloaded=False, has_articles=False):
        path = '%s/static/data/%s/%s/journal.pdf' % (BASE_DIR,i.journal.id,i.id)
        
        #path = '%s/static/data/pdf/%s.pdf' % (BASE_DIR,i.id)        
        
        sign = hashlib.md5(str(i.id)+SUPER_PDF_PROTECTION).hexdigest() 
        url = 'http://pressa.ru/zd/getpdf/%s/%s' % (i.id,sign)
        print 'Download to %s' % path
        print url
        saveFile(path,urllib.urlopen(url).read())
        i.is_downloaded = True
        i.save()


class Command(BaseCommand):

    def handle(self, *args, **options):
        importTopJournal()
        importCatalog()
        importMedia()
        importTopArticles()
        importArticles()
        importPdfs()

