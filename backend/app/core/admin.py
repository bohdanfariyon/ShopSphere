"""
Django admin customization
"""
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib import admin 
from django.utils.translation import gettext_lazy as _

from core import models


class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users."""
    ordering = ['id']
    list_display = ['email', 'name', 'phone_number', 'address', 'is_active', 'is_staff']  # Додано нові поля
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            _("Personal info"),
            {
                "fields": ("name", "phone_number", "address"),  # Додано нові поля
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "created_at", "updated_at")}),  # Додано нові поля
    )
    readonly_fields = ['last_login', 'created_at', 'updated_at']  # Додано нові поля

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email", 
                    "password1", 
                    "password2",
                    "name",
                    "phone_number",  # Додано нове поле
                    "address",  # Додано нове поле
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
    )

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Product)
admin.site.register(models.Category)
