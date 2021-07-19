import React from 'react';
import '../style/ChatMessage.css';

function ChatMessage({ data, userId }) {
  return (
    <div className="bubble">
      <div className={userId === data.user_id ? 'box' : 'right box'}>
        <div className={userId === data.user_id ? 'my message' : 'message'}>
          <div className="userName">{data.username}</div>
          <p className="content">{data.content}</p>
          <div className="time">
            {new Date(data.createdAt).toTimeString().slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
