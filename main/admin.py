# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import *

class ThemeAdmin(admin.ModelAdmin):
    list_display = ('name',)
   
admin.site.register(Theme, ThemeAdmin)


class JournalAdmin(admin.ModelAdmin):
    list_display = ('name',)
   
admin.site.register(Journal, JournalAdmin)


class IssueAdmin(admin.ModelAdmin):
    list_display = ('name',)
   
admin.site.register(Issue, IssueAdmin)


class TopJournalAdmin(admin.ModelAdmin):
    list_display = ('journal_name','date')
   
admin.site.register(TopJournal, TopJournalAdmin)

