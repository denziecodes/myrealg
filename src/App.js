import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const SOCKET_SERVER_URL = 'https://your-backend.up.railway.app'; // Replace with your backend URL
const socket = io(SOCKET_SERVER_URL);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    socket.emit('chat message', input);
    setInput('');
  };

  return (
    <div className="chat-container">
      <h1>MyRealG Chat</h1>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message">{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
