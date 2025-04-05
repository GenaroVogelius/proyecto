import React, { useRef, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

interface ChatProps {
  roomName: number;
}

const Chat: React.FC<ChatProps> = ({ roomName }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<ReconnectingWebSocket | null>(null);

  const connectWebSocket = () => {
    if (socketRef.current) return; // Already connected

    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    const wsUrl = `${wsProtocol}://localhost:8000/ws/chat/${roomName}/`;

    const socket = new ReconnectingWebSocket(wsUrl);

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket disconnected');
      setIsConnected(false);
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

  const sendMessage = () => {
    if (socketRef.current && input.trim() !== '') {
      socketRef.current.send(JSON.stringify({ message: input }));
      setInput('');
    }
  };

  return (
    <div className="p-4 border rounded max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-2">Chat Room: {roomName}</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={connectWebSocket}
          disabled={isConnected}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Connect
        </button>
        <button
          onClick={disconnectWebSocket}
          disabled={!isConnected}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Disconnect
        </button>
      </div>

      <div className="h-64 overflow-y-auto border p-2 mb-4 bg-gray-100 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="mb-1"
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          disabled={!isConnected}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
