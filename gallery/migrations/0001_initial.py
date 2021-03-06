# Generated by Django 2.2 on 2020-02-28 18:43

from django.db import migrations, models
import django.db.models.deletion
import gallery.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gallery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80, unique=True)),
                ('description', models.TextField(blank=True)),
                ('location', models.CharField(blank=True, max_length=80)),
                ('thumbnail', models.ImageField(upload_to=gallery.models.get_gallery_path)),
                ('main', models.BooleanField(choices=[(0, 'No'), (1, 'Yes')], default=0, help_text='Show gallery on main page?', verbose_name='Main Page')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'galeria',
                'verbose_name_plural': 'galerie',
                'ordering': ('-created',),
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=gallery.models.get_image_path)),
                ('gallery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='gallery.Gallery')),
            ],
            options={
                'verbose_name': 'photo',
                'verbose_name_plural': 'photos',
            },
        ),
    ]
