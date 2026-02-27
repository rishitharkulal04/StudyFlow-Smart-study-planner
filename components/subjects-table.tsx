'use client';

import { Trash2, BookOpen } from 'lucide-react';
import type { Subject } from '@/lib/supabase';

interface Props { subjects: Subject[]; onDeleteSubject: (id: string) => Promise<void>; }

function getDays(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const today = new Date(); today.setHours(0,0,0,0);
  return Math.ceil((new Date(y, m-1, d).getTime() - today.getTime()) / 86400000);
}
function fmtDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m-1, d).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}
function DiffBadge({ d }: { d: string }) {
  const c = d==='Easy'?'badge-easy':d==='Medium'?'badge-medium':d==='Hard'?'badge-hard':'badge-veryhard';
  return <span className={`badge ${c}`}>{d}</span>;
}

export function SubjectsTable({ subjects, onDeleteSubject }: Props) {
  if (subjects.length === 0) {
    return (
      <div className="glass" style={{ padding: 26 }}>
        <div className="section-label" style={{ marginBottom: 20 }}>Your Subjects</div>
        <div className="empty-state">
          <div className="empty-icon"><BookOpen size={22} color="var(--muted)" /></div>
          <div style={{ fontWeight: 700, color: 'var(--muted)', fontSize: 15 }}>No subjects added yet</div>
          <div style={{ fontSize: 13, color: 'var(--muted-2)', textAlign: 'center', maxWidth: 270, lineHeight: 1.65 }}>
            Use the form to add any subject — Maths, Physics, History, Literature, Languages, anything.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass" style={{ padding: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="section-label">Your Subjects</div>
        <div style={{ background: 'var(--accent-cyan-dim)', border: '1px solid rgba(0,204,245,0.18)', borderRadius: 99, padding: '3px 13px', fontSize: 12, fontWeight: 700, color: 'var(--accent-cyan)' }}>
          {subjects.length} {subjects.length === 1 ? 'subject' : 'subjects'}
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="sf-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>#</th>
              <th>Subject</th>
              <th>Exam Date</th>
              <th>Days Left</th>
              <th>Difficulty</th>
              <th>Hours</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => {
              const days = getDays(s.examDate);
              const dc = days < 0 ? 'urgency-critical' : days <= 3 ? 'urgency-critical' : days <= 7 ? 'urgency-warning' : 'urgency-ok';
              return (
                <tr key={s.id}>
                  <td style={{ color: 'var(--muted-2)', fontSize: 12, fontWeight: 600 }}>{String(i+1).padStart(2,'0')}</td>
                  <td><div style={{ fontWeight: 600, fontSize: 14.5 }}>{s.name}</div></td>
                  <td style={{ color: 'var(--muted)', fontSize: 13 }}>{fmtDate(s.examDate)}</td>
                  <td><span className={dc} style={{ fontSize: 13 }}>{days<0?'Past':days===0?'Today!':days===1?'Tomorrow':`${days}d`}</span></td>
                  <td><DiffBadge d={s.difficulty} /></td>
                  <td style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 500 }}>{s.hours}h</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="sf-btn-danger" onClick={() => onDeleteSubject(s.id)} title="Remove subject">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}