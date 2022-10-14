import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from application.constants import UserRole, USER_ROLE_TO_PERMISSIONS
from common.managers import CustomUserManager

class TimestampedModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def update(self, update_dict=None, **kwargs):
        """ Helper method to update objects """
        if not update_dict:
            update_dict = kwargs
        update_fields = {"updated_on"}
        for k, v in update_dict.items():
            setattr(self, k, v)
            update_fields.add(k)
        self.save(update_fields=update_fields)

    class Meta:
        abstract = True


class Organization(TimestampedModel):
    name = models.TextField()
    
    def __str__(self):
        return self.name


# Create your models here.
class User(AbstractUser, TimestampedModel):

    objects = CustomUserManager()

    email = models.EmailField(unique=True)
    organization = models.ForeignKey(Organization, related_name="users", on_delete=models.PROTECT, null=True)
    user_role = models.TextField(choices=UserRole.choices)
    username = None  # disable the AbstractUser.username field
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def has_permission(self, permission):
        return permission in USER_ROLE_TO_PERMISSIONS[self.user_role]

    @property
    def is_superuser(self):
        return self.user_role == UserRole.admin.value

    @property
    def is_admin(self):
        return self.user_role == UserRole.admin.value

    @property
    def is_staff(self):
        return self.user_role == UserRole.staff.value

    def __str__(self):
        return self.email
