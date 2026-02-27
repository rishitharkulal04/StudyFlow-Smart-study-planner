'use client';

import { TrendingUp, Award, Clock } from 'lucide-react';
import type { Subject } from '@/lib/supabase';

interface ProgressContentProps { subjects: Subject[]; }

function getDaysUntil(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const exam = new Date(y, m - 1, d);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.ceil((exam.getTime() - today.getTime()) / 86400000);
}

export function ProgressContent({ subjects }: ProgressContentProps) {
  const completed = subjects.filter(s => getDaysUntil(s.examDate) <= 0);
  const upcoming = subjects.filter(s => getDaysUntil(s.examDate) > 0);
  const totalHours = subjects.reduce((sum, s) => sum + s.hours, 0);
  const completedHours = completed.reduce((sum, s) => sum + s.hours, 0);
  const pct = totalHours > 0 ? Math.round((completedHours / totalHours) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="animate-fade-up">
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
          Progress
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Track your study journey</div>
      </div>

      {/* Overview stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="animate-fade-up-1">
        {[
          { label: 'Completed Exams', value: completed.length, icon: Award, color: 'var(--accent-emerald)', bg: 'var(--accent-emerald-dim)' },
          { label: 'Remaining Subjects', value: upcoming.length, icon: Clock, color: 'var(--accent-cyan)', bg: 'var(--accent-cyan-dim)' },
          { label: 'Total Study Hours', value: `${totalHours}h`, icon: TrendingUp, color: 'var(--accent-violet)', bg: 'var(--accent-violet-dim)' },
        ].map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} className="glass" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{st.label}</div>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={st.color} />
                </div>
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 34, fontWeight: 800, color: 'var(--foreground)' }}>{st.value}</div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="glass animate-fade-up-2" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
            Overall Completion
          </div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 24, color: 'var(--accent-cyan)' }}>{pct}%</div>
        </div>
        <div className="progress-bar" style={{ height: 8, marginBottom: 10 }}>
          <div className="progress-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }} />
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          {completed.length} of {subjects.length} subjects completed · {completedHours}h of {totalHours}h study hours
        </div>
      </div>

      {/* Subject status list */}
      {subjects.length > 0 && (
        <div className="glass animate-fade-up-3" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 18 }}>
            Subject Status
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {subjects.map((s, i) => {
              const days = getDaysUntil(s.examDate);
              const done = days <= 0;
              return (
                <div key={s.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0',
                  borderBottom: i < subjects.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 99,
                    background: done ? 'var(--accent-emerald-dim)' : 'var(--surface-3)',
                    border: `2px solid ${done ? 'var(--accent-emerald)' : 'var(--border-light)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {done && <span style={{ fontSize: 10, color: 'var(--accent-emerald)' }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: done ? 'var(--muted)' : 'var(--foreground)', textDecoration: done ? 'line-through' : 'none' }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 2 }}>
                      {done ? 'Completed' : `${days} days left`} · {s.hours}h
                    </div>
                  </div>
                  <span className={`badge badge-${s.difficulty.toLowerCase().replace(' ', '')}`}>{s.difficulty}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
