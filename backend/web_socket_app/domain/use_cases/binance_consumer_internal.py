import asyncio
import json
from ..interfaces.internal.WebSocket import WebsocketInterfaceInternal
from ..interfaces.external.WebSocket import WebSocketExternal



class BinanceConsumerInternal(WebsocketInterfaceInternal):
    def __init__(self, external_conector : WebSocketExternal, book_limitation=5, *args, **kwargs):
        super().__init__(external_conector=external_conector, book_limitation=book_limitation, *args, **kwargs)
        self.keep_running = True

    def _handle_order_book_update(self, top_bid, top_ask):
        """Maneja las actualizaciones del order book"""
        if self.keep_running:
            asyncio.create_task(self._send_order_book_update(top_bid, top_ask))

    async def _send_order_book_update(self, top_bid, top_ask):
        """Envía una actualización del order book al cliente"""
        try:
            await self.send(text_data=json.dumps({
                'type': 'orderbook_update',
                'top_bid': top_bid[:self.book_limitation] if top_bid else [],
                'top_ask': top_ask[:self.book_limitation] if top_ask else [],
            }))
        except Exception as e:
            print(f"Error al enviar actualización del order book: {e}")

    @classmethod
    def as_asgi(cls, *args, **kwargs):
        external_conector = kwargs.pop("external_conector", None)
        book_limitation = kwargs.pop("book_limitation", 5)
        return super().as_asgi(
            external_conector=external_conector,
            book_limitation=book_limitation,
            *args, **kwargs
        )

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Resetear el estado de conexión
        self.keep_running = True

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.send(text_data=json.dumps({
            'message': "Conectado exitosamente a web socket interno"
        })) 

        # Suscribirse al conector externo
        self.external_conector.subscribe(self._handle_order_book_update)

    async def disconnect(self, code):
        """
        Handle WebSocket disconnection.
        Args:
            code: The WebSocket close code
        """
        try:
            self.keep_running = False

            # Desuscribirse del conector externo
            await self.external_conector.unsubscribe(self._handle_order_book_update)

            # Abandonar el grupo del canal
            if self.room_group_name:
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )
        except Exception as e:
            print(f"Error during disconnect: {e}")
            await self.close()

