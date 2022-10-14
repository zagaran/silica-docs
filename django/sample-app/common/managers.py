from django.contrib.auth.models import UserManager
from application.constants import UserRole

class CustomUserManager(UserManager):

    def create_user(self, email, username=None, password=None, organization_id=None, user_role=UserRole.applicant):
        user = self.model(username=username, email=email, organization_id=organization_id, user_role=user_role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username=None, password=None, organization_id=None, user_role=UserRole.admin):
        user = self.model(username=username, email=email, organization_id=organization_id, user_role=user_role)
        user.set_password(password)
        user.save(using=self._db)
        return user
