from django.contrib import admin, messages, auth
from django.core import exceptions

User = auth.get_user_model()

def user_create(email, password, is_admin = False, is_superuser=False, *args, **kwargs):
    user = User.objects.create_user(
        email=email,
        password=password,
        is_admin=is_admin
    )

    return user

@admin.register(User)
class BaseUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'status', 'is_admin', 'is_superuser', 'is_active', 'created_at', 'updated_at')

    search_fields = ('email',)

    list_filter = ('is_admin', 'is_superuser')

    fieldsets = (
        (None, {'fields': ('email', 'password', 'is_admin', 'is_superuser', 'status', 'name')}),
    )

    def save_model(self, request, obj, form, change):
        if change:
            return super().save_model(request, obj, form, change)
        try:
            user_create(**form.cleaned_data)
        except Exception as exc:
            self.message_user(request, str(exc), messages.ERROR)