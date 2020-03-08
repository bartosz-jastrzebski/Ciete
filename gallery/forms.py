from django import forms


class ResizeForm(forms.ModelForm):
    CHOICES = [(1, 'Yes'),
               (0, 'No')]
    resize = forms.ChoiceField(choices=CHOICES,
                               help_text='Automatically resizes thumbnail')
