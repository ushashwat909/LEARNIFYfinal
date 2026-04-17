import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar, Award, Zap, Shield, Code2, BookOpen } from 'lucide-react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const BADGES = [
    { id: 'first_solve', title: 'First Blood', icon: '🎯', color: '#3fb950', desc: 'Solve your first problem', threshold: (s) => s.totalSolved >= 1 },
    { id: 'five_solves', title: 'Getting Warmed Up', icon: '🔥', color: '#fb923c', desc: 'Solve 5 problems', threshold: (s) => s.totalSolved >= 5 },
    { id: 'ten_solves', title: 'Double Digits', icon: '💎', color: '#58a6ff', desc: 'Solve 10 problems', threshold: (s) => s.totalSolved >= 10 },
    { id: 'twenty_five', title: 'Quarter Century', icon: '🏆', color: '#d2a8ff', desc: 'Solve 25 problems', threshold: (s) => s.totalSolved >= 25 },
    { id: 'fifty_solves', title: 'Half Centurion', icon: '👑', color: '#f0883e', desc: 'Solve 50 problems', threshold: (s) => s.totalSolved >= 50 },
    { id: 'streak_3', title: 'Hat Trick', icon: '⚡', color: '#f85149', desc: '3-day solving streak', threshold: (s) => s.streak >= 3 },
    { id: 'streak_7', title: 'Consistency King', icon: '🔥', color: '#fb923c', desc: '7-day solving streak', threshold: (s) => s.streak >= 7 },
    { id: 'streak_30', title: 'Iron Will', icon: '🛡️', color: '#58a6ff', desc: '30-day solving streak', threshold: (s) => s.streak >= 30 },
    { id: 'python_master', title: 'Pythonista', icon: '🐍', color: '#3fb950', desc: 'Solve 10 problems in Python', threshold: (s) => (s.langCounts?.python || 0) >= 10 },
    { id: 'cpp_master', title: 'C++ Warrior', icon: '⚙️', color: '#58a6ff', desc: 'Solve 5 problems in C++', threshold: (s) => (s.langCounts?.cpp || 0) >= 5 },
    { id: 'multi_lang', title: 'Polyglot', icon: '🌍', color: '#d2a8ff', desc: 'Solve in 2+ languages', threshold: (s) => Object.values(s.langCounts || {}).filter(v => v > 0).length >= 2 },
    { id: 'level_5', title: 'Rising Star', icon: '⭐', color: '#f0883e', desc: 'Reach Level 5', threshold: (s) => s.level >= 5 },
];

const GamificationDashboard = ({ userId = 101 }) => {
    const [stats, setStats] = useState({
        streak: 0, totalSolved: 0, points: 0, level: 1, experience: 0, langCounts: {}
    });
    const [heatmapData, setHeatmapData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [statsRes, progressRes] = await Promise.all([
                    fetch(`http://localhost:8000/api/stats/${userId}`),
                    fetch(`http://localhost:8000/api/progress/${userId}`)
                ]);
                const statsData = await statsRes.json();
                const progressData = await progressRes.json();

                const totalSolved = statsData.total_solved || 0;

                // Count solves per language
                const langCounts = {};
                (progressData.progress || []).forEach(p => {
                    if (p.status === 'passed') {
                        langCounts[p.language] = (langCounts[p.language] || 0) + 1;
                    }
                });

                // Build heatmap from activity data
                const heatmap = (statsData.activity || []).map(a => ({
                    date: a.date,
                    count: a.count
                }));

                setStats({
                    streak: statsData.current_streak || 0,
                    totalSolved,
                    points: totalSolved * 100,
                    level: Math.floor(totalSolved / 5) + 1,
                    experience: (totalSolved % 5) * 20,
                    langCounts
                });
                setHeatmapData(heatmap);
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [userId]);

    const badges = BADGES.map(b => ({ ...b, unlocked: b.threshold(stats) }));
    const unlockedCount = badges.filter(b => b.unlocked).length;

    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pulse" style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>Loading stats...</div>
        </div>
    );

    return (
        <div style={{ padding: '100px 40px 60px', maxWidth: '1200px', margin: '0 auto', color: 'var(--color-text)' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.2rem', margin: '0 0 4px 0', fontWeight: 800 }}>Your Progress</h1>
                <p style={{ color: 'var(--color-text-muted, #8b949e)', fontSize: '1rem', margin: 0 }}>Track your learning journey and unlock achievements.</p>
            </div>

            {/* Top Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <StatCard icon={<Flame size={28} />} iconColor="#fb923c" label="CURRENT STREAK" value={`${stats.streak} Days`} />
                <StatCard icon={<Trophy size={28} />} iconColor="#3fb950" label="PROBLEMS SOLVED" value={stats.totalSolved} />
                <StatCard icon={<Award size={28} />} iconColor="#d2a8ff" label="BADGES EARNED" value={`${unlockedCount} / ${badges.length}`} />
                <StatCard icon={<Zap size={28} />} iconColor="#58a6ff" label={`LEVEL ${stats.level}`} value={null} progress={stats.experience} />
            </div>

            {/* Heatmap */}
            <div style={{ padding: '32px', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={18} color="var(--color-primary)" />
                        <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Activity</h2>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted, #8b949e)' }}>{stats.totalSolved} contributions in the last 6 months</div>
                </div>

                <div style={{ borderRadius: '12px', padding: '16px' }}>
                    <CalendarHeatmap
                        startDate={sixMonthsAgo}
                        endDate={today}
                        values={heatmapData}
                        classForValue={(value) => {
                            if (!value) return 'color-empty';
                            return `color-scale-${Math.min(value.count, 4)}`;
                        }}
                    />
                </div>
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '6px', color: 'var(--color-text-muted, #8b949e)', fontSize: '0.7rem', alignItems: 'center' }}>
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className={`color-scale-legend-${i}`} style={{
                            width: '12px', height: '12px', borderRadius: '2px',
                            background: i === 0 ? 'var(--color-border)' : `rgba(63, 185, 80, ${0.15 + i * 0.2})`
                        }} />
                    ))}
                    <span>More</span>
                </div>
            </div>

            {/* Badges Section */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Shield size={20} color="var(--color-primary)" />
                    <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Achievements</h2>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted, #8b949e)', marginLeft: '8px' }}>{unlockedCount} of {badges.length} unlocked</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                    {badges.map(badge => (
                        <motion.div
                            key={badge.id}
                            whileHover={badge.unlocked ? { scale: 1.03, y: -2 } : {}}
                            style={{
                                padding: '20px',
                                borderRadius: '14px',
                                border: `1px solid ${badge.unlocked ? badge.color + '60' : 'var(--color-border)'}`,
                                background: badge.unlocked ? badge.color + '08' : 'var(--color-card-bg)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                opacity: badge.unlocked ? 1 : 0.45,
                                transition: '0.2s',
                                cursor: badge.unlocked ? 'default' : 'not-allowed'
                            }}
                        >
                            <div style={{
                                fontSize: '2rem',
                                filter: badge.unlocked ? `drop-shadow(0 0 8px ${badge.color})` : 'grayscale(100%)',
                                lineHeight: 1
                            }}>
                                {badge.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: badge.unlocked ? badge.color : 'var(--color-text-muted, #8b949e)', marginBottom: '2px' }}>
                                    {badge.title}
                                    {!badge.unlocked && <span style={{ marginLeft: '6px', fontSize: '0.7rem' }}>🔒</span>}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted, #8b949e)', lineHeight: 1.3 }}>{badge.desc}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .react-calendar-heatmap .color-empty { fill: var(--color-border); }
                .react-calendar-heatmap .color-scale-1 { fill: rgba(63, 185, 80, 0.25); }
                .react-calendar-heatmap .color-scale-2 { fill: rgba(63, 185, 80, 0.5); }
                .react-calendar-heatmap .color-scale-3 { fill: rgba(63, 185, 80, 0.75); }
                .react-calendar-heatmap .color-scale-4 { fill: #3fb950; }
                .react-calendar-heatmap rect { rx: 2; ry: 2; }
                .react-calendar-heatmap text { fill: var(--color-text-muted, #8b949e); font-size: 0.65rem; }
            `}</style>
        </div>
    );
};

const StatCard = ({ icon, iconColor, label, value, progress }) => (
    <div style={{ padding: '24px', borderRadius: '14px', border: '1px solid var(--color-border)', background: 'var(--color-card-bg)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: iconColor + '15', padding: '12px', borderRadius: '12px', color: iconColor, display: 'flex' }}>
            {icon}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ color: 'var(--color-text-muted, #8b949e)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>{label}</div>
            {value !== null && <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2px' }}>{value}</div>}
            {progress !== undefined && progress !== null && (
                <div style={{ width: '100%', height: '6px', background: 'var(--color-border)', borderRadius: '10px', marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: iconColor, borderRadius: '10px', transition: 'width 0.5s ease' }} />
                </div>
            )}
        </div>
    </div>
);

export default GamificationDashboard;
