from django.urls import path
from django.conf.urls.i18n import i18n_patterns
from .views import galleries_list
from ciete.views import get_gallery_photos


urlpatterns = [
    path('', galleries_list ,name='all_galleries'),
    path('gallery/<str:title>', get_gallery_photos, name='gallery_photos'),
]