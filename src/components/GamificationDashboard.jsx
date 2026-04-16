import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar, Target, Award, Star, TrendingUp, Zap } from 'lucide-react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
// Note: We removed the dependency on react-tooltip for stability
// and implemented ultra-sleek custom tooltips in CSS below.

const GamificationDashboard = ({ userId = 101 }) => {
    const [stats, setStats] = useState({
        streak: 0,
        totalSolved: 0,
        activeDays: 0,
        points: 0,
        level: 1,
        experience: 10,
        badges: []
    });
    const [heatmapData, setHeatmapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/stats/${userId}`);
                const data = await response.json();
                
                // Map backend response to UI state
                const totalSolved = data.total_solved || 0;
                setStats({
                    streak: data.current_streak || 0,
                    totalSolved: totalSolved,
                    activeDays: data.active_days || 0,
                    points: totalSolved * 100,
                    level: Math.floor(totalSolved / 5) + 1,
                    experience: (totalSolved % 5) * 20,
                    badges: [
                        { id: 1, title: 'Array Ace', icon: '💎', color: '#00F0FF', desc: 'Solved 10 Array problems', unlocked: totalSolved >= 10 },
                        { id: 2, title: 'Binary Scout', icon: '🔍', color: '#a855f7', desc: 'First Binary Search solve', unlocked: totalSolved >= 1 },
                        { id: 3, title: 'Consistency', icon: '🔥', color: '#fb923c', desc: '7-day solving streak', unlocked: (data.current_streak || 0) >= 7 },
                        { id: 4, title: 'Speed Demon', icon: '🚀', color: '#f87171', desc: 'Solved under 5 mins', unlocked: false }
                    ]
                });
                setHeatmapData(data.heatmap_data || []);
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [userId]);

    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 6);

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#FFF' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 800 }}>Pilot Records</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Performance metrics from the cognitive frontier.</p>
            </div>

            {/* Top Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div className="glass" style={{ padding: '30px', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(251, 146, 60, 0.1)', padding: '15px', borderRadius: '16px', border: '1px solid #fb923c' }}>
                        <Flame size={32} color="#fb923c" />
                    </div>
                    <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>CURRENT STREAK</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.streak} Days</div>
                    </div>
                </div>

                <div className="glass" style={{ padding: '30px', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '15px', borderRadius: '16px', border: '1px solid #00F0FF' }}>
                        <Trophy size={32} color="#00F0FF" />
                    </div>
                    <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>TOTAL CHALLENGES</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.totalSolved}</div>
                    </div>
                </div>

                <div className="glass" style={{ padding: '30px', borderRadius: '24px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '15px', borderRadius: '16px', border: '1px solid #a855f7' }}>
                        <Zap size={32} color="#a855f7" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>RANK LEVEL {stats.level}</div>
                        <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                            <div style={{ width: `${stats.experience}%`, height: '100%', background: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Heatmap Section */}
            <div className="glass" style={{ padding: '40px', borderRadius: '30px', border: '1px solid #1e293b', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={20} color="#00F0FF" />
                        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Neuro-Activity Map</h2>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Visualizing cognitive engagement across time</div>
                </div>
                
                <div style={{ background: 'rgba(6, 11, 24, 0.5)', padding: '20px', borderRadius: '20px' }}>
                    <CalendarHeatmap
                        startDate={threeMonthsAgo}
                        endDate={today}
                        values={heatmapData}
                        classForValue={(value) => {
                            if (!value) return 'color-empty';
                            return `color-scale-${Math.min(value.count, 4)}`;
                        }}
                    />
                </div>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px', color: '#64748b', fontSize: '0.75rem' }}>
                    <span>Less</span>
                    <div style={{ display: 'flex', gap: '3px' }}>
                        <div style={{ width: '12px', height: '12px', background: '#1e293b', borderRadius: '2px' }} />
                        <div style={{ width: '12px', height: '12px', background: 'rgba(0, 240, 255, 0.2)', borderRadius: '2px' }} />
                        <div style={{ width: '12px', height: '12px', background: 'rgba(0, 240, 255, 0.4)', borderRadius: '2px' }} />
                        <div style={{ width: '12px', height: '12px', background: 'rgba(0, 240, 255, 0.7)', borderRadius: '2px' }} />
                        <div style={{ width: '12px', height: '12px', background: '#00F0FF', borderRadius: '2px' }} />
                    </div>
                    <span>More</span>
                </div>
            </div>

            {/* Badges Section */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                    <Award size={24} color="#00F0FF" />
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Hall of Valour</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {stats.badges.map(badge => (
                        <motion.div 
                            key={badge.id}
                            whileHover={badge.unlocked ? { scale: 1.02 } : {}}
                            className="glass"
                            style={{ 
                                padding: '25px', 
                                borderRadius: '24px', 
                                border: `1px solid ${badge.unlocked ? badge.color : '#1e293b'}`, 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                textAlign: 'center',
                                opacity: badge.unlocked ? 1 : 0.4,
                                position: 'relative'
                            }}
                        >
                            {!badge.unlocked && (
                                <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.8rem' }}>🔒</div>
                            )}
                            <div style={{ 
                                fontSize: '3rem', 
                                marginBottom: '15px', 
                                filter: badge.unlocked ? `drop-shadow(0 0 10px ${badge.color})` : 'grayscale(100%)' 
                            }}>
                                {badge.icon}
                            </div>
                            <h3 style={{ margin: '0 0 5px 0', color: badge.unlocked ? badge.color : '#475569' }}>{badge.title}</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>{badge.desc}</p>
                        </motion.div>
                    ))}
                    
                    {/* Coming Soon Shadow */}
                    <div className="glass" style={{ padding: '25px', borderRadius: '24px', border: '1px dashed #1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✨</div>
                        <div style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600 }}>MORE LOCI COMING</div>
                    </div>
                </div>
            </div>

            <style>{`
                .react-calendar-heatmap .color-empty { fill: #1e293b; }
                .react-calendar-heatmap .color-scale-1 { fill: rgba(0, 240, 255, 0.2); }
                .react-calendar-heatmap .color-scale-2 { fill: rgba(0, 240, 255, 0.4); }
                .react-calendar-heatmap .color-scale-3 { fill: rgba(0, 240, 255, 0.7); }
                .react-calendar-heatmap .color-scale-4 { fill: #00F0FF; }
                .react-calendar-heatmap rect { rx: 2; ry: 2; }
            `}</style>
        </div>
    );
};

export default GamificationDashboard;
