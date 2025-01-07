import React, { useEffect, useRef, useState } from 'react';
import MessageItem from './MessageItem';
import { getConversationMessages, sendMessage as sendMessageAPI } from '../../services/MessageService';

const ChatArea = ({ claims, receiverId, receiverName, messages, setMessages }) => {
  const [input, setInput] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    try {
      const newMessage = {
        receiverId,
        text: input,
        senderId: parseInt(claims.userId, 10),
        timestamp: new Date().toISOString(),
      };

      const response = await sendMessageAPI(newMessage);

      setMessages((prevMessages) => [...prevMessages, response.data]);

      setInput('');
    } catch (err) {
      setError(err.message || 'Failed to send message');
    }
  };

  const loadMessages = async () => {
    try {
      const response = await getConversationMessages({
        contactedUserId: receiverId,
        connectedUserId: parseInt(claims.userId, 10),
        pageNumber,
        itemsPerPage: 20,
      });

      setMessages(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load messages');
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (receiverId) {
      loadMessages();
    }
  }, [receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!receiverId) {
    return (
      <div className="flex flex-col flex-grow items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
        <p className="text-gray-600">Select a conversation to start chatting.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col flex-grow items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold mb-2 text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">Conversation with {receiverName}</h2>
      <div
        ref={messagesEndRef}
        className="flex-grow border border-gray-300 rounded p-4 overflow-y-auto mb-4 space-y-2"
      >
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} claims={claims} />
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow border border-gray-300 rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
