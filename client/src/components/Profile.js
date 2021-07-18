import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatList from "./ChatList";
import ChatsWindow from "./ChatsWindow";
import "../style/Profile.css";
import SettingsMenu from "./SettingsMenu";

function Profile({ user }) {
  const fireStore = firebase.firestore();
  const refMessages = fireStore.collection("messages");
  const refUsers = fireStore.collection("users");
  const [currentChatId, setCurrentChatId] = useState("");
  const [currentChatName, setCurrentChatName] = useState("");
  const [settingsMenu, openSettingsMenu] = useState(false);

  const [chatMessages] = useCollectionData(
    refMessages.where("chatId", "==", currentChatId).orderBy("createdAt")
  );

  const [userProfile] = useCollectionData(
    refUsers.where("uid", "==", user.uid)
  );

  const openChatWindow = (chat) => {
    setCurrentChatId(chat.id);
    setCurrentChatName(chat.name);
  };

  return (
    <div id="profile">
      <div id="container">
        {userProfile && (
          <ChatList
            user={user}
            sourceImage={userProfile[0].imageUrl}
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
            sourceImage={userProfile[0].imageUrl}
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
