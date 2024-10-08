import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter,URLRouter
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django_application = get_asgi_application()

from . import urls  # noqa isort:skip
from webchat.middleware import JWTAuthMiddleWare

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddleWare(URLRouter(urls.websocket_urlpatterns)),
    }
)
