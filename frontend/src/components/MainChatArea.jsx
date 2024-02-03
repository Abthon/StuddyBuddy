import React, { useEffect, useState } from "react";
import "../static/MainChatArea.css";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import ChatBubble from "./ChatBubble";
import "../static/ElevatedInput.css";
import useCrud from "../hooks/useCrud";
import { MEDIA_URL } from "../config";

function MainChatArea({ roomData }) {
  const [newMessage, setNewMessage] = useState([]);
  const { ServerId, ChannelId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [fetchData, dataCRUD] = useCrud([]);
  const user_id = localStorage.getItem("user_id");
  const chatContainerRef = React.useRef();
  
  const scrollToTop = () => {
    if (chatContainerRef.current) {
       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

   useEffect(() => {
    scrollToTop();
  }, [newMessage]);

  useEffect(() => {
    if (ChannelId) {
      setNewMessage([]);
      fetchData(`message/select?channelId=${ChannelId}`);
      setNewMessage(Array.isArray(dataCRUD) ? dataCRUD : []);
    }
    setNewMessage([]);
  }, [ChannelId]);


  useEffect(()=> {
      setNewMessage(dataCRUD);
  }, [dataCRUD])

  const socketUrl = ChannelId
    ? `ws://127.0.0.1:8000/${ServerId}/${ChannelId}/`
    : null;
  const onSendMessage = (e) => {
    e.preventDefault();
    sendJsonMessage({ type: "message", message: inputValue });
    setInputValue("");
    scrollToTop();
  };

  
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      if(!newMessage){
        fetchData(`message/select?channelId=${ChannelId}`);
      }
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
    },
  });

  return (
    <div className="chatArea">
      {ChannelId ? (
        <>
          <div ref={chatContainerRef} className="mainChatArea">
            {newMessage.map((msg, index) => {
              console.log(msg, "this is the message data");
              const isUser = user_id == msg.sender_id;
              return (
                <div key={index} className={isUser ? 'currentUser' : 'otherUser'}>
                  {!isUser ? <div><img className="senderAvatar" src={`${MEDIA_URL}${msg.sender_profile}/`} alt="" /></div> : null }
                  <ChatBubble message={msg.content} sender={isUser ? `user` : "other"} username={msg.sender_name}/>
                  {isUser ? <div><img className="senderAvatar" src={`${MEDIA_URL}${msg.sender_profile}/`} alt=""/></div> : null }
                </div>
              );
            })}
          </div>
          <form
            className="elevated-input-container"
            onSubmit={(e) => onSendMessage(e)}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="elevated-input"
              placeholder="Type something..."
            />
          </form>
        </>
      ) : (
        <div className="serverInfo">
          <h1>
            🌟Welcome to{" "}
            {roomData.length > 0 ? roomData[ServerId - 1].name : null}!🚀
          </h1>
          <p>
            We're thrilled to have you on board! Hop onto the channels and let
            the conversations begin! 🤖💬
          </p>
        </div>
      )}
    </div>
  );
}

export default MainChatArea;
