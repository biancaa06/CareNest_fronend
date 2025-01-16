import SidebarItem from './SidebarItem';

const Sidebar = ({conversations, error, openChatArea}) => {
  return (
    <div className="w-1/4 bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Conversations</h3>
      {error && 
        <p>{error}</p>}
      <ul>
        {conversations && conversations.map((conversation) => (
          <SidebarItem key={conversation.userId} item={conversation} openChatArea={openChatArea}/>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
