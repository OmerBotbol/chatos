import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { putHttp } from '../utils/httpRequests';

function JoinChat({ userId }) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const chatId = query.get('chatid');
  const [messageToUser, setMessageToUser] = useState('you will redirect soon');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    putHttp('/api/chat/join', { chatId, userId })
      .then(() => {
        setFinished((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        setMessageToUser('we had a problem, please try again later');
      });
  }, [chatId, userId]);

  return <>{finished ? <Redirect to="/" /> : <div>{messageToUser}</div>}</>;
}

export default JoinChat;
