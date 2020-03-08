from django import forms


# class ContactForm(forms.Form):
#     name = forms.CharField(max_length=60, label='Imię')
#     email = forms.EmailField(label='Email')
#     message = forms.CharField(required=True,
#                               widget=forms.Textarea(),
#                               label='Wiadomość')



class ContactForm(forms.Form):
    name = forms.CharField(max_length=60,
                           widget=forms.TextInput(attrs={'placeholder': 'Imię:'}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Email:'}))
    message = forms.CharField(required=True,
                              widget=forms.Textarea(attrs={'placeholder': "Wiadmość:"}))