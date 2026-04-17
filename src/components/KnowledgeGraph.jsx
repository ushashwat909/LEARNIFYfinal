import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Handle, 
  Position,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Target, Lock, CheckCircle, Zap, Info, ChevronRight } from 'lucide-react';

// --- Custom Knowledge Node ---
const KnowledgeNode = ({ data }) => {
  const { label, mastery, status, category, difficulty } = data;
  
  const getStatusColor = () => {
    switch(status) {
      case 'mastered': return '#3fb950'; // Green
      case 'in_progress': return '#d29922'; // Gold
      case 'unlocked': return '#58a6ff'; // Blue
      default: return '#30363d'; // Default/Locked
    }
  };

  const color = getStatusColor();

  return (
    <div style={{
      padding: '12px 20px',
      borderRadius: '16px',
      background: 'rgba(13, 17, 23, 0.95)',
      border: `2px solid ${color}`,
      boxShadow: status !== 'locked' ? `0 0 20px ${color}44` : 'none',
      width: '240px',
      color: '#fff',
      position: 'relative',
      backdropFilter: 'blur(10px)',
      opacity: status === 'locked' ? 0.5 : 1,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <Handle type="target" position={Position.Left} style={{ background: color }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span style={{ 
          fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', 
          background: `${color}22`, color: color, padding: '2px 8px', borderRadius: '4px' 
        }}>
          {category}
        </span>
        {status === 'mastered' ? <CheckCircle size={14} color={color} /> : 
         status === 'unlocked' ? <Zap size={14} color={color} /> : 
         status === 'locked' ? <Lock size={14} color="#8b949e" /> : <Target size={14} color={color} />}
      </div>

      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '12px' }}>{label}</div>

      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${mastery * 100}%`, height: '100%', background: color, 
          transition: 'width 1s ease-out' 
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.7rem', color: '#8b949e' }}>
        <span>Mastery: {Math.round(mastery * 100)}%</span>
        <span>Diff: {difficulty}/5</span>
      </div>

      <Handle type="source" position={Position.Right} style={{ background: color }} />
    </div>
  );
};

const nodeTypes = {
  knowledgeNode: KnowledgeNode
};

const KnowledgeGraph = ({ theme, userId = 101 }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/knowledge-graph/${userId}`);
        const data = await response.json();
        setNodes(data.nodes);
        setEdges(data.edges);
      } catch (err) {
        console.error("Failed to load graph data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, setNodes, setEdges]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: isDark ? '#0d1117' : '#f6f8fa',
      paddingTop: '64px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* HUD Header */}
      <div style={{ 
        padding: '20px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        zIndex: 10,
        background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>
            Brain <span style={{ color: 'var(--color-primary)' }}>GPS</span>
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Your Directed Acyclic Graph of Mastery
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          {[
            { label: 'Mastered', color: '#3fb950' },
            { label: 'In Progress', color: '#d29922' },
            { label: 'Ready', color: '#58a6ff' },
            { label: 'Locked', color: '#30363d' }
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
              <span style={{ color: 'var(--color-text)' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {loading ? (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="animate-pulse" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Initializing GPS...</div>
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            style={{ background: 'transparent' }}
          >
            <Background color={isDark ? '#30363d' : '#d0d7de'} gap={20} />
            <Controls />
            <MiniMap 
              nodeColor={(n) => n.data?.status === 'mastered' ? '#3fb950' : '#30363d'}
              maskColor={isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'}
              style={{ background: isDark ? '#0d1117' : '#fff' }}
            />
          </ReactFlow>
        )}

        {/* Selected Node Inspector (Side Panel) */}
        {selectedNode && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '320px',
            background: 'rgba(13, 17, 23, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid #30363d',
            borderRadius: '24px',
            padding: '24px',
            zIndex: 100,
            animation: 'slideLeft 0.3s ease-out',
            color: '#fff',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{selectedNode.data.label}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer' }}
              >✕</button>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: '#8b949e', lineHeight: 1.6, marginBottom: '20px' }}>
              Skill Category: <strong>{selectedNode.data.category}</strong>. 
              {selectedNode.data.status === 'locked' 
                ? " You need to complete prerequisites before starting this module."
                : " This concept is currently in your learning frontier."}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: '#21262d', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8b949e', marginBottom: '4px' }}>Level</div>
                <div style={{ fontWeight: 700 }}>{selectedNode.data.difficulty}/5</div>
              </div>
              <div style={{ background: '#21262d', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8b949e', marginBottom: '4px' }}>Status</div>
                <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{selectedNode.data.status.replace('_', ' ')}</div>
              </div>
            </div>

            <button 
              disabled={selectedNode.data.status === 'locked'}
              onClick={() => onStartChallenge && onStartChallenge(selectedNode.data.category)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: selectedNode.data.status === 'locked' ? '#30363d' : 'var(--gradient-primary)',
                color: '#fff',
                fontWeight: 700,
                cursor: selectedNode.data.status === 'locked' ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}
            >
              Start Challenge <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .react-flow__edge-path {
          stroke-width: 2;
        }
        .react-flow__controls-button {
          background: #21262d !important;
          fill: #c9d1d9 !important;
          border-bottom: 1px solid #30363d !important;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeGraph;
