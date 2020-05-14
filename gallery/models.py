from django.conf import settings
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch.dispatcher import receiver
import shutil
import PIL


def get_gallery_path(instance, thumbnail):
    return 'galleries/{}/thumbnail.png'.format(instance.title)


def get_image_path(instance, image):
    return'galleries/{}/photo.jpg'.format(instance.gallery.title)


class Gallery(models.Model):
    CHOICES = [(0, 'No'),
               (1, 'Yes')]
    title = models.CharField(max_length=80,
                             unique=True)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=80,
                                blank=True)
    thumbnail = models.ImageField(upload_to=get_gallery_path)
    main = models.BooleanField(choices=CHOICES,
                               default=0,
                               verbose_name='Main Page',
                               help_text='Show gallery on main page?')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created', )
        verbose_name = 'galeria'
        verbose_name_plural = 'galerie'

    def save(self, resize=True, *args, **kwargs):
        super().save(*args, **kwargs)
        if resize:
            size = 960, 640
            path = '{}/galleries/{}/thumbnail.png'.format(
                    settings.MEDIA_ROOT,
                    self.title)
            img = PIL.Image.open(path)
            img = img.resize(size)
            img.thumbnail(size, 3)
            img.save(path, 'PNG')
            
    def get_first(self):
        return self.photos.all()[:3]

    def __str__(self):
        return self.title


class Photo(models.Model):
    gallery = models.ForeignKey(Gallery, related_name='photos', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_image_path)

    class Meta:
        verbose_name = 'photo'
        verbose_name_plural = 'photos'

    def __str__(self):
        return '{} - {}'.format(self.gallery.title, self.image)


@receiver(post_delete, sender=Gallery)
def gallery_delete(sender, instance, **kwargs):
    path = '{}galleries/{}'.format(settings.MEDIA_ROOT, instance.title)
    shutil.rmtree(path)


@receiver(post_delete, sender=Photo)
def photo_delete(sender, instance, **kwargs):
    instance.image.delete(False)





