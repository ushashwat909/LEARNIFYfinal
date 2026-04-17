import React, { useState, useEffect, useCallback } from 'react';
import { Play, CheckCircle, AlertCircle, TrendingUp, Map, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType, 
  applyNodeChanges, 
  applyEdgeChanges 
} from 'reactflow';
import 'reactflow/dist/style.css';

// Category colors for graph nodes
const categoryColors = {
  arrays:    { bg: '#0e3a4a', border: '#00F0FF', text: '#00F0FF' },
  hashing:   { bg: '#2d1b4e', border: '#a855f7', text: '#a855f7' },
  linear:    { bg: '#1a2e1a', border: '#4ade80', text: '#4ade80' },
  recursion: { bg: '#3b2000', border: '#FB923C', text: '#FB923C' },
  trees:     { bg: '#3b1515', border: '#f87171', text: '#f87171' },
  graphs:    { bg: '#0f2b3a', border: '#38bdf8', text: '#38bdf8' },
  dp:        { bg: '#1a1a3b', border: '#818cf8', text: '#818cf8' },
  advanced:  { bg: '#3b1a2d', border: '#f472b6', text: '#f472b6' },
};

// Full 20-node DAG layout — column/row positions
const initialNodes = [
  // Row 0 — Foundation
  { id: 'array_basics',      position: { x: 340, y: 0   }, data: { label: 'Array Basics' },      style: { background: categoryColors.arrays.bg,    border: `2px solid ${categoryColors.arrays.border}`,    color: categoryColors.arrays.text,    borderRadius: 8, fontSize: 11, fontWeight: 700, padding: '6px 10px' } },
  // Row 1 — Basic Structures
  { id: 'two_pointers',      position: { x: 60,  y: 100 }, data: { label: 'Two Pointers' },      style: { background: categoryColors.arrays.bg,    border: `1px solid ${categoryColors.arrays.border}`,    color: categoryColors.arrays.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'binary_search',     position: { x: 220, y: 100 }, data: { label: 'Binary Search' },     style: { background: categoryColors.arrays.bg,    border: `1px solid ${categoryColors.arrays.border}`,    color: categoryColors.arrays.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'prefix_sum',        position: { x: 380, y: 100 }, data: { label: 'Prefix Sum' },        style: { background: categoryColors.arrays.bg,    border: `1px solid ${categoryColors.arrays.border}`,    color: categoryColors.arrays.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'hash_maps',         position: { x: 530, y: 100 }, data: { label: 'Hash Maps' },         style: { background: categoryColors.hashing.bg,   border: `1px solid ${categoryColors.hashing.border}`,   color: categoryColors.hashing.text,   borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'stacks',            position: { x: 680, y: 100 }, data: { label: 'Stacks & Queues' },   style: { background: categoryColors.linear.bg,    border: `1px solid ${categoryColors.linear.border}`,    color: categoryColors.linear.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'linked_list',       position: { x: 830, y: 100 }, data: { label: 'Linked Lists' },      style: { background: categoryColors.linear.bg,    border: `1px solid ${categoryColors.linear.border}`,    color: categoryColors.linear.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  // Row 2 — Intermediate
  { id: 'sliding_window',    position: { x: 60,  y: 220 }, data: { label: 'Sliding Window' },    style: { background: categoryColors.arrays.bg,    border: `1px solid ${categoryColors.arrays.border}`,    color: categoryColors.arrays.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'fast_slow_pointers',position: { x: 760, y: 220 }, data: { label: 'Fast & Slow Ptrs' }, style: { background: categoryColors.linear.bg,    border: `1px solid ${categoryColors.linear.border}`,    color: categoryColors.linear.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'recursion',         position: { x: 570, y: 220 }, data: { label: 'Recursion & BT' },   style: { background: categoryColors.recursion.bg, border: `1px solid ${categoryColors.recursion.border}`, color: categoryColors.recursion.text, borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  // Row 3 — Trees & Graphs
  { id: 'binary_tree',       position: { x: 320, y: 340 }, data: { label: 'Binary Trees' },      style: { background: categoryColors.trees.bg,     border: `1px solid ${categoryColors.trees.border}`,     color: categoryColors.trees.text,     borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'graph_basics',      position: { x: 570, y: 340 }, data: { label: 'Graph Fundamentals'}, style: { background: categoryColors.graphs.bg,    border: `1px solid ${categoryColors.graphs.border}`,    color: categoryColors.graphs.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'dynamic_programming',position: { x: 80, y: 340 }, data: { label: 'Dynamic Programming'},style: { background: categoryColors.dp.bg,        border: `1px solid ${categoryColors.dp.border}`,        color: categoryColors.dp.text,        borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  // Row 4
  { id: 'bst',               position: { x: 200, y: 460 }, data: { label: 'BST' },               style: { background: categoryColors.trees.bg,     border: `1px solid ${categoryColors.trees.border}`,     color: categoryColors.trees.text,     borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'heap',              position: { x: 380, y: 460 }, data: { label: 'Heaps / PQ' },        style: { background: categoryColors.trees.bg,     border: `1px solid ${categoryColors.trees.border}`,     color: categoryColors.trees.text,     borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'bfs_dfs',           position: { x: 570, y: 460 }, data: { label: 'BFS & DFS' },         style: { background: categoryColors.graphs.bg,    border: `1px solid ${categoryColors.graphs.border}`,    color: categoryColors.graphs.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'trie',              position: { x: 760, y: 460 }, data: { label: 'Tries' },              style: { background: categoryColors.advanced.bg,  border: `1px solid ${categoryColors.advanced.border}`,  color: categoryColors.advanced.text,  borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  { id: 'union_find',        position: { x: 760, y: 340 }, data: { label: 'Union Find' },        style: { background: categoryColors.graphs.bg,    border: `1px solid ${categoryColors.graphs.border}`,    color: categoryColors.graphs.text,    borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  // Row 5 — Advanced
  { id: 'greedy',            position: { x: 380, y: 580 }, data: { label: 'Greedy Algorithms' }, style: { background: categoryColors.advanced.bg,  border: `1px solid ${categoryColors.advanced.border}`,  color: categoryColors.advanced.text,  borderRadius: 8, fontSize: 11, padding: '6px 10px' } },
  // Row 6 — Expert
  { id: 'advanced_graphs',   position: { x: 530, y: 700 }, data: { label: "Dijkstra / SSSP" },   style: { background: categoryColors.advanced.bg,  border: `2px solid ${categoryColors.advanced.border}`,  color: categoryColors.advanced.text,  borderRadius: 8, fontSize: 11, fontWeight: 700, padding: '6px 10px' } },
];

const EDGE_STYLE = { stroke: '#334155', strokeWidth: 1.5 };
const initialEdges = [
  // From array_basics
  { id: 'e-arr-tp',  source: 'array_basics',   target: 'two_pointers',       animated: false, style: EDGE_STYLE },
  { id: 'e-arr-bs',  source: 'array_basics',   target: 'binary_search',      animated: false, style: EDGE_STYLE },
  { id: 'e-arr-ps',  source: 'array_basics',   target: 'prefix_sum',         animated: false, style: EDGE_STYLE },
  { id: 'e-arr-hm',  source: 'array_basics',   target: 'hash_maps',          animated: false, style: EDGE_STYLE },
  { id: 'e-arr-st',  source: 'array_basics',   target: 'stacks',             animated: false, style: EDGE_STYLE },
  { id: 'e-arr-ll',  source: 'array_basics',   target: 'linked_list',        animated: false, style: EDGE_STYLE },
  // Intermediate
  { id: 'e-tp-sw',   source: 'two_pointers',   target: 'sliding_window',     animated: false, style: EDGE_STYLE },
  { id: 'e-ll-fsp',  source: 'linked_list',    target: 'fast_slow_pointers', animated: false, style: EDGE_STYLE },
  { id: 'e-tp-fsp',  source: 'two_pointers',   target: 'fast_slow_pointers', animated: false, style: EDGE_STYLE },
  { id: 'e-st-rec',  source: 'stacks',         target: 'recursion',          animated: false, style: EDGE_STYLE },
  // Trees
  { id: 'e-rec-bt',  source: 'recursion',      target: 'binary_tree',        animated: false, style: EDGE_STYLE },
  { id: 'e-ll-bt',   source: 'linked_list',    target: 'binary_tree',        animated: false, style: EDGE_STYLE },
  { id: 'e-bt-bst',  source: 'binary_tree',    target: 'bst',                animated: false, style: EDGE_STYLE },
  { id: 'e-bs-bst',  source: 'binary_search',  target: 'bst',                animated: false, style: EDGE_STYLE },
  { id: 'e-bt-heap', source: 'binary_tree',    target: 'heap',               animated: false, style: EDGE_STYLE },
  // Graphs
  { id: 'e-hm-gr',   source: 'hash_maps',      target: 'graph_basics',       animated: false, style: EDGE_STYLE },
  { id: 'e-rec-gr',  source: 'recursion',       target: 'graph_basics',      animated: false, style: EDGE_STYLE },
  { id: 'e-gr-bfsdfs',source: 'graph_basics',  target: 'bfs_dfs',            animated: false, style: EDGE_STYLE },
  { id: 'e-st-bfsdfs',source: 'stacks',        target: 'bfs_dfs',            animated: false, style: EDGE_STYLE },
  { id: 'e-gr-uf',   source: 'graph_basics',   target: 'union_find',         animated: false, style: EDGE_STYLE },
  // Trie
  { id: 'e-hm-tr',   source: 'hash_maps',      target: 'trie',               animated: false, style: EDGE_STYLE },
  { id: 'e-bt-tr',   source: 'binary_tree',    target: 'trie',               animated: false, style: EDGE_STYLE },
  // DP
  { id: 'e-rec-dp',  source: 'recursion',      target: 'dynamic_programming',animated: false, style: EDGE_STYLE },
  { id: 'e-ps-dp',   source: 'prefix_sum',     target: 'dynamic_programming',animated: false, style: EDGE_STYLE },
  // Greedy + Advanced
  { id: 'e-dp-gr',   source: 'dynamic_programming', target: 'greedy',        animated: false, style: EDGE_STYLE },
  { id: 'e-heap-gr', source: 'heap',           target: 'greedy',             animated: false, style: EDGE_STYLE },
  { id: 'e-bfsdfs-ag',source: 'bfs_dfs',       target: 'advanced_graphs',    animated: false, style: EDGE_STYLE },
  { id: 'e-heap-ag', source: 'heap',           target: 'advanced_graphs',    animated: false, style: EDGE_STYLE },
  { id: 'e-gr-ag',   source: 'greedy',         target: 'advanced_graphs',    animated: false, style: EDGE_STYLE },
];


const AdaptiveLearning = ({ userData, onChallenge }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userId] = useState(101); // Mock User ID
  const [nodes, setNodes] = useState(initialNodes);
  const [nodeToast, setNodeToast] = useState(null); // for click feedback
  const [missionToast, setMissionToast] = useState(false); // for new recommendations

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  // Edges are static for now, but we add state for stability
  const [edges, setEdges] = useState(initialEdges);
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Mapping BKT topics to example problems
  const topicToProblem = {
    'array_basics': 'array-rotation',
    'two_pointers': 'check-pair-sum',
    'sliding_window': 'spiral-order-matrix-ii',
    'binary_search': 'ath-magical-number',
    'prefix_sum': 'closest-minmax',
    'hashing': 'all-indices-of-array',
    'stacks': 'balanced-paranthesis',
    'linked_list': 'check-palindrome-list'
  };

  const fetchRecommendation = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/adaptive/recommend/${userId}`);
      if (!response.ok) throw new Error("Failed to load");
      const data = await response.json();
      setRecommendation(data);
      
      // Highlight current topic while preserving category styling
      setNodes((nds) => nds.map(node => {
        const base = initialNodes.find(n => n.id === node.id)?.style || {};
        if (node.id === data.topic_id) {
          return { ...node, style: { ...base, background: '#00F0FF', color: '#0B1120', border: '2px solid #FF5722', fontWeight: 800, boxShadow: '0 0 12px #00F0FF' } };
        }
        return { ...node, style: base };
      }));
      
    } catch (error) {
      console.error("Failed to fetch recommendation", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendation().then(() => {
        setMissionToast(true);
        setTimeout(() => setMissionToast(false), 5000);
    });
  }, [userId]);

  // Jump to any node when user clicks it on the graph
  const handleNodeClick = async (_event, node) => {
    setShowQuiz(false);
    setLoading(true);
    setNodeToast(node.data.label);
    setTimeout(() => setNodeToast(null), 2500);
    try {
      const response = await fetch(`/api/adaptive/recommend/${userId}?topic_override=${node.id}`);
      if (!response.ok) throw new Error('override failed');
      const data = await response.json();
      // Force the topic to the clicked node if backend doesn't support override
      const overridden = { ...data, topic_id: node.id, resource: data.resource };
      // Try to get the clicked node's resource from backend (it returns current recommendation)
      // Instead, fetch the resource directly
      const resResp = await fetch(`/api/adaptive/resource/${node.id}`);
      if (resResp.ok) {
        const resData = await resResp.json();
        overridden.resource = resData;
      }
      setRecommendation(overridden);
      setNodes((nds) => nds.map((n) => {
        const base = initialNodes.find(i => i.id === n.id)?.style || {};
        if (n.id === node.id) {
          return { ...n, style: { ...base, background: '#00F0FF', color: '#0B1120', border: '2px solid #FF5722', fontWeight: 800, boxShadow: '0 0 12px #00F0FF' } };
        }
        return { ...n, style: base };
      }));
    } catch {
      // fallback: just show whatever the backend returned with node id
      setRecommendation(prev => prev ? { ...prev, topic_id: node.id } : prev);
    } finally {
      setLoading(false);
    }
  };

  const submitResult = async (passed) => {
    setShowQuiz(false);
    setLoading(true);
    try {
      const response = await fetch('/api/adaptive/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          topic_id: recommendation.topic_id,
          passed: passed
        })
      });
      const data = await response.json();
      setRecommendation(data);
      
      // Update nodes based on new state
      setNodes((nds) => nds.map(node => {
        if (node.id === data.topic_id) {
          node.style = { background: '#00F0FF', color: '#0B1120', border: '2px solid #FF5722', fontWeight: 800 };
        } else if (node.id === recommendation.topic_id && passed) {
          node.style = { background: '#2A9D8F', color: '#FFF', border: '1px solid #2A9D8F' }; // Mastered
        } else {
          node.style = { background: '#1e293b', color: '#E2E8F0', border: '1px solid #334155' };
        }
        return node;
      }));
      
    } catch (error) {
      console.error("Failed to submit result", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
      return (
          <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F0FF' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'inline-block', fontSize: '2rem' }}>
                  🚀
              </motion.div>
              <h2 style={{ marginLeft: '20px' }}>Analyzing Knowledge Graph...</h2>
          </div>
      );
  }

  if (error || !recommendation) {
      return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF5722' }}>
            <div className="glass" style={{ padding: '40px', textAlign: 'center', borderRadius: '16px' }}>
                <AlertCircle size={48} style={{ margin: '0 auto 20px auto' }} />
                <h2>Connection Lost</h2>
                <p>Failed to reach the AI Engine. Is the backend running?</p>
                <button onClick={fetchRecommendation} className="btn btn-primary" style={{ marginTop: '20px' }}>Retry</button>
            </div>
        </div>
      );
  }

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 20px', color: 'var(--color-text)' }}>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <TrendingUp size={24} color="#00F0FF" />
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--color-text)' }}>Mission Control: Adaptive Path</h2>
        </div>
        <p style={{ color: 'var(--color-text-muted)' }}>Learnify Bayesian AI is charting your optimal trajectory through Data Structures.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '30px' }}>
        
        {/* Main Content Area */}
        <section>
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div 
                key="lesson"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass"
                style={{ padding: '30px', borderRadius: '24px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                    <div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF5722', textTransform: 'uppercase', letterSpacing: '2px' }}>Current Target</span>
                        <h1 style={{ margin: '10px 0', fontSize: '2.5rem', color: 'var(--color-text)' }}>{recommendation.resource.title}</h1>
                        <p style={{ color: '#00F0FF' }}>Broadcast: {recommendation.resource.channel} • {recommendation.resource.duration}</p>
                    </div>
                    <div className="glass" style={{ padding: '15px 25px', borderRadius: '16px', textAlign: 'center', borderColor: '#FF5722' }}>
                         <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00F0FF' }}>{(recommendation.mastery_prob * 100).toFixed(0)}%</div>
                         <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Mastery Prob</div>
                    </div>
                </div>

                {/* Video Embed */}
                <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', position: 'relative', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                   <iframe 
                      width="100%" height="100%" 
                      src={`https://www.youtube.com/embed/${recommendation.resource.id}`}
                      frameBorder="0" allowFullScreen 
                    />
                </div>

                {/* Developer Scratchpad (IDE Mockup) */}
                <div style={{ marginBottom: '30px', background: 'var(--color-card-bg)', borderRadius: '16px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <div style={{ background: 'var(--color-bg-alt)', padding: '10px 20px', fontSize: '0.85rem', display: 'flex', gap: '15px', color: 'var(--color-text-muted)' }}>
                        <button onClick={() => alert('Scratchpad activated for coding execution.')} style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '5px', cursor: 'pointer', fontWeight: 600 }}>scratchpad.py</button>
                        <button onClick={() => alert('Notes opened: You can write theoretical notes here.')} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>notes.txt</button>
                    </div>
                    <textarea 
                        defaultValue={`# Write your algorithmic notes or code here\n# Topic: ${recommendation.resource.title}\n\ndef solve():\n    pass\n`}
                        style={{ width: '100%', height: '150px', background: 'transparent', border: 'none', color: 'var(--color-text)', padding: '20px', fontFamily: 'monospace', fontSize: '1rem', resize: 'vertical', outline: 'none' }}
                        spellCheck="false"
                    />
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button 
                        onClick={() => setShowQuiz(true)}
                        style={{ background: '#00F0FF', color: '#0B1120', padding: '16px 32px', borderRadius: '12px', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' }}
                    >
                        Quick Verification
                    </button>
                    <button 
                        onClick={() => {
                           const probId = topicToProblem[recommendation.topic_id] || 'array-rotation';
                           onChallenge(probId);
                        }}
                        style={{ background: 'transparent', border: '2px solid #00F0FF', padding: '16px 32px', borderRadius: '12px', color: '#00F0FF', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        <Zap size={20} /> Deep Dive Challenge
                    </button>
                    <button style={{ background: 'transparent', border: '1px solid var(--color-border)', padding: '16px 32px', borderRadius: '12px', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                        Abort
                    </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{ padding: '50px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: '1px solid #FF5722' }}
              >
                <AlertCircle size={56} color="#FF5722" style={{ marginBottom: '20px' }} />
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--color-text)' }}>Skill Verification: {recommendation.topic_id}</h2>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', marginBottom: '40px', fontSize: '1.1rem' }}>
                  Based on the broadcast, determine the correct approach. If you succeed, your Bayseian mastery probability will increase.
                </p>
                
                <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '600px', flexDirection: 'column' }}>
                    <button 
                         onClick={() => submitResult(true)}
                         className="glass"
                         style={{ background: 'rgba(42, 157, 143, 0.2)', color: 'var(--color-text)', padding: '20px', borderRadius: '12px', border: '1px solid #2A9D8F', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                    >
                        ✅ A: I fully comprehend the optimal time/space complexity (Pass)
                    </button>
                    <button 
                         onClick={() => submitResult(false)}
                         className="glass"
                         style={{ background: 'rgba(231, 111, 81, 0.2)', color: 'var(--color-text)', padding: '20px', borderRadius: '12px', border: '1px solid #E76F51', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                    >
                        ⚠️ B: I need to review prerequisite concepts (Fail)
                    </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Sidebar / Stats */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass" style={{ borderRadius: '20px', padding: '25px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Map size={18} color="#00F0FF" /> Knowledge Graph
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>20 nodes · 29 edges</span>
                </div>
                {/* Color Legend */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                  {[
                    { label: 'Arrays', color: '#00F0FF' },
                    { label: 'Hashing', color: '#a855f7' },
                    { label: 'Linear', color: '#4ade80' },
                    { label: 'Recursion', color: '#FB923C' },
                    { label: 'Trees', color: '#f87171' },
                    { label: 'Graphs', color: '#38bdf8' },
                    { label: 'DP', color: '#818cf8' },
                    { label: 'Advanced', color: '#f472b6' },
                  ].map(({ label, color }) => (
                    <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: color, display: 'inline-block' }} />{label}
                    </span>
                  ))}
                </div>
                <div style={{ height: '550px', background: 'var(--color-bg-alt)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative' }}>
                    {/* Node click toast */}
                    {nodeToast && (
                      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: '#00F0FF', color: '#0B1120', padding: '6px 16px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 0 15px rgba(0,240,255,0.5)' }}>
                        ▶ Loading: {nodeToast}
                      </div>
                    )}
                    <ReactFlow 
                      nodes={nodes} 
                      edges={edges} 
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      fitView
                      fitViewOptions={{ padding: 0.15 }}
                      proOptions={{ hideAttribution: true }}
                      defaultEdgeOptions={{ type: 'smoothstep' }}
                      onNodeClick={handleNodeClick}
                      nodesDraggable={false}
                      elementsSelectable={true}
                    >
                      <Background color="var(--color-text-muted)" gap={20} size={1} />
                      <Controls showInteractive={false} style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }} />
                    </ReactFlow>
                </div>
            </div>
            
            <div className="glass" style={{ borderRadius: '20px', padding: '20px', display: 'flex', gap: '15px', alignItems: 'center', borderLeft: '4px solid #00F0FF' }}>
                <div style={{ fontSize: '2rem' }}>🚀</div>
                <div>
                  <h4 style={{ color: 'var(--color-text)', margin: '0 0 4px 0', fontSize: '1rem' }}>AI Flight Computer</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>pyBKT active · 20 skills tracked · Current node glows cyan</p>
                </div>
            </div>
        </aside>

      </div>
    </div>
  );
};

export default AdaptiveLearning;
