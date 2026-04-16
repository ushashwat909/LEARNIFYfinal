import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Play, Save, CheckCircle2, AlertCircle, 
  Terminal, BookOpen, Clock, Zap, ChevronDown, Monitor, Cpu
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

const ProblemSpace = ({ problemId, onBack, userId = 101 }) => {
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [loading, setLoading] = useState(true);
    const [executing, setExecuting] = useState(false);
    const [results, setResults] = useState(null);
    const [activeTab, setActiveTab] = useState('description');
    const [showLangMenu, setShowLangMenu] = useState(false);

    const languages = [
        { id: 'python', label: 'Python 3', icon: '🐍' },
        { id: 'cpp', label: 'C++ 20', icon: '⚙️' },
        { id: 'java', label: 'Java 17', icon: '☕' }
    ];

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/problems/${problemId}`);
                const data = await response.json();
                setProblem(data);
                // Set initial code based on current language
                const starter = data.starterCode?.[language] || getDefaultBoilerplate(language);
                setCode(starter);
            } catch (error) {
                console.error("Failed to load problem", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, [problemId]);

    const getDefaultBoilerplate = (lang) => {
        if (lang === 'cpp') return '#include <iostream>\n#include <vector>\n\nclass Solution {\npublic:\n    void solve() {\n        // Your code here\n    }\n};';
        if (lang === 'java') return 'import java.util.*;\n\npublic class Solution {\n    public void solve() {\n        // Your code here\n    }\n}';
        return '# Write your solution here\nclass Solution:\n    def solve(self, A):\n        pass';
    };

    const handleLanguageChange = (langId) => {
        setLanguage(langId);
        setShowLangMenu(false);
        // If we have starter code in the problem for this lang, use it, else generic
        const newCode = problem?.starterCode?.[langId] || getDefaultBoilerplate(langId);
        setCode(newCode);
    };

    const runCode = async () => {
        setExecuting(true);
        setResults(null);
        try {
            const response = await fetch(`http://localhost:8000/api/problems/${problemId}/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    problem_id: problemId,
                    code: code,
                    language: language
                })
            });
            const data = await response.json();
            setResults(data);
        } catch (error) {
            setResults({ status: 'error', stderr: 'System execution fault: Operation timed out or runner unavailable.' });
        } finally {
            setExecuting(false);
        }
    };

    if (loading) return (
        <div style={{ height: '100vh', background: '#0B1120', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pulse" style={{ color: '#00F0FF', fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 600 }}>SYNCHRONIZING ENVIRONMENT...</div>
        </div>
    );

    return (
        <div style={{ height: '100vh', background: '#060B18', color: '#E2E8F0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Redesigned Header */}
            <header style={{ height: '64px', background: 'rgba(11, 17, 32, 0.8)', borderBottom: '1px solid #1e293b', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between', zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={onBack} className="btn-icon" style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8', border: '1px solid #1e293b' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <div style={{ width: '1px', height: '24px', background: '#1e293b' }} />
                    <div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#00F0FF', letterSpacing: '1.5px', textTransform: 'uppercase' }}>CHALLENGE MODULE</div>
                        <h1 style={{ fontSize: '1rem', margin: 0, fontWeight: 700, color: '#FFF' }}>{problem?.title}</h1>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Language Selector */}
                    <div style={{ position: 'relative' }}>
                        <button 
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            className="glass" 
                            style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: 600, color: '#00F0FF', cursor: 'pointer' }}
                        >
                            <span>{languages.find(l => l.id === language)?.label}</span>
                            <ChevronDown size={14} style={{ transform: showLangMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                        </button>
                        
                        <AnimatePresence>
                            {showLangMenu && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={{ position: 'absolute', top: '120%', left: 0, width: '100%', background: '#0B1120', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', padding: '5px' }}
                                >
                                    {languages.map(lang => (
                                        <button 
                                            key={lang.id}
                                            onClick={() => handleLanguageChange(lang.id)}
                                            style={{ width: '100%', padding: '10px', background: language === lang.id ? 'rgba(0,240,255,0.1)' : 'transparent', border: 'none', color: language === lang.id ? '#00F0FF' : '#94a3b8', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.85rem' }}
                                        >
                                            <span>{lang.icon}</span> {lang.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button 
                        onClick={runCode}
                        disabled={executing}
                        style={{ background: '#00F0FF', color: '#0B1120', padding: '10px 24px', borderRadius: '10px', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: executing ? 0.6 : 1, boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)' }}
                    >
                        {executing ? <Zap className="spin" size={18} /> : <Play size={18} fill="currentColor" />}
                        RUN MISSION
                    </button>
                </div>
            </header>

            {/* Main Adjustable Content */}
            <PanelGroup direction="horizontal" style={{ flex: 1 }}>
                {/* Left Panel - Problem Description */}
                <Panel defaultSize={35} minSize={20}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0B1120' }}>
                        <div style={{ display: 'flex', borderBottom: '1px solid #1e293b', background: 'rgba(0,0,0,0.2)' }}>
                            <button 
                                onClick={() => setActiveTab('description')}
                                style={{ padding: '15px 25px', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === 'description' ? '#00F0FF' : 'transparent'}`, color: activeTab === 'description' ? '#00F0FF' : '#94a3b8', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}
                            >
                                <BookOpen size={14} /> Description
                            </button>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', scrollbarWidth: 'thin' }} className="markdown-body custom-scrollbar">
                             <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {problem?.statement || 'No data found.'}
                             </ReactMarkdown>
                        </div>
                    </div>
                </Panel>

                <PanelResizeHandle className="resize-handle-h" />

                {/* Right Panel - Editor & Adjustable Console */}
                <Panel defaultSize={65}>
                    <PanelGroup direction="vertical">
                        <Panel defaultSize={70} minSize={30}>
                            <div style={{ height: '100%', position: 'relative', background: '#060B18' }}>
                                <Editor
                                    height="100%"
                                    defaultLanguage={language}
                                    language={language}
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(val) => setCode(val)}
                                    options={{
                                        fontSize: 14,
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        padding: { top: 20 },
                                        backgroundColor: '#060B18',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        lineNumbers: 'on',
                                        renderLineHighlight: 'all',
                                        cursorSmoothCaretAnimation: 'on'
                                    }}
                                />
                            </div>
                        </Panel>

                        <PanelResizeHandle className="resize-handle-v" />

                        <Panel defaultSize={30} minSize={10}>
                            <div style={{ height: '100%', background: '#0B1120', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '40px', background: '#1e293b', display: 'flex', alignItems: 'center', padding: '0 20px', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 800, gap: '10px', letterSpacing: '1px' }}>
                                    <Terminal size={14} /> 
                                    <span>CONSOLE OUTPUT</span>
                                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
                                         <span style={{ color: results?.status === 'success' ? '#4ade80' : '#f87171' }}>
                                            {results?.status === 'success' ? 'READY' : (results ? 'ERROR' : 'IDLE')}
                                        </span>
                                    </div>
                                </div>
                                
                                <div style={{ flex: 1, padding: '24px', overflowY: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }} className="custom-scrollbar">
                                    {!results && !executing && <span style={{ color: '#475569' }}>// Awaiting instruction...</span>}
                                    {executing && <span className="pulse" style={{ color: '#00F0FF' }}>// Executing kernel with {language.toUpperCase()}...</span>}
                                    
                                    {results && results.status === 'success' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div style={{ color: '#4ade80', fontSize: '0.85rem' }}>{">>>"} Time: {results.execution_time?.toFixed(2)}ms | Status: SUCCESS</div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', marginTop: '8px' }}>
                                                {results.results?.map((res, i) => (
                                                    <div key={i} style={{ padding: '12px', borderRadius: '10px', background: res.status === 'pass' ? 'rgba(74, 222, 128, 0.05)' : 'rgba(248, 113, 113, 0.05)', border: `1px solid ${res.status === 'pass' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`, transition: '0.3s' }}>
                                                        <div style={{ fontWeight: 800, color: res.status === 'pass' ? '#4ade80' : '#f87171', fontSize: '0.7rem', marginBottom: '4px' }}>
                                                           {res.status === 'pass' ? '✓ PASSED' : '✗ FAILED'}
                                                        </div>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Case #{res.case + 1}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            {results.results?.every(r => r.status === 'pass') && (
                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '15px', color: '#00F0FF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <CheckCircle2 size={16} /> Proficiency data transmitted to BKT kernel.
                                                </motion.div>
                                            )}
                                        </div>
                                    )}

                                    {results && results.status === 'error' && (
                                        <div style={{ color: '#f87171', whiteSpace: 'pre-wrap' }}>
                                            <div style={{ fontWeight: 800, marginBottom: '10px' }}>[FAULT DETECTED]</div>
                                            <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                                {results.stderr || results.error}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>

            <style>{`
                .markdown-body h1, .markdown-body h2, .markdown-body h3 { color: #FFF; margin: 24px 0 16px 0; font-weight: 700; }
                .markdown-body p { line-height: 1.7; margin-bottom: 18px; color: #cbd5e1; font-size: 0.95rem; }
                .markdown-body pre { background: #060B18; padding: 20px; border-radius: 12px; border: 1px solid #1e293b; overflow-x: auto; margin: 20px 0; }
                .markdown-body code { font-family: 'JetBrains Mono', monospace; background: rgba(0, 240, 255, 0.1); color: #00F0FF; padding: 3px 6px; border-radius: 6px; font-size: 0.85em; }
                .markdown-body ul { padding-left: 20px; margin-bottom: 20px; }
                .markdown-body li { margin-bottom: 10px; color: #cbd5e1; }
                .resize-handle-h { width: 8px; background: transparent; transition: 0.2s; cursor: col-resize; display: flex; align-items: center; justify-content: center; }
                .resize-handle-h:hover { background: rgba(0, 240, 255, 0.1); }
                .resize-handle-h:after { content: ''; width: 1px; height: 30px; background: #1e293b; }
                .resize-handle-v { height: 8px; background: transparent; transition: 0.2s; cursor: row-resize; display: flex; align-items: center; justify-content: center; }
                .resize-handle-v:hover { background: rgba(0, 240, 255, 0.1); }
                .resize-handle-v:after { content: ''; width: 30px; height: 1px; background: #1e293b; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
                .pulse { animation: pulse 2s infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default ProblemSpace;
