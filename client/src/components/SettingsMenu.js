import React, { useRef, useState } from 'react';
import '../style/SettingsMenu.css';
import { postHttp, putHttp } from '../utils/httpRequests';
import { eraseCookie } from '../utils/cookies';

function SettingsMenu({ user, openSettingsMenu, settingsMenu, setChats }) {
  const [chatIdToJoin, setChatIdToJoin] = useState('');
  const [messageToUser, setMessageToUser] = useState('');
  const chatName = useRef();

  const createChat = () => {
    if (chatName.current.length > 0) {
      postHttp('/api/chat/create', {
        name: chatName.current,
        userId: user.id,
      }).then((result) => {
        setChats((prev) => [
          ...prev,
          { name: chatName.current, id: result.data.chatId },
        ]);
        alert(
          `to join this chat, enter this url: ${window.location.href}join?chatid=${result.data.chatId}`
        );
        openSettingsMenu(false);
        chatName.current = '';
      });
    } else {
      setMessageToUser('Please enter name for the chat');
    }
  };

  const joinToChat = () => {
    if (chatIdToJoin.length > 0) {
      putHttp('/api/chat/join', { chadId: chatIdToJoin, userId: user.id }).then(
        () => {
          openSettingsMenu(false);
        }
      );
    } else {
      setMessageToUser('Please enter chat ID');
    }
  };

  const logout = () => {
    eraseCookie('accessToken');
    eraseCookie('refreshToken');
  };

  return (
    <div id="settings-menu" className={settingsMenu ? 'open' : 'close'}>
      <div id="settings-menu-header">
        <h3>Settings</h3>
        <button
          id="close-btn"
          onClick={() => openSettingsMenu((prev) => !prev)}
        >
          X
        </button>
      </div>
      <div id="setting-container">
        <section id="create-chat">
          <h4 className="setting-header">Open new chat</h4>
          <input
            type="text"
            ref={chatName}
            onChange={(e) => (chatName.current = e.target.value)}
          />
          <button onClick={() => createChat()}>Create</button>
        </section>
        <section id="join-chat">
          <h4 className="setting-header">Join to chat</h4>
          <input
            type="text"
            placeholder="Enter Chat ID Here"
            onChange={(e) => setChatIdToJoin(e.target.value)}
          />
          <button onClick={() => joinToChat()}>Join</button>
        </section>
      </div>
      <button id="logout-btn" onClick={() => logout()}>
        logout
      </button>
      <p id="error-message">{messageToUser}</p>
    </div>
  );
}

export default SettingsMenu;
