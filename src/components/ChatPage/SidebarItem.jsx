import React from 'react';

const SidebarItem = ({ item, openChatArea }) => {
  const getProfileImageSrc = () => {
    if (item.userImage) {
      return item.userImage.startsWith('data:image')
        ? item.userImage
        : `data:image/jpeg;base64,${item.userImage}`;
    }
    return null;
  };

  const profileImageSrc = getProfileImageSrc();

  return (
    <li
      className="flex items-center p-2 cursor-pointer hover:bg-green-200 rounded"
      onClick={() => openChatArea(item)}
    >
      {profileImageSrc ? (
        <img
          src={profileImageSrc}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-semibold mr-2">
          {item.userName[0]}
        </div>
      )}
      <span>{item.userName}</span>
    </li>
  );
};

export default SidebarItem;
