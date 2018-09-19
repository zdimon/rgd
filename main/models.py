# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class TopJournal(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    reader_url = models.CharField(max_length=250)
    journal_name_en = models.CharField(max_length=250, blank=True, null=True)
    journal_name = models.CharField(max_length=250)
    issue_name = models.CharField(max_length=250)
    journal_id = models.IntegerField()
    issue_id = models.IntegerField()
    cover_url = models.CharField(max_length=250)
    date = models.DateField()



class Journal(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(max_length=250, blank=True, null=True)
    cover = models.CharField(max_length=250, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    last_issue = models.IntegerField()
    mobile_cover = models.CharField(max_length=250, blank=True, null=True)
    mobile_thumb = models.CharField(max_length=250, blank=True, null=True)
    thumb = models.CharField(max_length=250, blank=True, null=True)




class Issue(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(max_length=250, blank=True, null=True)
    journal = models.ForeignKey('Journal', models.DO_NOTHING)
    amount_of_pages = models.IntegerField()
    cover = models.CharField(max_length=250, blank=True, null=True)
    has_articles = models.BooleanField()
    journal_name = models.CharField(max_length=250, blank=True, null=True)
    mobile_cover = models.CharField(max_length=250, blank=True, null=True)
    mobile_thumb = models.CharField(max_length=250, blank=True, null=True)
    release_date = models.DateField()
    thumb = models.CharField(max_length=250, blank=True, null=True)




class Theme(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(max_length=250, blank=True, null=True)
    



class Theme2Journal(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    journal = models.ForeignKey(Journal, models.DO_NOTHING)
    theme = models.ForeignKey(Theme, models.DO_NOTHING)




