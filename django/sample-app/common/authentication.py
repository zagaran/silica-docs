from django.contrib.auth.mixins import AccessMixin
from django.core.exceptions import ImproperlyConfigured


class UserHasPermissionMixin(AccessMixin):
    """Class view mixin to restrict access to users with the provided permission"""
    permission = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.permission is None:
            raise ImproperlyConfigured(f"{self.__class__.__name__} must define a permission")

    def has_permission(self):
        if not self.request.user.is_authenticated:
            return False
        if self.request.user.has_permission(self.permission):
            return True
        return False

    def dispatch(self, request, *args, **kwargs):
        if not self.has_permission():
            return self.handle_no_permission()
        return super().dispatch(request, *args, **kwargs)
