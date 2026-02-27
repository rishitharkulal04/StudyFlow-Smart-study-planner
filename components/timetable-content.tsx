'use client';

import { CalendarDays } from 'lucide-react';
import type { Subject } from '@/lib/supabase';

interface TimetableContentProps { subjects: Subject[]; }

function getDaysUntil(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const exam = new Date(y, m - 1, d);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.ceil((exam.getTime() - today.getTime()) / 86400000);
}

function getDailyHours(subject: Subject): number {
  const days = getDaysUntil(subject.examDate);
  if (days <= 0) return 0;
  return Math.ceil((subject.hours / days) * 10) / 10;
}

export function TimetableContent({ subjects }: TimetableContentProps) {
  const upcoming = subjects
    .filter(s => getDaysUntil(s.examDate) > 0)
    .sort((a, b) => getDaysUntil(a.examDate) - getDaysUntil(b.examDate));

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="animate-fade-up">
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
          Timetable
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Suggested daily study allocation</div>
      </div>

      {upcoming.length === 0 ? (
        <div className="glass" style={{ padding: 48 }}>
          <div className="empty-state">
            <div className="empty-icon"><CalendarDays size={22} color="var(--muted)" /></div>
            <div style={{ fontWeight: 600, color: 'var(--muted)' }}>No upcoming exams</div>
            <div style={{ fontSize: 13, color: 'var(--muted-2)' }}>Add subjects to generate a timetable</div>
          </div>
        </div>
      ) : (
        <>
          {/* Weekly view */}
          <div className="glass animate-fade-up-1" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 18 }}>
              This Week
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
              {days.map((day, di) => (
                <div key={day} style={{
                  background: 'var(--surface-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '12px 8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 8 }}>{day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {upcoming.slice(0, 3).map((s, si) => {
                      const h = getDailyHours(s);
                      const colors = ['var(--accent-cyan)', 'var(--accent-violet)', 'var(--accent-emerald)', 'var(--accent-amber)', 'var(--accent-rose)'];
                      return (
                        <div key={s.id} style={{
                          background: `${colors[si % colors.length]}22`,
                          borderRadius: 4,
                          padding: '3px 4px',
                          fontSize: 10,
                          color: colors[si % colors.length],
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {h}h
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject schedule */}
          <div className="glass animate-fade-up-2" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 18 }}>
              Daily Study Plan
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {upcoming.map((s, i) => {
                const daily = getDailyHours(s);
                const daysLeft = getDaysUntil(s.examDate);
                const colors = ['var(--accent-cyan)', 'var(--accent-violet)', 'var(--accent-emerald)', 'var(--accent-amber)', 'var(--accent-rose)'];
                const col = colors[i % colors.length];
                return (
                  <div key={s.id} style={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}>
                    <div style={{ width: 4, height: 40, borderRadius: 99, background: col, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--foreground)' }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                        {daysLeft} days remaining · {s.hours}h total
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: col }}>{daily}h</div>
                      <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>per day</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
