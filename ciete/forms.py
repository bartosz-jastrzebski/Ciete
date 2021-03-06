from django import forms
from django.utils.translation import gettext_lazy as _


class ContactForm(forms.Form):
    name = forms.CharField(max_length=60,
                           widget=forms.TextInput(attrs={'placeholder': _('name')}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': _('email')}))
    message = forms.CharField(required=True,
                              widget=forms.Textarea(attrs={'placeholder': _('message')}))