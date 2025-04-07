from django.urls import re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from .domain.use_cases.binance_consumer_internal import BinanceConsumerInternal
from .domain.use_cases.binance_conector_external import BinanceConector

# Create instances of connectors
binance_connector = BinanceConector()

# WebSocket URL patterns
websocket_urlpatterns = [
    re_path(
        r'ws/binance/(?P<room_name>\w+)/$',
        BinanceConsumerInternal.as_asgi(
            external_conector=binance_connector,
            book_limitation=5
        )
    ),
]

# Application routing
application = ProtocolTypeRouter({
    "websocket": URLRouter(websocket_urlpatterns),
}) 