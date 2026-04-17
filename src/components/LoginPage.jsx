import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage = ({ onLogin, theme }) => {
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const isDark = theme === 'dark';
    const bg = isDark ? '#0d1117' : '#f6f8fa';
    const cardBg = isDark ? '#161b22' : '#ffffff';
    const borderColor = isDark ? '#30363d' : '#d0d7de';
    const textColor = isDark ? '#c9d1d9' : '#24292f';
    const textMuted = isDark ? '#8b949e' : '#57606a';
    const accentColor = isDark ? '#58a6ff' : '#0969da';
    const inputBg = isDark ? '#0d1117' : '#ffffff';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (username.length < 3) { setError('Username must be at least 3 characters'); return; }
        if (password.length < 4) { setError('Password must be at least 4 characters'); return; }
        if (mode === 'register' && password !== confirmPassword) { setError('Passwords do not match'); return; }

        setLoading(true);
        try {
            const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.detail || 'Authentication failed');
                return;
            }

            // Store token and notify parent
            localStorage.setItem('token', data.token);
            onLogin(data.user, mode === 'register');
        } catch (err) {
            setError('Server unavailable. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '10px 14px', borderRadius: '6px',
        border: `1px solid ${borderColor}`, background: inputBg,
        color: textColor, fontSize: '0.9rem', outline: 'none',
        fontFamily: 'inherit'
    };

    return (
        <div style={{ minHeight: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ width: '100%', maxWidth: '400px' }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <span style={{ fontSize: '2.5rem' }}>🚀</span>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: textColor, margin: '8px 0 4px 0' }}>
                        {mode === 'login' ? 'Sign in to Learnify' : 'Create your account'}
                    </h1>
                    <p style={{ color: textMuted, fontSize: '0.85rem', margin: 0 }}>
                        {mode === 'login' ? 'Your personalized learning journey awaits' : 'Start your learning journey today'}
                    </p>
                </div>

                {/* Card */}
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '24px' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: textColor, marginBottom: '6px' }}>Username</label>
                            <input 
                                type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username" style={inputStyle} autoFocus
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: textColor, marginBottom: '6px' }}>Password</label>
                            <input 
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password" style={inputStyle}
                            />
                        </div>
                        {mode === 'register' && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: textColor, marginBottom: '6px' }}>Confirm Password</label>
                                <input 
                                    type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password" style={inputStyle}
                                />
                            </div>
                        )}

                        {error && (
                            <div style={{ padding: '10px 14px', borderRadius: '6px', background: isDark ? 'rgba(248,81,73,0.1)' : 'rgba(248,81,73,0.06)', border: '1px solid #f8514930', color: '#f85149', fontSize: '0.85rem', marginBottom: '16px' }}>
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" disabled={loading}
                            style={{ 
                                width: '100%', padding: '10px', borderRadius: '6px', border: 'none',
                                background: '#238636', color: '#fff', fontSize: '0.9rem', fontWeight: 600,
                                cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Please wait...' : (mode === 'login' ? 'Sign in' : 'Create account')}
                        </button>
                    </form>
                </div>

                {/* Toggle */}
                <div style={{ textAlign: 'center', marginTop: '16px', padding: '16px', background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '12px' }}>
                    <span style={{ color: textMuted, fontSize: '0.85rem' }}>
                        {mode === 'login' ? "New to Learnify? " : "Already have an account? "}
                        <span 
                            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                            style={{ color: accentColor, cursor: 'pointer', fontWeight: 600 }}
                        >
                            {mode === 'login' ? 'Create an account' : 'Sign in'}
                        </span>
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
