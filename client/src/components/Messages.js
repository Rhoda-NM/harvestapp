import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

const MessageForm = ({ recipientId, onMessageSent }) => {
    const [content, setContent] = useState('');
    const { isLoggedIn } = useAuth();
    const token = localStorage.getItem('token');
  
    const sendMessage = async (e) => {
      e.preventDefault();
      if (!isLoggedIn) {
        alert('You must be logged in to send a message.');
        return;
      }
      try {
        const response = await axios.post(`${API_URL}/conversation`, {
          recipient_id: recipientId,
          content: content
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert('Message sent successfully');
        setContent('');
        if (onMessageSent) onMessageSent();
      } catch (error) {
        alert('Error sending message: ' + error.response?.data?.error || error.message);
      }
    };
  
    return (
      <form onSubmit={sendMessage}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message here"
          required
        />
        <button type="submit">Send Message</button>
      </form>
    );
  };
export default MessageForm;  