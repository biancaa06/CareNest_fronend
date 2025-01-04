import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MessageItem = ({ claims, message }) => {
    const isOwnMessage = message.senderId === claims.userId;

    console.log(isOwnMessage);

    return (
        <div
          className={`p-3 rounded-lg mb-2 max-w-[70%] w-fit ${
            isOwnMessage
              ? 'bg-green-500 text-white self-end ml-auto'
              : 'bg-gray-200 text-black self-start mr-auto'
          }`}
        >
          {message.text}
        </div>
      );
};

export default MessageItem;
