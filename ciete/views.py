from django.views.generic import TemplateView, FormView
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST, require_GET
from django.core.mail import send_mail
from smtplib import SMTPException
from .forms import ContactForm
from .decorators import ajax_required
from gallery.models import Gallery


def index_view(request):
    form = ContactForm()
    return render(request, 'index.html', {'form': form})


class ConstructionView(TemplateView):
    template_name = 'construction.html'


@ajax_required
@require_GET
def get_gallery_photos(request, title):
    gallery = Gallery.objects.get(title=title)
    photos = [photo.image.url for photo in gallery.photos.all()]
    return JsonResponse({'photos': photos})


@ajax_required
@require_POST
def send_contact_data(request):
    name = request.POST['name']
    email = request.POST['email']
    message = request.POST['message']
    subject = 'Wypełniony formularz, wiadomość od {} '.format(name)
    recipents = ['info@ciete.eu']

    try:
        send_mail(subject=subject,
                  from_email=email,
                  recipient_list=recipents,
                  message=message,
                  fail_silently=False)
    except SMTPException:
        return JsonResponse({'status': 'failed'})
    return JsonResponse({'status': 'ok'})
