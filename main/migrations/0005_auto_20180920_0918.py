# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-20 09:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20180920_0911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articles',
            name='author',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='image',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='page',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='reader_url',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='short_text',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='small_image',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='square_image',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='articles',
            name='title',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
