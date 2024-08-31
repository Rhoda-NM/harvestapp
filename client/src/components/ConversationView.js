import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Make sure this path is correct


const ConversationView = ({ conversationId }) => {
    const [messages, setMessages] = useState([]);
    const { isLoggedIn } = useAuth();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    useEffect(() => {
      if (isLoggedIn && conversationId) {
        fetchMessages();
      }
    }, [isLoggedIn, conversationId]);
  
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/conversation/${conversationId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
  
    const getOtherPartyRole = (message) => {
      return message.sender_role === role ? message.recipient_role : message.sender_role;
    };
  
    if (!isLoggedIn) {
      return <p>Please log in to view messages.</p>;
    }
  
    return (
      <div>
        <h2>Conversation</h2>
        {messages.map(message => (
          <div key={message.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>{message.sender_role === role ? 'You' : getOtherPartyRole(message)}:</strong> {message.content}</p>
            <p><strong>Sent at:</strong> {new Date(message.timestamp).toLocaleString()}</p>
          </div>
        ))}
        <MessageForm recipientId={messages[0]?.sender_id === localStorage.getItem('userId') ? messages[0]?.recipient_id : messages[0]?.sender_id} onMessageSent={fetchMessages} />
      </div>
    );
  };
export default ConversationView;  