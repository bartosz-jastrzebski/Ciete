from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from .models import Gallery
from ciete.forms import ContactForm


def galleries_list(request):
    galleries = Gallery.objects.all()
    paginator = Paginator(galleries, 3)
    page = request.GET.get('page')
    try: 
        galleries = paginator.page(page)
    except PageNotAnInteger:
        galleries = paginator.page(1)
    except EmptyPage:
        if request.is_ajax():
            return HttpResponse('')
        galleries = paginator.page(paginator.num_pages)
    if request.is_ajax():
        return render(request, 'gallery_ajax.html', {'galleries': galleries})
    return render(request, 'gallery.html', {'galleries': galleries,
                                            'form': ContactForm})


