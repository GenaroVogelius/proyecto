import React, { useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import Button from './Button/Button';
import { useOrderBookStore } from '../../store/orderBookStore';

interface ChatProps {
  roomName: number;
}

const Consumer: React.FC<ChatProps> = ({ roomName }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const socketRef = useRef<ReconnectingWebSocket | null>(null);
  const updateOrderBook = useOrderBookStore((state) => state.updateOrderBook);

  const connectWebSocket = () => {
    if (socketRef.current || isConnecting) return; // Ya conectado o conectando

    setIsConnecting(true);

    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${wsProtocol}://localhost:8000/ws/binance/${roomName}/`;

    const socket = new ReconnectingWebSocket(wsUrl);

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      setIsConnected(true);
      setIsConnecting(false);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📩 Message received:', data);
      if (data.type === 'orderbook_update') {
        // Actualizamos el store con los nuevos datos del orderbook
        updateOrderBook({
          bids: data.top_bid || [],
          asks: data.top_ask || []
        });
      }
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      setIsConnected(false);
      setIsConnecting(false);
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket disconnected');
      setIsConnected(false);
      setIsConnecting(false);
      socketRef.current = null;
    };

    socketRef.current = socket;
  };

  const disconnectWebSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsConnected(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex gap-2 mb-4 justify-center items-center">
        <Button 
          onTap={connectWebSocket} 
          disabled={isConnected || isConnecting}
        >
          {isConnecting ? 'Conectando...' : 'Connect'}
        </Button>
        <Button 
          onTap={disconnectWebSocket} 
          disabled={!isConnected}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default Consumer;
