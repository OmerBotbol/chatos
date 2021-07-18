import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import '../style/ChatList.css';
import { getHttp } from '../utils/httpRequests';

function ChatList({
  user,
  sourceImage,
  currentChatId,
  openSettingsMenu,
  openChatWindow,
}) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getHttp(`/api/chat?userId=${user.id}`).then((result) => {
      setChats(result.data);
    });
  });

  return (
    <ul id="chat-list">
      <div id="chat-list-header">
        <img id="profile-image" src={sourceImage} alt="profile" />
        <h3 id="username">{user.displayName}</h3>
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
