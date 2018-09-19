# -*- coding: utf-8 -*-
#http://office.sud.kz/courtActs/site/lawsuitList.xhtml
from django.core.management.base import BaseCommand, CommandError
import json
from rgd.settings import BASE_DIR
import os
from main.models import *
import requests
import os.path
import time
import json
import datetime


from django.contrib.auth.models import User
	
	
	
	
	


catalog = [
    {'name': 'Досуг и развлечения', 'id': '160'},
    {'name': 'Научно-популярное', 'id': '159'},
    {'name': 'Бизнес и финансы', 'id': '158'},
    {'name': 'Общество и политика', 'id': '157'},
    {'name': 'Спорт', 'id': '155'},
    {'name': 'Дом и семья', 'id': '153'},
    {'name': 'Детские', 'id': '152'},
    {'name': 'Мужские', 'id': '151'},
    {'name': 'Женские', 'id': '150'},
    {'name': 'Журналы', 'id': '145'},
    {'name': 'Газеты', 'id': '144'},

]

def importTheme():
    Theme.objects.all().delete()
    for t in catalog:
        print 'saving %s' % t['name']
        t = Theme()
        t.id = t['id']
        t.save()



class Command(BaseCommand):

    def handle(self, *args, **options):
        try:
            s = User()
            s.is_staff = True
            s.is_superuser = True
            s.username = 'admin'
            s.set_password('kukareku')
            s.save()
            print 'Superuser was created login: admin password: kukareku'
        except:
            print 'Superuser exists'
        importTheme()
       