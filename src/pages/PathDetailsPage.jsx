import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Code2, Database, Globe, Shield, Cpu, LineChart, CheckCircle, Clock, BookOpen, Layers } from 'lucide-react';
import CTASection from '../components/CTASection';

const pathData = {
  'data-structures-algorithms': { title: 'Data Structures & Algorithms', duration: '12 Weeks', icon: <Code2 size={40} />, color: '#2D9E73', desc: 'Master arrays, trees, graphs, DP, and competitive programming patterns with hands-on practice.',
    learningPoints: ['Master core Big O Time & Space complexity analysis', 'Implement Arrays, Linked Lists, Stacks, and Queues from scratch', 'Solve complex recursive and backtracking algorithmic challenge', 'Conquer Dynamic Programming and Graph Traversal algorithms'] },
  'system-design': { title: 'System Design', duration: '10 Weeks', icon: <Database size={40} />, color: '#3B82F6', desc: 'Learn to design scalable systems — load balancers, caching, microservices, and database sharding.',
    learningPoints: ['Architect horizontally scalable, fault-tolerant microservices', 'Compare SQL vs NoSQL scaling and Database Sharding methodologies', 'Implement Load Balancing, Caching headers, and CDN delivery', 'Design highly available metrics and distributed logging systems'] },
  'full-stack-development': { title: 'Full-Stack Development', duration: '14 Weeks', icon: <Globe size={40} />, color: '#8B5CF6', desc: 'Build end-to-end applications with React, Node.js, databases, and deployment pipelines.',
    learningPoints: ['Develop responsive React 19 UIs with modern hooks and DOM caching', 'Build scalable, secure RESTful and GraphQL APIs with Node/Express', 'Handle complex state management and secure user authentication', 'Deploy full CI/CD deployment pipelines using Docker & AWS'] },
  'cybersecurity-fundamentals': { title: 'Cybersecurity Fundamentals', duration: '8 Weeks', icon: <Shield size={40} />, color: '#EF4444', desc: 'Understand network security, ethical hacking, cryptography, and secure coding practices.',
    learningPoints: ['Understand core cryptographic mechanisms (Symmetric vs Asymmetric)', 'Perform supervised Network Vulnerability scanning and OSINT', 'Mitigate common OWASP Web vulnerabilities (XSS, SQLi, CSRF)', 'Design Zero-Trust cloud network architecture perimeters'] },
  'machine-learning-basics': { title: 'Machine Learning Basics', duration: '10 Weeks', icon: <Cpu size={40} />, color: '#F59E0B', desc: 'Dive into supervised/unsupervised learning, neural networks, and model optimization.',
    learningPoints: ['Build predictive Regression and Logistic classification models', 'Implement Neural Networks from scratch using raw Python linear algebra', 'Tune model hyperparameters avoiding overfitting/bias-variance tradeoffs', 'Deploy NLP and computer vision pipelines using PyTorch'] },
  'competitive-programming': { title: 'Competitive Programming', duration: '8 Weeks', icon: <LineChart size={40} />, color: '#06B6D4', desc: 'Sharpen problem-solving with curated contest problems, editorial walkthroughs, and timing drills.',
    learningPoints: ['Master Fast I/O strategies in C++/Python for contest environments', 'Memorize heavy combinatorial algorithms and complex segment trees', 'Simulate high-pressure 3-hour competitive hackathon sprints', 'Break down editorial solutions using reverse-engineering techniques'] },
};

export default function PathDetailsPage() {
  const { pathId } = useParams();
  const path = pathData[pathId];
  
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleEnroll = () => {
    setEnrolled(true);
  };

  const handleComplete = () => {
    setCompleted(true);
    // Simulate Spaced Repetition notification scheduling
    setTimeout(() => {
      alert(`🎉 Congratulations on completing the ${path.title} path!\n\nA Spaced Repetition revision session has been automatically scheduled for 7 days from now. We will notify your email when it's time to review to maximize retention.`);
    }, 300);
  };

  if (!path) {
    return (
      <div className="container" style={{ padding: '120px 24px 80px', textAlign: 'center' }}>
        <h2>Path Not Found</h2>
        <Link to="/" style={{ color: 'var(--color-primary)' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        background: `linear-gradient(to bottom, ${path.color}15, var(--color-bg))`,
        padding: '120px 0 80px' 
      }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div style={{ 
            width: '80px', height: '80px', background: `${path.color}20`, color: path.color, 
            borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 24px' 
          }}>
            {path.icon}
          </div>
          <div className="section-tag" style={{ border: `1px solid ${path.color}40`, color: path.color, background: `${path.color}10` }}>
            {path.duration} IMMERSIVE PATH
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
            {path.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
            {path.desc}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {!enrolled && !completed && (
              <>
                <button onClick={handleEnroll} className="btn btn-primary" style={{ background: path.color, boxShadow: `0 8px 24px ${path.color}40` }}>
                  Enroll in Path
                </button>
                <button onClick={() => alert("Downloading Syllabus PDF...")} className="btn btn-outline" style={{ borderColor: path.color, color: path.color }}>
                  Download Syllabus
                </button>
              </>
            )}
            {enrolled && !completed && (
              <button onClick={handleComplete} className="btn btn-primary" style={{ background: path.color, boxShadow: `0 8px 24px ${path.color}40`, padding: '12px 32px' }}>
                Mark Path as Completed
              </button>
            )}
            {completed && (
              <div style={{ background: `${path.color}20`, color: path.color, padding: '12px 24px', borderRadius: '12px', fontWeight: 700, border: `1px solid ${path.color}40` }}>
                ✓ Path Completed — Revision Scheduled
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="section">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '40px' }}>
            
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '24px', color: 'var(--color-text)' }}>What you'll learn</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {path.learningPoints.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle color={path.color} size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '32px', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '24px', color: 'var(--color-text)' }}>Path Overview</h4>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <Clock color={path.color} size={24} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Duration</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--color-text)', fontWeight: 600 }}>{path.duration}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <Layers color={path.color} size={24} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Modules</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--color-text)', fontWeight: 600 }}>6 Core Modules</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <BookOpen color={path.color} size={24} />
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Delivery</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--color-text)', fontWeight: 600 }}>Self-Paced AI Guided</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      
      <CTASection onStart={() => window.scrollTo(0, 0)} />
    </>
  );
}
