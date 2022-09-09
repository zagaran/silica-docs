import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from application.constants import UserRole, USER_ROLE_TO_PERMISSIONS


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
    email = models.EmailField(unique=True)
    organization = models.ForeignKey(Organization, related_name="users", on_delete=models.PROTECT)
    user_role = models.TextField(choices=UserRole.choices, default=UserRole.applicant)

    def has_permission(self, permission):
        return permission in USER_ROLE_TO_PERMISSIONS[self.user_role]

    def __str__(self):
        return self.email
