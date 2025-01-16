import api from "../../api.config";

function sendMessage({receiverId,text,senderId}){
    return api.post(`/message/${receiverId}`,{text, senderId})
}

function getConversationMessages({ contactedUserId, connectedUserId, pageNumber, itemsPerPage }) {
    return api.get(`/message/${contactedUserId}`, {
      params: {
        connectedUserId,
        pageNumber,
        itemsPerPage,
      },
    });
  }
  

function getUsersWithConversation({ connectedUserId }) {
    return api.get(`/message/conversations/${connectedUserId}`);
}

export{
    sendMessage,
    getConversationMessages,
    getUsersWithConversation
}