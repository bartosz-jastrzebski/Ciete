"""ciete URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import index_view, ConstructionView, send_contact_data, get_gallery_photos
from django.conf.urls.i18n import i18n_patterns
from django.conf import settings

urlpatterns = i18n_patterns(
    path('edycja-ciete/', admin.site.urls),
    path('', index_view, name='index'),
    path('construction/', ConstructionView.as_view(), name='construction'),
    path('send_contact/', send_contact_data, name='send'),
    path('gallery/<str:title>', get_gallery_photos, name='gallery_photos'),
    path('rosetta/', include('rosetta.urls')),
    # path('galleries/', include('gallery.urls')),
)

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
