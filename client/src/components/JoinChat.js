import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

function JoinChat({ userId }) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const chatId = query.get('chatid');
  const [chatUsers, setChatUsers] = useState({});
  const [messageToUser, setMessageToUser] = useState('you will redirect soon');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (chatUsers && !finished) {
      setFinished(true);
      const isExist = chatUsers[0].users.includes(userId);
      if (!isExist) {
        refChats.doc(chatId).update({ users: [...chatUsers[0].users, userId] });
      } else {
        setMessageToUser('You are already in this chat');
      }
    }
  }, [chatUsers, chatId, finished, refChats, userId]);

  return <>{finished ? <Redirect to="/" /> : <div>{messageToUser}</div>}</>;
}

export default JoinChat;
