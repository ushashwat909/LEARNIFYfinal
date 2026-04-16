import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi! I'm Learnify Buddy. What subject or concept are you struggling with today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      
      setMessages([...newMessages, { role: 'ai', content: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', content: "Oops, Learnify Buddy is resting right now. Try again later!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div 
        onClick={toggleChat}
        style={{
          position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px',
          borderRadius: '50%', background: 'linear-gradient(135deg, #E9C46A 0%, #E76F51 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(233, 196, 106, 0.4)', cursor: 'pointer', zIndex: 1000,
          transition: 'transform 0.3s ease', transform: isOpen ? 'scale(0)' : 'scale(1)'
        }}
      >
        <span style={{ fontSize: '24px' }}>💬</span>
      </div>

      {/* Chat Window */}
      <div style={{
        position: 'fixed', bottom: isOpen ? '30px' : '-600px', right: '30px',
        width: '350px', height: '500px', background: '#FAFAFA',
        borderRadius: '24px', boxShadow: '0 12px 40px rgba(51, 65, 85, 0.15)',
        display: 'flex', flexDirection: 'column', zIndex: 1001,
        transition: 'bottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        border: '1px solid var(--color-border)', overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px', background: '#FFFFFF', borderBottom: '1px solid var(--color-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#E9C46A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🤖
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#334155' }}>Learnify Buddy</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>Online</p>
            </div>
          </div>
          <button 
            onClick={toggleChat}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}
          >
            ✕
          </button>
        </div>

        {/* Messages Body */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
              background: msg.role === 'ai' ? '#FFFFFF' : '#334155',
              color: msg.role === 'ai' ? '#334155' : '#FFFFFF',
              padding: '12px 16px', borderRadius: '16px',
              borderBottomLeftRadius: msg.role === 'ai' ? '4px' : '16px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
              maxWidth: '85%', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              fontSize: '0.95rem', lineHeight: '1.5'
            }}>
              {msg.content}
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', background: '#FFFFFF', padding: '12px 16px', borderRadius: '16px', borderBottomLeftRadius: '4px', color: '#888' }}>
              Buddy is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} style={{ padding: '16px', background: '#FFFFFF', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid var(--color-border)', outline: 'none', background: '#FAFAFA' }}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#334155', color: '#FFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            ↑
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
