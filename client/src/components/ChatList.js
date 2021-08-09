import '../style/ChatList.css';

function ChatList({
  user,
  currentChatId,
  userImage,
  openSettingsMenu,
  openChatWindow,
  chats,
}) {
  return (
    <ul id="chat-list">
      <div id="chat-list-header">
        <img id="profile-image" src={userImage} alt="profile" />
        <h3 id="username">{user.username}</h3>
        <button
          id="chat-manager-btn"
          onClick={() => openSettingsMenu((prev) => !prev)}
        >
          Settings
        </button>
      </div>
      {chats?.map((chat, i) => {
        return (
          <li
            key={i}
            className={currentChatId === chat.id ? 'current chat' : 'chat'}
            onClick={() => openChatWindow(chat)}
          >
            {chat.name}
          </li>
        );
      })}
    </ul>
  );
}

export default ChatList;
