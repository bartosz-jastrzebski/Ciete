# Generated by Django 2.2 on 2020-05-25 05:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0002_auto_20200525_0036'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gallery',
            name='thumbnail',
        ),
    ]
