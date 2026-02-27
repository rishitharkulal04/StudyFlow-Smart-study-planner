'use client';

import { BookMarked, Clock, Zap, Trophy, ChevronRight, AlertCircle } from 'lucide-react';
import type { Subject } from '@/lib/supabase';

interface DashboardContentProps {
  subjects: Subject[];
  onGeneratePlan: () => void;
  onNavigate: (page: string) => void;
}

function getDaysUntil(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const exam = new Date(y, m - 1, d);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.ceil((exam.getTime() - today.getTime()) / 86400000);
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function DashboardContent({ subjects, onNavigate }: DashboardContentProps) {
  const upcoming = subjects
    .map(s => ({ ...s, days: getDaysUntil(s.examDate) }))
    .filter(s => s.days > 0)
    .sort((a, b) => a.days - b.days);

  const overdue = subjects.filter(s => getDaysUntil(s.examDate) <= 0);
  const totalHours = subjects.reduce((sum, s) => sum + s.hours, 0);
  const nextExam = upcoming[0];

  const diffCounts = {
    Easy: subjects.filter(s => s.difficulty === 'Easy').length,
    Medium: subjects.filter(s => s.difficulty === 'Medium').length,
    Hard: subjects.filter(s => s.difficulty === 'Hard').length,
    'Very Hard': subjects.filter(s => s.difficulty === 'Very Hard').length,
  };

  const stats = [
    { label: 'Total Subjects', value: subjects.length, icon: BookMarked, color: 'cyan', accent: 'var(--accent-cyan)' },
    { label: 'Upcoming Exams', value: upcoming.length, icon: Clock, color: 'violet', accent: 'var(--accent-violet)' },
    { label: 'Study Hours', value: `${totalHours}h`, icon: Zap, color: 'emerald', accent: 'var(--accent-emerald)' },
    { label: 'Completed', value: overdue.length, icon: Trophy, color: 'amber', accent: 'var(--accent-amber)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div className="animate-fade-up">
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
          Dashboard
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
          {subjects.length === 0 ? 'Add subjects to get started' : `You have ${upcoming.length} upcoming exam${upcoming.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`glass stat-card ${stat.color} animate-fade-up-${i + 1}`} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 32, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                </div>
                <div style={{
                  width: 38, height: 38, borderRadius: 9,
                  background: `rgba(${stat.color === 'cyan' ? '0,212,255' : stat.color === 'violet' ? '124,111,255' : stat.color === 'emerald' ? '16,212,138' : '245,158,11'}, 0.12)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={stat.accent} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Next Exam */}
        <div className="glass animate-fade-up-2" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 18 }}>
            Next Exam
          </div>
          {nextExam ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--foreground)', marginBottom: 4 }}>
                    {nextExam.name}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{formatDate(nextExam.examDate)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontSize: 42, fontWeight: 800, lineHeight: 1,
                    color: nextExam.days <= 3 ? 'var(--accent-rose)' : nextExam.days <= 7 ? 'var(--accent-amber)' : 'var(--accent-cyan)',
                  }}>
                    {nextExam.days}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>days left</div>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{
                  width: `${Math.max(5, Math.min(100, 100 - (nextExam.days / 90) * 100))}%`,
                  background: nextExam.days <= 3 ? 'var(--accent-rose)' : nextExam.days <= 7 ? 'var(--accent-amber)' : 'var(--accent-cyan)',
                }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 8 }}>
                {nextExam.hours}h study time needed · {nextExam.difficulty}
              </div>
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '24px 0' }}>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>No upcoming exams</div>
            </div>
          )}
        </div>

        {/* Difficulty Breakdown */}
        <div className="glass animate-fade-up-3" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 18 }}>
            Difficulty Breakdown
          </div>
          {subjects.length === 0 ? (
            <div className="empty-state" style={{ padding: '24px 0' }}>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>No subjects yet</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Easy', color: 'var(--accent-emerald)', count: diffCounts.Easy },
                { label: 'Medium', color: 'var(--accent-amber)', count: diffCounts.Medium },
                { label: 'Hard', color: '#fb923c', count: diffCounts.Hard },
                { label: 'Very Hard', color: 'var(--accent-rose)', count: diffCounts['Very Hard'] },
              ].map(d => (
                <div key={d.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{d.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: d.count > 0 ? d.color : 'var(--muted-2)' }}>{d.count}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{
                      width: subjects.length ? `${(d.count / subjects.length) * 100}%` : '0%',
                      background: d.color,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Exams List */}
      <div className="glass animate-fade-up-4" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
            Exam Timeline
          </div>
          {upcoming.length > 0 && (
            <button className="sf-btn-ghost" onClick={() => onNavigate('subjects')} style={{ fontSize: 12, padding: '6px 12px' }}>
              View All <ChevronRight size={12} />
            </button>
          )}
        </div>

        {upcoming.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><AlertCircle size={22} color="var(--muted)" /></div>
            <div style={{ fontSize: 14, color: 'var(--muted)', textAlign: 'center' }}>No upcoming exams scheduled</div>
            <button className="sf-btn-primary" onClick={() => onNavigate('subjects')} style={{ marginTop: 8 }}>
              Add Your First Subject
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {upcoming.slice(0, 5).map((s, i) => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 0',
                borderBottom: i < Math.min(upcoming.length, 5) - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: s.days <= 3 ? 'var(--accent-rose-dim)' : s.days <= 7 ? 'var(--accent-amber-dim)' : 'var(--accent-cyan-dim)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, lineHeight: 1, color: s.days <= 3 ? 'var(--accent-rose)' : s.days <= 7 ? 'var(--accent-amber)' : 'var(--accent-cyan)' }}>{s.days}</span>
                  <span style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--muted-2)' }}>days</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--foreground)' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{formatDate(s.examDate)} · {s.hours}h needed</div>
                </div>
                <span className={`badge badge-${s.difficulty.toLowerCase().replace(' ', '')}`}>
                  {s.difficulty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
