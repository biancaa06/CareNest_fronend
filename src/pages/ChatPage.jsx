import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/ChatPage/Sidebar';
import ChatArea from '../components/ChatPage/ChatArea';
import { getUsersWithConversation, getConversationMessages } from '../services/MessageService';
import WebSocketService from '../services/WebSocketService';

const ChatPage = ({ claims }) => {
  const location = useLocation();
  const initialChat = location.state?.initialChat;

  const [conversations, setConversations] = useState(null);
  const [error, setError] = useState("");
  const [selectedChat, setSelectedChat] = useState(initialChat);
  const [messages, setMessages] = useState([]);

  const fetchConversations = async () => {
    if (!claims || !claims.userId) {
      console.error("Claims or userId is not available.");
      return;
    }

    try {
      const response = await getUsersWithConversation({ connectedUserId: parseInt(claims.userId, 10) });
      setConversations(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch conversations");
    }
  };

  const fetchMessagesForChat = async (userId) => {
    setMessages([]);
    try {
      const response = await getConversationMessages({
        contactedUserId: userId,
        connectedUserId: parseInt(claims.userId, 10),
        pageNumber: 0,
        itemsPerPage: 20,
      });
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError("Failed to fetch messages");
    }
  };

  const openChatArea = (conversation) => {
    console.log("Opening chat with:", conversation);
    setSelectedChat(conversation);
    fetchMessagesForChat(conversation.userId);
  };

  useEffect(() => {
    if (claims?.userId) {
      fetchConversations();
    }
  }, [claims]);

  useEffect(() => {
    if (initialChat) {
      setSelectedChat(initialChat);
      fetchMessagesForChat(initialChat.userId);
    }
  }, [initialChat]);

  useEffect(() => {
    console.log("subscribed")
    const subscription = WebSocketService.subscribe(
      `/user/${claims.userId}/queue/inboxmessages`,
      (newMessage) => {
        console.log("New message received:", newMessage);
        if (
          newMessage.senderId === selectedChat?.userId ||
          newMessage.receiverId === selectedChat?.userId
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          console.log("Message does not belong to the current chat");
        }
      }
    );
  }, [claims.userId, selectedChat]);

  return (
    <div className="flex h-[calc(100vh-70px)]">
      <Sidebar conversations={conversations} error={error} openChatArea={openChatArea} />
      {selectedChat ? (
        <ChatArea
          claims={claims}
          receiverId={selectedChat?.userId}
          receiverName={selectedChat?.userName}
          messages={messages}
          setMessages={setMessages}
        />
      ) : (
        <div className="flex flex-col flex-grow items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-gray-600">Select a conversation to start chatting.</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
