from django.views.generic import TemplateView, FormView
from django.template import loader
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST, require_GET
from django.core.mail import send_mail, EmailMultiAlternatives
from smtplib import SMTPException
from email.mime.image import MIMEImage
from django.conf import settings
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

    user_name = request.POST['name']
    user_email = request.POST['email']

    message = request.POST['message']
    company_subject = 'CIĘTE - wypełniony formularz, wiadomość od {} '.format(user_name)
    recipents = [settings.EMAIL_HOST_USER]

    user_subject = 'Cięte - Dziękujemy za wiadomość '
    user_message = None
    user_html = loader.render_to_string('mail.html')
    try:
        # Send message from user 
        send_mail(
            subject=company_subject,
            from_email=user_email,
            recipient_list=recipents,
            message=message,
            fail_silently=False
        )
        # Send confirmation email back to user
        user_mail = EmailMultiAlternatives(
            subject=user_subject,
            from_email=settings.EMAIL_HOST_USER,
            to=[user_email],
            body=user_message
        )
        file_path = settings.STATICFILES_DIRS[0] + '/images/logo-email.png'
        with open(file_path, 'rb') as img:
            image = img.read()
        mime_image = MIMEImage(image)
        mime_image.add_header('Content-ID', '<logo>')

        user_mail.content_subtype = 'html'
        user_mail.attach_alternative(user_html, 'text/html')
        user_mail.attach(mime_image)
        user_mail.send(fail_silently=False)

    except SMTPException:
        return JsonResponse({'status': 'failed'})
    return JsonResponse({'status': 'ok'})
