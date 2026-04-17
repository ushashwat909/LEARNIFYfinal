import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Rocket, Star, Code2, ArrowRight, ShieldCheck } from 'lucide-react';

const PracticeHub = ({ onSelectProblem, initialSearch = '' }) => {
    const [problems, setProblems] = useState([]);
    const [search, setSearch] = useState(initialSearch);
    const [difficulty, setDifficulty] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/problems');
                const data = await response.json();
                setProblems(data.problems);
            } catch (error) {
                console.error("Failed to load problems", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    const filtered = problems.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                             (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
        const matchesDifficulty = difficulty === 'All' || p.difficulty === difficulty;
        return matchesSearch && matchesDifficulty;
    });

    return (
        <div style={{ 
            padding: '100px 40px 40px 40px', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            color: '#FFF',
            minHeight: '100vh'
        }}>
            {/* Header section */}
            <div style={{ marginBottom: '40px' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}
                >
                    <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '10px', borderRadius: '12px', border: '1px solid #00F0FF' }}>
                        <Rocket size={24} color="#00F0FF" />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 800 }}>Practice Mode</h1>
                </motion.div>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px' }}>
                    Access 181 high-fidelity DSA challenges. Solve problems to calibrate your Bayesian knowledge profile and earn neon badges.
                </p>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                    <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={18} />
                    <input 
                        type="text" 
                        placeholder="Search algorithms, patterns, or data structures..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', background: '#0B1120', border: '1px solid #1e293b', padding: '15px 15px 15px 45px', borderRadius: '12px', color: '#FFF', fontSize: '1rem', outline: 'none' }}
                    />
                </div>
                
                <div style={{ display: 'flex', background: '#0B1120', padding: '5px', borderRadius: '12px', border: '1px solid #1e293b' }}>
                    {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                        <button 
                            key={d}
                            onClick={() => setDifficulty(d)}
                            style={{ padding: '10px 20px', background: difficulty === d ? '#00F0FF' : 'transparent', color: difficulty === d ? '#0B1120' : '#94a3b8', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Problem Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px', color: '#00F0FF' }} className="pulse">INITIALIZING PROBLEM BANK...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
                    {filtered.map((problem, i) => (
                        <motion.div 
                            key={problem.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass"
                            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 240, 255, 0.15)' }}
                            style={{ padding: '25px', borderRadius: '20px', border: '1px solid #1e293b', cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}
                            onClick={() => onSelectProblem(problem.id)}
                        >
                            {/* Difficulty Glow */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: problem.difficulty === 'Easy' ? '#4ade80' : problem.difficulty === 'Medium' ? '#fb923c' : '#f87171' }} />
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '8px', borderRadius: '8px' }}>
                                    <Code2 size={20} color="#94a3b8" />
                                </div>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: problem.difficulty === 'Easy' ? '#4ade80' : problem.difficulty === 'Medium' ? '#fb923c' : '#f87171' }}>
                                    {problem.difficulty?.toUpperCase()}
                                </span>
                            </div>

                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>{problem.title}</h3>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
                                <span style={{ padding: '4px 8px', borderRadius: '4px', background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', fontSize: '0.7rem' }}>
                                    {problem.category || 'General'}
                                </span>
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#00F0FF', fontWeight: 600, fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <ShieldCheck size={16} /> Beta Logic
                                </div>
                                <ArrowRight size={18} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
            
            {filtered.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
                    <h3>No challenges matched your search criteria.</h3>
                    <p>Try different keywords or reset the difficulty filter.</p>
                </div>
            )}
        </div>
    );
};

export default PracticeHub;
