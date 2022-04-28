from django.conf import settings


def constants(request):
    return {
        "DEBUG": settings.DEBUG,
    }
