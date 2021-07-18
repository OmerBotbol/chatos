import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatsWindow from './ChatsWindow';
import '../style/Profile.css';
import SettingsMenu from './SettingsMenu';
import axios from 'axios';
import { getHttp } from '../utils/httpRequests';

function Profile({ user }) {
  const [currentChatId, setCurrentChatId] = useState('');
  const [currentChatName, setCurrentChatName] = useState('');
  const [settingsMenu, openSettingsMenu] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

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
        {userProfileImage && (
          <ChatList
            user={user}
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
      />
    </div>
  );
}

export default Profile;
