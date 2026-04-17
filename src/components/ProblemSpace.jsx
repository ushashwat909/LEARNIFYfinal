import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Play, CheckCircle2, 
  Terminal, BookOpen, Zap, ChevronDown, Eye, Plus, RotateCcw
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

const ProblemSpace = ({ problemId, onBack, onNext, onPrev, userId = 101, theme = 'dark' }) => {
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [loading, setLoading] = useState(true);
    const [executing, setExecuting] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [results, setResults] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);

    // Bottom panel tabs: testcase, output, console
    const [bottomTab, setBottomTab] = useState('testcase');
    // Test cases
    const [testCases, setTestCases] = useState([{ id: 1, input: '' }]);
    const [activeCase, setActiveCase] = useState(1);

    const languages = [
        { id: 'python', label: 'Python', icon: '🐍' },
        { id: 'cpp', label: 'C++', icon: '⚙️' },
        { id: 'java', label: 'Java', icon: '☕' }
    ];

    const isDark = theme === 'dark';
    const bg = isDark ? '#0d1117' : '#ffffff';
    const bgSecondary = isDark ? '#161b22' : '#f6f8fa';
    const borderColor = isDark ? '#30363d' : '#d0d7de';
    const textColor = isDark ? '#c9d1d9' : '#24292f';
    const textMuted = isDark ? '#8b949e' : '#57606a';
    const accentColor = isDark ? '#58a6ff' : '#0969da';
    const successColor = '#3fb950';
    const errorColor = '#f85149';

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await fetch(`/api/problems/${problemId}`);
                const data = await response.json();
                setProblem(data);
                const starter = data.starterCode?.[language] || getDefaultBoilerplate(language);
                setCode(starter);
                // Initialize test cases from problem data if available
                if (data.testCases && data.testCases.length > 0) {
                    setTestCases(data.testCases.map((tc, i) => ({ id: i + 1, input: tc.input || '' })));
                } else {
                    setTestCases([{ id: 1, input: 'A = "example"' }, { id: 2, input: 'A = "test"' }]);
                }
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
        return 'class Solution:\n    # @param A : string\n    # @return a string\n    def solve(self, A):\n        pass';
    };

    const handleLanguageChange = (langId) => {
        setLanguage(langId);
        setShowLangMenu(false);
        const newCode = problem?.starterCode?.[langId] || getDefaultBoilerplate(langId);
        setCode(newCode);
    };

    const addTestCase = () => {
        const newId = testCases.length + 1;
        setTestCases([...testCases, { id: newId, input: '' }]);
        setActiveCase(newId);
    };

    const resetTestCases = () => {
        setTestCases([{ id: 1, input: 'A = "example"' }, { id: 2, input: 'A = "test"' }]);
        setActiveCase(1);
    };

    const updateTestCaseInput = (id, value) => {
        setTestCases(testCases.map(tc => tc.id === id ? { ...tc, input: value } : tc));
    };

    const runCode = async () => {
        setExecuting(true);
        setResults(null);
        setSubmitSuccess(false);
        setBottomTab('output');
        try {
            const response = await fetch(`/api/problems/${problemId}/run`, {
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
            setResults({ status: 'error', stderr: 'Network error or server unavailable.' });
        } finally {
            setExecuting(false);
        }
    };

    const submitCode = async () => {
        setSubmitting(true);
        setResults(null);
        setSubmitSuccess(false);
        setBottomTab('output');
        try {
            const response = await fetch(`/api/problems/${problemId}/run`, {
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
            if (data.status === 'success' && data.results?.every(r => r.status === 'pass')) {
                setSubmitSuccess(true);
            }
        } catch (error) {
            setResults({ status: 'error', stderr: 'Network error or server unavailable.' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ height: '100vh', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pulse" style={{ color: accentColor, fontSize: '1.1rem', letterSpacing: '1px', fontWeight: 600 }}>Loading problem...</div>
        </div>
    );

    const tabStyle = (isActive) => ({
        padding: '10px 20px',
        background: 'transparent',
        border: 'none',
        borderBottom: isActive ? `2px solid ${accentColor}` : '2px solid transparent',
        color: isActive ? textColor : textMuted,
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: '0.15s'
    });

    const caseBtnStyle = (isActive) => ({
        padding: '6px 16px',
        borderRadius: '20px',
        border: `1px solid ${isActive ? accentColor : borderColor}`,
        background: isActive ? (isDark ? 'rgba(88, 166, 255, 0.15)' : 'rgba(9, 105, 218, 0.1)') : 'transparent',
        color: isActive ? accentColor : textMuted,
        fontSize: '0.8rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: '0.15s'
    });

    return (
        <div style={{ 
            height: 'calc(100vh - 72px)', 
            marginTop: '72px', 
            background: bg, 
            color: textColor, 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden' 
        }}>
            
            {/* Main Content: Left Description + Right Editor */}
            <PanelGroup direction="horizontal" style={{ flex: 1 }}>
                
                {/* Left Panel - Problem Description */}
                <Panel defaultSize={30} minSize={20}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: bgSecondary, borderRight: `1px solid ${borderColor}` }}>
                        {/* Problem Nav Bar */}
                        <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${borderColor}` }}>
                            <button onClick={onPrev} style={{ padding: '4px 12px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ChevronLeft size={14} /> Previous
                            </button>
                            <button onClick={onNext} style={{ padding: '4px 12px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                Next <ChevronRight size={14} />
                            </button>
                            
                            <div style={{ width: '1px', height: '16px', background: borderColor, margin: '0 4px' }} />
                            
                            <button onClick={onBack} style={{ padding: '4px 12px', borderRadius: '6px', border: 'none', background: 'transparent', color: accentColor, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                                Back to Hub
                            </button>

                            <Eye size={16} style={{ marginLeft: 'auto', color: textMuted, cursor: 'pointer' }} />
                        </div>

                        {/* Problem Content */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }} className="markdown-body custom-scrollbar">
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: textColor, margin: '0 0 12px 0' }}>{problem?.title}</h2>
                            
                            <span style={{ 
                                display: 'inline-block', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700,
                                background: problem?.difficulty === 'Easy' ? 'rgba(63, 185, 80, 0.15)' : problem?.difficulty === 'Medium' ? 'rgba(210, 153, 34, 0.15)' : 'rgba(248, 81, 73, 0.15)',
                                color: problem?.difficulty === 'Easy' ? successColor : problem?.difficulty === 'Medium' ? '#d29922' : errorColor,
                                marginBottom: '20px'
                            }}>
                                {problem?.difficulty}
                            </span>

                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: textColor, margin: '16px 0 8px 0' }}>{problem?.title}</h3>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: textColor, margin: '12px 0 8px 0' }}>Problem Description</h4>

                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {problem?.statement || 'No description available.'}
                            </ReactMarkdown>
                        </div>
                    </div>
                </Panel>

                <PanelResizeHandle className="resize-handle-h" />

                {/* Right Panel - Editor + Bottom Panel */}
                <Panel defaultSize={70}>
                    <PanelGroup direction="vertical">
                        {/* Editor Panel */}
                        <Panel defaultSize={60} minSize={25}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: bg }}>
                                {/* Editor Toolbar */}
                                <div style={{ height: '42px', background: bgSecondary, borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: textMuted }}>Language</span>
                                    
                                    {/* Language Dropdown */}
                                    <div style={{ position: 'relative' }}>
                                        <button 
                                            onClick={() => setShowLangMenu(!showLangMenu)}
                                            style={{ padding: '4px 12px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                                        >
                                            {languages.find(l => l.id === language)?.label}
                                            <ChevronDown size={12} style={{ transform: showLangMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {showLangMenu && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    style={{ position: 'absolute', top: '110%', left: 0, minWidth: '140px', background: bg, border: `1px solid ${borderColor}`, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', zIndex: 100, padding: '4px' }}
                                                >
                                                    {languages.map(lang => (
                                                        <button 
                                                            key={lang.id}
                                                            onClick={() => handleLanguageChange(lang.id)}
                                                            style={{ width: '100%', padding: '8px 12px', background: language === lang.id ? (isDark ? 'rgba(88,166,255,0.1)' : 'rgba(9,105,218,0.08)') : 'transparent', border: 'none', color: language === lang.id ? accentColor : textColor, textAlign: 'left', borderRadius: '6px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.8rem' }}
                                                        >
                                                            <span>{lang.icon}</span> {lang.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div style={{ width: '1px', height: '20px', background: borderColor, margin: '0 4px' }} />
                                    <button style={{ padding: '4px 12px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: bg, color: textMuted, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>Past Submissions</button>
                                    <button style={{ padding: '4px 12px', borderRadius: '6px', border: `1px solid ${accentColor}`, background: isDark ? 'rgba(88,166,255,0.1)' : 'rgba(9,105,218,0.08)', color: accentColor, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Solution ✏</button>
                                    <button style={{ padding: '4px 8px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: bg, color: textMuted, fontSize: '0.85rem', cursor: 'pointer' }}>+</button>

                                    <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: textMuted, fontWeight: 500 }}>python:3.11-slim</div>
                                </div>

                                {/* Monaco Editor */}
                                <div style={{ flex: 1 }}>
                                    <Editor
                                        height="100%"
                                        defaultLanguage={language}
                                        language={language}
                                        theme={isDark ? 'vs-dark' : 'light'}
                                        value={code}
                                        onChange={(val) => setCode(val)}
                                        options={{
                                            fontSize: 14,
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            padding: { top: 16 },
                                            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                            lineNumbers: 'on',
                                            renderLineHighlight: 'line',
                                            cursorSmoothCaretAnimation: 'on',
                                            folding: true
                                        }}
                                    />
                                </div>
                            </div>
                        </Panel>

                        <PanelResizeHandle className="resize-handle-v" />

                        {/* Bottom Panel - Test Case / Output / Console */}
                        <Panel defaultSize={40} minSize={15}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: bg }}>
                                {/* Tabs */}
                                <div style={{ display: 'flex', borderBottom: `1px solid ${borderColor}`, background: bgSecondary }}>
                                    <button onClick={() => setBottomTab('testcase')} style={tabStyle(bottomTab === 'testcase')}>Test Case</button>
                                    <button onClick={() => setBottomTab('output')} style={tabStyle(bottomTab === 'output')}>Output</button>
                                    <button onClick={() => setBottomTab('console')} style={tabStyle(bottomTab === 'console')}>Console</button>
                                </div>

                                {/* Tab Content */}
                                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }} className="custom-scrollbar">
                                    
                                    {/* Test Case Tab */}
                                    {bottomTab === 'testcase' && (
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                                {testCases.map(tc => (
                                                    <button key={tc.id} onClick={() => setActiveCase(tc.id)} style={caseBtnStyle(activeCase === tc.id)}>
                                                        Case {tc.id}
                                                    </button>
                                                ))}
                                                <button onClick={addTestCase} style={{ ...caseBtnStyle(false), padding: '6px 10px' }}>
                                                    <Plus size={14} />
                                                </button>
                                                <button onClick={resetTestCases} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: accentColor, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                                                    Reset Test Cases
                                                </button>
                                            </div>

                                            {testCases.filter(tc => tc.id === activeCase).map(tc => (
                                                <div key={tc.id}>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: textMuted, marginBottom: '8px' }}>A =</div>
                                                    <textarea
                                                        value={tc.input}
                                                        onChange={(e) => updateTestCaseInput(tc.id, e.target.value)}
                                                        style={{ 
                                                            width: '100%', minHeight: '48px', padding: '12px 16px', borderRadius: '8px', 
                                                            border: `1px solid ${borderColor}`, background: isDark ? '#0d1117' : '#fff', 
                                                            color: textColor, fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem',
                                                            resize: 'vertical', outline: 'none'
                                                        }}
                                                        placeholder='"aaaabaaa"'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Output Tab */}
                                    {bottomTab === 'output' && (
                                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem' }}>
                                            {!results && !executing && <span style={{ color: textMuted }}>Click "Run" to see output...</span>}
                                            {executing && <span className="pulse" style={{ color: accentColor }}>Running test cases...</span>}
                                            
                                            {results && results.status === 'success' && (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <div style={{ color: successColor, fontSize: '0.85rem' }}>Execution time: {results.execution_time?.toFixed(2)}ms</div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                                                        {results.results?.map((res, i) => (
                                                            <div key={i} style={{ padding: '10px', borderRadius: '8px', background: res.status === 'pass' ? (isDark ? 'rgba(63,185,80,0.1)' : 'rgba(63,185,80,0.08)') : (isDark ? 'rgba(248,81,73,0.1)' : 'rgba(248,81,73,0.08)'), border: `1px solid ${res.status === 'pass' ? successColor + '40' : errorColor + '40'}` }}>
                                                                <div style={{ fontWeight: 700, color: res.status === 'pass' ? successColor : errorColor, fontSize: '0.75rem', marginBottom: '2px' }}>
                                                                   {res.status === 'pass' ? '✓ Passed' : '✗ Failed'}
                                                                </div>
                                                                <div style={{ color: textMuted, fontSize: '0.75rem' }}>Case #{res.case + 1}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {results.results?.every(r => r.status === 'pass') && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '10px', color: successColor, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                                            <CheckCircle2 size={15} /> All test cases passed!
                                                        </motion.div>
                                                    )}
                                                </div>
                                            )}

                                            {results && results.status === 'error' && (
                                                <div style={{ color: errorColor, whiteSpace: 'pre-wrap' }}>
                                                    <div style={{ fontWeight: 700, marginBottom: '8px' }}>Error</div>
                                                    <div style={{ background: isDark ? 'rgba(248,81,73,0.08)' : 'rgba(248,81,73,0.05)', padding: '12px', borderRadius: '8px', border: `1px solid ${errorColor}30` }}>
                                                        {results.stderr || results.error}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Console Tab */}
                                    {bottomTab === 'console' && (
                                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: textMuted }}>
                                            <span>// Console output will appear here...</span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Action Bar */}
                                <div style={{ height: '50px', borderTop: `1px solid ${borderColor}`, background: bgSecondary, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px', gap: '12px' }}>
                                    {submitSuccess && (
                                        <span style={{ color: successColor, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginRight: 'auto' }}>
                                            <CheckCircle2 size={16} /> Accepted! Progress saved.
                                        </span>
                                    )}
                                    <button 
                                        onClick={runCode}
                                        disabled={executing || submitting}
                                        style={{ padding: '6px 20px', borderRadius: '6px', border: `1px solid ${borderColor}`, background: bg, color: textColor, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', opacity: (executing || submitting) ? 0.6 : 1 }}
                                    >
                                        {executing ? 'Running...' : 'Run'}
                                    </button>
                                    <button 
                                        onClick={submitCode}
                                        disabled={executing || submitting}
                                        style={{ padding: '6px 20px', borderRadius: '6px', border: 'none', background: submitSuccess ? '#2ea043' : '#238636', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', opacity: (executing || submitting) ? 0.6 : 1 }}
                                    >
                                        {submitting ? 'Submitting...' : (submitSuccess ? '✓ Submitted' : 'Submit')}
                                    </button>
                                </div>
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>

            <style>{`
                .markdown-body h1, .markdown-body h2, .markdown-body h3 { color: ${textColor}; margin: 20px 0 12px 0; font-weight: 700; }
                .markdown-body h4 { color: ${textColor}; margin: 16px 0 8px 0; font-weight: 600; }
                .markdown-body p { line-height: 1.6; margin-bottom: 14px; color: ${textMuted}; font-size: 0.9rem; }
                .markdown-body pre { background: ${isDark ? '#0d1117' : '#f6f8fa'}; padding: 16px; border-radius: 8px; border: 1px solid ${borderColor}; overflow-x: auto; margin: 14px 0; }
                .markdown-body code { font-family: 'JetBrains Mono', monospace; background: ${isDark ? 'rgba(88,166,255,0.1)' : 'rgba(9,105,218,0.08)'}; color: ${accentColor}; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; }
                .markdown-body ul, .markdown-body ol { padding-left: 20px; margin-bottom: 14px; }
                .markdown-body li { margin-bottom: 6px; color: ${textMuted}; font-size: 0.9rem; }
                .markdown-body strong { color: ${textColor}; }
                .resize-handle-h { width: 4px; background: transparent; transition: 0.15s; cursor: col-resize; }
                .resize-handle-h:hover { background: ${accentColor}30; }
                .resize-handle-v { height: 4px; background: transparent; transition: 0.15s; cursor: row-resize; }
                .resize-handle-v:hover { background: ${accentColor}30; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: ${borderColor}; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${textMuted}; }
                .pulse { animation: pulse 1.5s ease-in-out infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
                textarea:focus { border-color: ${accentColor} !important; box-shadow: 0 0 0 3px ${accentColor}20; }
            `}</style>
        </div>
    );
};

export default ProblemSpace;
