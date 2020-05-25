from django.contrib import admin
from django.utils.html import mark_safe
from django.conf import settings
from .models import Gallery, Photo
from .forms import ResizeForm
from sorl.thumbnail.admin import AdminImageMixin

def remove_from_main(modeladmin, request, queryset):
    queryset.update(main=False)


def add_to_main(modeladmin, request, queryset):
    queryset.update(main=True)


remove_from_main.short_description = 'Remove from main page'
add_to_main.short_description = 'Show on main page'


class ImageInline(AdminImageMixin, admin.StackedInline):
    model = Photo
    extra = 0
    exclude = ['name']


class GalleryAdmin(AdminImageMixin, admin.ModelAdmin):
    list_display = ['title', 'main', 'gallery_thumbnail', 'photos', 'created', 'updated']
    list_filter = ['main']
    search_fields = ['title', 'location', 'description']
    readonly_fields = ['javascript']
    list_per_page = 10
    inlines = [ImageInline]
    actions = [remove_from_main, add_to_main]
    # form = ResizeForm
    fieldsets = (
        ('Main Fields', {
            'fields': ('title', 'description', 'location')
        }),
        ('Options', {
            'fields': ('main', 'javascript')
        })
    )

    # def save_model(self, request, obj, form, change):
    #     resize = int(form.cleaned_data['resize'])
    #     obj.save(resize=resize)
        
    def photos(self, instance):
        return instance.photos.count()

    def gallery_thumbnail(self, instance):
        src = instance.photos.first().image.url
        return mark_safe('<img src="{}" width="160" height="100" alt="No thumbnail">'.format(src))

    def javascript(self, instance):
        return mark_safe('''<script type="text/javascript" src="/static/js/previews.js"></script>''')


admin.site.register(Gallery, GalleryAdmin)
admin.site.site_header = "Edycja Cięte"
admin.site.site_title = "Wybierz element:"
admin.site.index_title = "Edycja Cięte"
