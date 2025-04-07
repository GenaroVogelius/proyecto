import os
from channels.routing import ProtocolTypeRouter, URLRouter
from web_socket_app.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = ProtocolTypeRouter({
    "websocket": URLRouter(websocket_urlpatterns),
}) 