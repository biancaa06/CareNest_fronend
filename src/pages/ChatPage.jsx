import React, { useEffect, useState } from 'react';
import Sidebar from '../components/ChatPage/Sidebar';
import ChatArea from '../components/ChatPage/ChatArea';
import { getUsersWithConversation } from '../services/MessageService';

const ChatPage = ({ claims }) => {
  const [conversations, setConversations] = useState(null);
  const [error, setError] = useState("");

  const [selectedChat, setSelectedChat] = useState(null);

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
      if (err.status === 401 || err.status === 403) {
        setUnauthorized(true);
      } else {
        setError("Failed to fetch conversations");
      }
    }
  };

  const openChatArea = (item) =>{
    setSelectedChat(item);
  }

  useEffect(() => {
    if (claims?.userId) {
      fetchConversations(parseInt(claims.userId, 10));
    }
  }, [claims]);

  return (
    <div className="flex h-[calc(100vh-70px)]">
      <Sidebar conversations={conversations} error={error} openChatArea={openChatArea}/>
      <ChatArea claims={claims} receiverId={selectedChat?.userId} receiverName={selectedChat?.userName}/>
    </div>
  );
};

export default ChatPage;
