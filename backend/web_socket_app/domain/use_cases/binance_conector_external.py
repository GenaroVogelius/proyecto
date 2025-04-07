from ..interfaces.external.WebSocket import WebSocketExternal
import ccxt, asyncio


class BinanceConector(WebSocketExternal):
    """
    Binance WebSocket connector for fetching order book data.
    """
    def __init__(self, symbol='BTC/USDT', on_data_update=None):
        super().__init__()
        self.symbol = symbol
        self.top_bid = None
        self.top_ask = None
        self._exchange = ccxt.binance({
                'enableRateLimit': True,
            })
        self.keep_running = True
        self.on_data_update = on_data_update  # Callback para notificar cambios en los datos
        
    def _update_order_book(self, bids, asks):
        """Actualiza el order book y notifica si hay cambios"""
        if bids != self.top_bid or asks != self.top_ask:
            self.top_bid = bids
            self.top_ask = asks
            if self.on_data_update:
                self.on_data_update(self.top_bid, self.top_ask)

    async def connect(self):
        """
        Connect to the Binance WebSocket.
        """
        try:
            print("Conectado a Binance WebSocket")
            # Resetear el estado de conexión
            self.keep_running = True
            # simula web socket de binance
            asyncio.create_task(self.fetch_order_book())
            return True

        except Exception as e:
            await self.handle_error(e)
            return False
    
    async def disconnect(self, code):
        """
        Handle WebSocket disconnect.
        Args:
            code: The WebSocket close code
        """
        try:
            print("Iniciando desconexión de Binance WebSocket")
            self.keep_running = False
            # Esperar un momento para asegurar que el bucle fetch_order_book se detenga
            await asyncio.sleep(1)
            print("Desconectado de Binance WebSocket")
            return True
        except Exception as e:
            print(f"Error al desconectar: {e}")
            return False

    async def fetch_order_book(self):
        
        while self.keep_running:
            try:
                order_book = self._exchange.fetch_order_book(self.symbol)
                bids = order_book['bids'] if order_book['bids'] else None
                asks = order_book['asks'] if order_book['asks'] else None
                self._update_order_book(bids, asks)
                print("Order book actualizado")
                await asyncio.sleep(2)  # Esperar 2 segundos antes del próximo envío
            except Exception as e:
                print(f"Error al obtener order book: {e}")
                await asyncio.sleep(1) 






