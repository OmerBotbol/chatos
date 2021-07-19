import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatsWindow from './ChatsWindow';
import '../style/Profile.css';
import SettingsMenu from './SettingsMenu';
import { getHttp } from '../utils/httpRequests';

function Profile({ user }) {
  const [currentChatId, setCurrentChatId] = useState('');
  const [currentChatName, setCurrentChatName] = useState('');
  const [settingsMenu, openSettingsMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getHttp(`/api/chat?user_id=${user.id}`).then((result) => {
      setChats(result.data);
    });
  }, [user.id]);

  const openChatWindow = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChatName(chat.name);
    getHttp(`/api/massage?chatId=${chat.id}`, 'accessToken').then((result) => {
      setChatMessages(result.data);
    });
  };

  return (
    <div id="profile">
      <div id="container">
        {user && (
          <ChatList
            user={user}
            chats={chats}
            currentChatId={currentChatId}
            openSettingsMenu={openSettingsMenu}
            openChatWindow={openChatWindow}
          />
        )}
        {currentChatId && (
          <ChatsWindow
            header={currentChatName}
            currentChatId={currentChatId}
            chatMessages={chatMessages}
            user={user}
            settingsMenu={settingsMenu}
          />
        )}
      </div>
      <SettingsMenu
        user={user}
        openSettingsMenu={openSettingsMenu}
        settingsMenu={settingsMenu}
        setChats={setChats}
      />
    </div>
  );
}

export default Profile;
