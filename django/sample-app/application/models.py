from django.db import models

from application.constants import ApplicationItemOneChoice, ApplicationItemStatus, ApplicationOverallStatus
from common.models import TimestampedModel, User, Organization


class ApplicationCore(TimestampedModel):
    user = models.ForeignKey(User, related_name="applications", on_delete=models.PROTECT)
    organization = models.ForeignKey(Organization, related_name="applications", on_delete=models.PROTECT)
    overall_status = models.TextField(choices=ApplicationOverallStatus.choices, default=ApplicationOverallStatus.in_progress.value)

    class Meta:
        abstract = True


class ApplicantInformation(TimestampedModel):
    name = models.TextField()
    dob = models.DateField()
    address_line_one = models.TextField()
    address_line_two = models.TextField(blank=True, null=True)
    city = models.TextField()
    zip_code = models.IntegerField()
    state = models.CharField(max_length=2)
    phone_number = models.IntegerField()


class ApplicationItemCore(TimestampedModel):
    status = models.TextField(choices=ApplicationItemStatus.choices)


class ApplicationItemOne(ApplicationItemCore):
    choice = models.TextField(choices=ApplicationItemOneChoice.choices, null=True, blank=True)
    co_applicants = models.ForeignKey(ApplicantInformation, null=True, related_name="item_ones", on_delete=models.PROTECT)


class ApplicationItemTwo(ApplicationItemCore):
    notify_of_changes = models.BooleanField(null=True)


class Application(ApplicationCore):
    applicant = models.OneToOneField(ApplicantInformation, null=True, on_delete=models.PROTECT)
    item_one = models.OneToOneField(ApplicationItemOne, null=True, on_delete=models.PROTECT)
    item_two = models.OneToOneField(ApplicationItemTwo, null=True, on_delete=models.PROTECT)


class HistoryEvent(TimestampedModel):
    description = models.TextField()

    class Meta:
        abstract = True


class ApplicationEvent(HistoryEvent):
    application = models.ForeignKey(Application, related_name="application_events", on_delete=models.CASCADE)
    originating_user = models.ForeignKey(User, related_name="application_events", on_delete=models.CASCADE)


class UserEvent(HistoryEvent):
    user = models.ForeignKey(User, related_name="user_events", on_delete=models.CASCADE)


class ApplicationNote(TimestampedModel):
    owning_user = models.ForeignKey(User, related_name="application_notes", on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, related_name="application_notes", on_delete=models.CASCADE)
    application = models.ForeignKey(Application, related_name="application_notes", on_delete=models.CASCADE)
    content = models.TextField()
