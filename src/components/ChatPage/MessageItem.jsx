import React from 'react';

const MessageItem = ({ claims, message }) => {
  const isOwnMessage = message.senderId === claims.userId;

  const formattedDate = new Date(message.date).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className={`flex flex-col mb-4 ${
        isOwnMessage ? 'items-end' : 'items-start'
      }`}
    >
      <div
        className={`p-3 rounded-lg max-w-[70%] w-fit ${
          isOwnMessage
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-black'
        }`}
      >
        {message.text}
      </div>

      <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
    </div>
  );
};

export default MessageItem;
