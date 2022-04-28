from django.conf import settings
from django.conf.urls import url
from django.urls import include, path

from application import views

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("health_check/", views.HealthCheckView.as_view(), name="health_check"),
    path("logout", views.LogoutView.as_view(), name="logout"),
    path("normal_form/", views.StandardFormView.as_view(), name="normal_form"),
    path("applications/", views.ApplicationView.as_view(), name="view_applications"),
    path("applications/", views.ApplicationView.as_view(), name="create_application"),
    path("applications/<uuid:pk>/", views.ApplicationView.as_view(), name="update_application"),
]

if settings.DEBUG_TOOLBAR:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
