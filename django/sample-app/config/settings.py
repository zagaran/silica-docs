"""
Django settings.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

from django.contrib.messages import constants as messages

import environ

env = environ.Env(
    ALLOWED_HOSTS=(list, []),
    DEBUG=(bool, False),
    LOCALHOST=(bool, False),
    MAINTENANCE_MODE=(bool, False),
    DEBUG_TOOLBAR=(bool, False),
)
environ.Env.read_env()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: do not run with debug turned on in production!
DEBUG = env("DEBUG")

# run with this set to False in production
LOCALHOST = env("LOCALHOST")

ALLOWED_HOSTS = env("ALLOWED_HOSTS")
if LOCALHOST is True:
    ALLOWED_HOSTS = ["127.0.0.1", "localhost"]


# Application definition
THIRD_PARTY_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "debug_toolbar",
    "sass_processor",
    "silica_django",
    "crispy_forms",
    "crispy_bootstrap5",
]

LOCAL_APPS = [
    "common",
    "application",
]

INSTALLED_APPS = THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "application.middleware.MaintenanceModeMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

MAINTENANCE_MODE = env("MAINTENANCE_MODE")


# START_FEATURE user_action_tracking
USER_TRACKING_EXEMPT_ROUTES = []
# END_FEATURE user_action_tracking


ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "common.context_processors.constants",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {"default": env.db()}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# START_FEATURE django_ses
if LOCALHOST:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
    DEFAULT_FROM_EMAIL = "webmaster@localhost"
else:
    EMAIL_BACKEND = "django_ses.SESBackend"
    AWS_SES_REGION_NAME = env("AWS_SES_REGION_NAME")
    AWS_SES_REGION_ENDPOINT = env("AWS_SES_REGION_ENDPOINT")
    AWS_SES_RETURN_PATH = env("DEFAULT_FROM_EMAIL")
    DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL")
# END_FEATURE django_ses

# Logging
# https://docs.djangoproject.com/en/dev/topics/logging/#django-security
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s"
        },
        "simple": {
            "format": "%(levelname)s %(message)s"
        },
    },
    "handlers": {
        "console": {
            "level": "WARNING",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "null": {
            "class": "logging.NullHandler",
        },
    },
    "loggers": {
        "django.request": {
            "handlers": ["console"]
        },
        "django.security.DisallowedHost": {
            "handlers": ["null"],
            "propagate": False,
        },
    },
}


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

AUTH_USER_MODEL = "common.User"

# Bootstrap styling for Django messages
MESSAGE_TAGS = {
    messages.DEBUG: "alert-info",
    messages.INFO: "alert-info",
    messages.SUCCESS: "alert-success",
    messages.WARNING: "alert-warning",
    messages.ERROR: "alert-danger",
}


DEBUG_TOOLBAR = DEBUG and env("DEBUG_TOOLBAR")
INTERNAL_IPS = ['127.0.0.1']
if DEBUG_TOOLBAR:
    MIDDLEWARE.append('debug_toolbar.middleware.DebugToolbarMiddleware')

SASS_PRECISION = 8  # Bootstrap's sass requires a precision of at least 8 to prevent layout errors
SASS_PROCESSOR_CUSTOM_FUNCTIONS = {
    'django-static': 'django.templatetags.static.static',
}
SASS_PROCESSOR_INCLUDE_DIRS = [
    os.path.join(BASE_DIR, 'static/styles'),
    os.path.join(BASE_DIR, 'node_modules'),
]
SASS_PROCESSOR_ROOT = os.path.join(BASE_DIR, 'static')
COMPRESS_ROOT = SASS_PROCESSOR_ROOT
