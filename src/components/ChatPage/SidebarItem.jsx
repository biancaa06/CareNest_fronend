import React from 'react';

const SidebarItem = ({ item, openChatArea}) => {
  return (
    <li className="p-2 cursor-pointer hover:bg-green-200 rounded"
        onClick={() => openChatArea(item)}
    >
      {item.userName}
    </li>
  );
};

export default SidebarItem;