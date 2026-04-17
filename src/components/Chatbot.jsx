import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ theme = 'dark', userId = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi! I'm **Learnify Buddy** 🤖\n\nI can help you with:\n- Data structures & algorithms\n- Python, C++, Java\n- Problem-solving strategies\n\nWhat would you like to learn?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const isDark = theme === 'dark';
  const bg = isDark ? '#0d1117' : '#ffffff';
  const bgSecondary = isDark ? '#161b22' : '#f6f8fa';
  const borderColor = isDark ? '#30363d' : '#d0d7de';
  const textColor = isDark ? '#c9d1d9' : '#24292f';
  const textMuted = isDark ? '#8b949e' : '#57606a';
  const accentColor = isDark ? '#58a6ff' : '#0969da';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, user_id: userId })
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setMessages([...newMessages, { role: 'ai', content: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'ai', content: "I'm having trouble connecting to the server. Make sure the backend is running!" }]);
    } finally {
      setLoading(false);
    }
  };

  // Simple markdown renderer for bold, code, lists, etc.
  const renderContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Inline code
      line = line.replace(/`([^`]+)`/g, '<code style="background:' + (isDark ? '#21262d' : '#eff1f3') + ';padding:1px 5px;border-radius:4px;font-size:0.85em;font-family:monospace">$1</code>');
      // List items
      if (line.startsWith('- ')) {
        return <div key={i} style={{ paddingLeft: '12px', position: 'relative', marginBottom: '3px' }}><span style={{ position: 'absolute', left: 0 }}>•</span> <span dangerouslySetInnerHTML={{ __html: line.slice(2) }} /></div>;
      }
      // Numbered items
      const numMatch = line.match(/^(\d+)\.\s(.*)/);
      if (numMatch) {
        return <div key={i} style={{ paddingLeft: '16px', position: 'relative', marginBottom: '3px' }}><span style={{ position: 'absolute', left: 0, color: accentColor, fontWeight: 700 }}>{numMatch[1]}.</span> <span dangerouslySetInnerHTML={{ __html: numMatch[2] }} /></div>;
      }
      // Headers
      if (line.startsWith('### ')) return <div key={i} style={{ fontWeight: 700, marginTop: '6px', marginBottom: '4px' }} dangerouslySetInnerHTML={{ __html: line.slice(4) }} />;
      // Empty line
      if (!line.trim()) return <div key={i} style={{ height: '6px' }} />;
      // Regular line
      return <div key={i} dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };

  // Quick suggestion chips
  const suggestions = ['What is DP?', 'Explain Binary Search', 'Array vs Linked List', 'Big O notation'];

  return (
    <>
      {/* Chat Toggle Button */}
      <div 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', width: '56px', height: '56px',
          borderRadius: '50%', background: '#238636',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(35, 134, 54, 0.4)', cursor: 'pointer', zIndex: 1000,
          transition: 'all 0.3s', transform: isOpen ? 'scale(0)' : 'scale(1)',
          opacity: isOpen ? 0 : 1
        }}
      >
        <MessageCircle size={24} color="#fff" />
      </div>

      {/* Chat Window */}
      <div style={{
        position: 'fixed', bottom: isOpen ? '24px' : '-550px', right: '24px',
        width: '380px', height: '520px', background: bg,
        borderRadius: '16px', boxShadow: `0 16px 48px rgba(0,0,0,${isDark ? '0.5' : '0.15'})`,
        display: 'flex', flexDirection: 'column', zIndex: 1001,
        transition: 'bottom 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        border: `1px solid ${borderColor}`, overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '14px 16px', background: bgSecondary, borderBottom: `1px solid ${borderColor}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: '#238636', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: textColor }}>Learnify Buddy</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3fb950' }} />
                <span style={{ fontSize: '0.7rem', color: textMuted }}>AI-powered</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: textMuted, display: 'flex', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }} className="custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                background: msg.role === 'ai' ? '#238636' : accentColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px'
              }}>
                {msg.role === 'ai' ? <Bot size={14} color="#fff" /> : <User size={14} color="#fff" />}
              </div>
              <div style={{
                background: msg.role === 'ai' ? bgSecondary : accentColor,
                color: msg.role === 'ai' ? textColor : '#fff',
                padding: '10px 14px', borderRadius: '12px',
                fontSize: '0.85rem', lineHeight: '1.5',
                border: msg.role === 'ai' ? `1px solid ${borderColor}` : 'none'
              }}>
                {msg.role === 'ai' ? renderContent(msg.content) : msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start', maxWidth: '88%' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#238636', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={14} color="#fff" />
              </div>
              <div style={{ background: bgSecondary, padding: '10px 14px', borderRadius: '12px', border: `1px solid ${borderColor}`, color: textMuted, fontSize: '0.85rem' }}>
                <span className="pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions (only show at start) */}
        {messages.length <= 1 && (
          <div style={{ padding: '0 14px 8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => { setInput(s); }} style={{
                padding: '5px 10px', borderRadius: '16px', border: `1px solid ${borderColor}`,
                background: 'transparent', color: accentColor, fontSize: '0.75rem',
                cursor: 'pointer', fontWeight: 500
              }}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={sendMessage} style={{ padding: '12px', background: bgSecondary, borderTop: `1px solid ${borderColor}`, display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about DSA, algorithms..."
            style={{ 
              flex: 1, padding: '10px 14px', borderRadius: '10px', 
              border: `1px solid ${borderColor}`, outline: 'none', 
              background: bg, color: textColor, fontSize: '0.85rem'
            }}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            style={{ 
              width: '40px', height: '40px', borderRadius: '10px', 
              background: input.trim() ? '#238636' : borderColor, 
              color: '#fff', border: 'none', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: '0.2s'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
