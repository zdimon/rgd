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
from distutils.dir_util import copy_tree
from rgd.settings import BASE_DIR
from subprocess import call
import os
from datetime import datetime

class Command(BaseCommand):

    def handle(self, *args, **options):
        today = datetime.now()
        print 'start'
        copy_tree("%s/static" % BASE_DIR, "%s/build/static" % BASE_DIR)
        arch_source = '%s/build' % BASE_DIR
        arch_dest = '%s/static/%s-%s.tar.gz' % (BASE_DIR, today.year, today.month)
        #call("tar", "-czvf", arch_dest, arch_dest )
        cmd = "tar -czvf %s %s" % (arch_dest, arch_source)
        print cmd
        #os.system(cmd)  