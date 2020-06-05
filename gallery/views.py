from django.shortcuts import render
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Gallery


def galleries_list(request):
    images = Image.objects.all()
    paginator = Paginator(images, 4)
    page = request.GET.get('page')
    try: 
        images = paginator.page(page)
    except PageNotAnInteger:
        images = paginator.page(1)



