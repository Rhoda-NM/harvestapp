import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatComponent from './ChatComponent';

const ConversationView = ({ donorId, foodBankId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages (you might want to add this logic)
    // setMessages(initialMessages);
  }, []);

  return (
    <div>
      <h2>Conversation with {foodBankId}</h2>
      <ChatComponent 
        donorId={donorId} 
        foodBankId={foodBankId}
        messages={messages}
        onMessageReceived={(newMessage) => {
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }}
      />
    </div>
  );
};

export default ConversationView;
