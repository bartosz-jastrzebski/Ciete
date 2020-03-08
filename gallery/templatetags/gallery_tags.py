from django import template
from ..models import Gallery

register = template.Library()


@register.simple_tag
def get_main_page_galleries(max_galleries=6):
    return Gallery.objects.filter(main=1).order_by('-created')[:max_galleries]
