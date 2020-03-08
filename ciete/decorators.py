from django.http import HttpResponseBadRequest
from functools import wraps


def ajax_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if not request.is_ajax():
            return HttpResponseBadRequest()
        return func(request, *args, **kwargs)
    return wrapper
