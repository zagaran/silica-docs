from django.db.models import TextChoices


class ApplicationItemOneChoice(TextChoices):
    choice1 = "choice one"


class ApplicationItemStatus(TextChoices):
    inactive = "inactive"
    active = "active"
    accepted = "accepted"
    rejected = "rejected"


class ApplicationOverallStatus(TextChoices):
    complete = "Completed"
    in_progress = "In Progress"
    canceled = "Canceled"


class UserRole(TextChoices):
    admin = "Admin"
    staff = "Staff User"
    applicant = "Applicant"


class Permissions:
    view_all_application_history = "view_all_application_history"
    view_own_application_history = "view_own_application_history"

    view_all_user_history = "view_all_user_history"
    view_own_user_history = "view_own_user_history"

    view_all_application_notes = "view_all_application_notes"

    edit_all_applications = "edit_all_applications"
    edit_own_application = "edit_own_application"

    edit_other_users = "edit_other_users"


USER_ROLE_TO_PERMISSIONS = {
    UserRole.admin.value: [
        # admin
        Permissions.edit_other_users,
        # history
        Permissions.view_all_application_history, Permissions.view_own_application_history,
        Permissions.view_all_user_history, Permissions.view_own_user_history,
        # notes
        Permissions.view_all_application_notes,
        # editing
        Permissions.edit_all_applications,
    ],
    UserRole.staff.value: [
        # history
        Permissions.view_all_application_history, Permissions.view_own_application_history,
        Permissions.view_all_user_history, Permissions.view_own_user_history,
        # notes
        Permissions.view_all_application_notes,
        # editing
        Permissions.edit_all_applications,
    ],
    UserRole.applicant.value: [
        # history
        Permissions.view_own_application_history,
        Permissions.view_own_user_history,
        Permissions.edit_own_application,
    ],
}
