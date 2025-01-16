import { Client } from '@stomp/stompjs';
import TokenManager from './TokenManager';

const WebSocketService = {
  stompClient: null,

  connect: (brokerURL, onConnectCallback) => {
    if (WebSocketService.stompClient && WebSocketService.stompClient.connected) {
      console.log('WebSocket is already connected');
      return;
    }

    WebSocketService.stompClient = new Client({
      brokerURL,
      connectHeaders: {
        Authorization: `Bearer ${TokenManager.getAccessToken()}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    WebSocketService.stompClient.onConnect = () => {
      console.log('WebSocket connected');
      if (onConnectCallback) {
        onConnectCallback();
      }
    };

    WebSocketService.stompClient.onStompError = (error) => {
      console.error('STOMP Error:', error);
    };

    WebSocketService.stompClient.onWebSocketError = (error) => {
      console.error('WebSocket Error:', error);
    };

    WebSocketService.stompClient.onDisconnect = () => {
      console.log('WebSocket disconnected');
    };

    WebSocketService.stompClient.activate();
  },

  subscribe: (destination, onMessageCallback) => {
    if (!WebSocketService.stompClient || !WebSocketService.stompClient.connected) {
      console.error('WebSocket is not connected');
      return null;
    }

    const subscription = WebSocketService.stompClient.subscribe(destination, (message) => {
      try {
        const parsedMessage = JSON.parse(message.body);
        if (onMessageCallback) {
          onMessageCallback(parsedMessage);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err, "Raw message:", message.body);
      }
    });

    return subscription;
  },

  disconnect: () => {
    if (WebSocketService.stompClient && WebSocketService.stompClient.connected) {
      WebSocketService.stompClient.deactivate();
      console.log('WebSocket disconnected');
    }
  },
};

export default WebSocketService;
