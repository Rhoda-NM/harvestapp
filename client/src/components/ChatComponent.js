import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:5000');

const ChatComponent = ({ donorId, foodBankId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.emit('join', { donor_id: donorId, food_bank_id: foodBankId, user_id: userId });

    socket.on('new_message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leave', { donor_id: donorId, food_bank_id: foodBankId, user_id: userId });
    };
  }, [donorId, foodBankId, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('send_message', {
      donor_id: Math.min(donorId, foodBankId),
      food_bank_id: Math.max(donorId, foodBankId),
      sender_id: donorId,
      recipient_id: foodBankId,
      content: newMessage
    });
    setNewMessage('');
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/messages/${donorId}/${foodBankId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        const fetchedMessages = await response.json();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();
  }, [donorId, foodBankId]);

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={message.id}>
            <span>{message.content}</span>
            <small>{new Date(message.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
