from ..interfaces.external.WebSocket import WebSocketExternal
import ccxt, asyncio


class BinanceConector(WebSocketExternal):
    """
    Binance WebSocket connector for fetching order book data.
    """
    def __init__(self, symbol='BTC/USDT'):
        super().__init__()
        self.symbol = symbol
        self.top_bid = None
        self.top_ask = None
        self._exchange = ccxt.binance({
                'enableRateLimit': True,
            })
        self.keep_running = True
        self._subscribers = set() 
        self._disconnect_task = None
        
    def subscribe(self, callback):
        """Adds a new subscriber to the list of callbacks."""
        self._subscribers.add(callback)
        # If there is only one subscriber, connect the WebSocket
        if len(self._subscribers) == 1:
            asyncio.create_task(self.connect())
        
    async def unsubscribe(self, callback):
        """Removes a subscriber from the list of callbacks."""
        self._subscribers.discard(callback)
        # If there are no more subscribers, disconnect the WebSocket
        if not self._subscribers:
            if self._disconnect_task is None or self._disconnect_task.done():
                self._disconnect_task = asyncio.create_task(self.disconnect(None))
                try:
                    await self._disconnect_task
                except Exception as e:
                    print(f"Error durante la desconexión: {e}")
        
    def _update_order_book(self, bids, asks):
        """Actualiza el order book y notifica a todos los suscriptores"""
        if bids != self.top_bid or asks != self.top_ask:
            self.top_bid = bids
            self.top_ask = asks
            for callback in self._subscribers:
                callback(self.top_bid, self.top_ask)

    async def connect(self):
        """
        Connect to the Binance WebSocket.
        """
        try:
            print("Conectado a Binance WebSocket")
            self.keep_running = True
            asyncio.create_task(self.fetch_order_book())
            return True
        except Exception as e:
            await self.handle_error(e)
            return False
    
    async def disconnect(self, code):
        """
        Handle WebSocket disconnection.
        Args:
            code: The WebSocket close code
        """
        try:
            
            self.keep_running = False
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
                await asyncio.sleep(2)
            except Exception as e:
                print(f"Error al obtener order book: {e}")
                await asyncio.sleep(1) 






