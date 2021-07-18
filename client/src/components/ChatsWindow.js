import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import '../style/ChatWindow.css';
import { postHttp } from '../utils/httpRequests';

function ChatsWindow({
  chatMessages,
  header,
  user,
  currentChatId,
  settingsMenu,
}) {
  const [content, setContent] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const sendMessage = () => {
    const dataToSend = {
      chatId: currentChatId,
      content: content,
      userId: user.id,
      username: user.username,
    };
    postHttp('/api/message', dataToSend).then(() => {
      setContent('');
    });
  };

  const generate = () => {
    alert(`${window.location.href}join?chatid=${currentChatId}`);
  };

  return (
    <div id="chat-window" className={settingsMenu ? 'shadow-theme' : ''}>
      <div id="chat-header">
        <h3>{header}</h3>
        <div>{`chat ID: ${currentChatId}`}</div>
        <button id="generate-btn" onClick={() => generate()}>
          Generate Link
        </button>
      </div>
      <div id="chat-content">
        {chatMessages?.map((data, i) => {
          return <ChatMessage data={data} key={i} userId={user.uid} />;
        })}
        <div ref={divRef} />
      </div>
      <div id="user-input">
        <input
          id="message-input"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button id="send-btn" onClick={(e) => sendMessage(e)}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatsWindow;
