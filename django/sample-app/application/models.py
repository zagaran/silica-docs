import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


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


# Create your models here.
class User(AbstractUser, TimestampedModel):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email


class Application(TimestampedModel):
    name = models.TextField()
    dob = models.DateField()
    is_eligible = models.BooleanField(default=True)
    eligible_reason = models.TextField(blank=True, default="")
    ineligible_reason = models.TextField(blank=True, default="")
    can_appeal = models.BooleanField(default=False)


class ApplicationNote(TimestampedModel):
    application = models.ForeignKey(Application, related_name="application_notes", on_delete=models.CASCADE)
    content = models.TextField()

