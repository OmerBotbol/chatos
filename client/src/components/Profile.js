import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatsWindow from './ChatsWindow';
import '../style/Profile.css';
import SettingsMenu from './SettingsMenu';
import { getHttp } from '../utils/httpRequests';
import { io } from 'socket.io-client';
const SERVER = 'http://127.0.0.1:5000';

function Profile({ user }) {
  const [currentChatId, setCurrentChatId] = useState('');
  const [currentChatName, setCurrentChatName] = useState('');
  const [settingsMenu, openSettingsMenu] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const socket = io(SERVER);

  socket.on('get-messages', (messages) => {
    setChatMessages(messages);
  });

  useEffect(() => {
    getHttp(`/api/chat?user_id=${user.id}`).then((result) => {
      setChats(result.data);
    });
  }, [user.id]);

  useEffect(() => {
    getHttp(`/api/image/${user.id}`).then((result) => {
      setUserImage(result.data);
    });
  });

  const openChatWindow = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChatName(chat.name);
    socket.emit('join-chat', chat.id);
  };

  return (
    <div id="profile">
      <div id="container">
        {user && (
          <ChatList
            user={user}
            chats={chats}
            currentChatId={currentChatId}
            userImage={userImage}
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
            socket={socket}
          />
        )}
      </div>
      <SettingsMenu
        user={user}
        openSettingsMenu={openSettingsMenu}
        settingsMenu={settingsMenu}
        setChats={setChats}
        setUserImage={setUserImage}
      />
    </div>
  );
}

export default Profile;
