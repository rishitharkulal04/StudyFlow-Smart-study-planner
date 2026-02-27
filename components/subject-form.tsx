'use client';

import { useState } from 'react';
import { Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Subject } from '@/lib/supabase';

interface SubjectFormProps { onAddSubject: (subject: Subject) => Promise<void>; }

const EMPTY = { name: '', examDate: '', difficulty: '', hours: '' };

export function SubjectForm({ onAddSubject }: SubjectFormProps) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (k: keyof typeof EMPTY, v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    setError(''); setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim())          { setError('Subject name is required'); return; }
    if (!form.examDate)             { setError('Please pick an exam date'); return; }
    if (!form.difficulty)           { setError('Please select a difficulty level'); return; }
    if (!form.hours)                { setError('Enter how many hours you need to study'); return; }
    const h = Number(form.hours);
    if (isNaN(h) || h < 1)         { setError('Hours must be at least 1'); return; }

    setSubmitting(true); setError('');
    try {
      const name = form.name.trim();
      await onAddSubject({ id: '', name, examDate: form.examDate, difficulty: form.difficulty, hours: h });
      setForm(EMPTY);
      setSuccess(`"${name}" added!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glass" style={{ padding: '26px 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="form-title">Add Subject</div>
        <div className="form-subtitle">Add any subject — no restrictions at all</div>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>

        <div>
          <label className="sf-label">Subject Name</label>
          <input className="sf-input" placeholder="e.g. Chemistry, French, Music Theory…"
            value={form.name} onChange={e => set('name', e.target.value)} disabled={submitting} autoComplete="off" />
        </div>

        <div>
          <label className="sf-label">Exam Date</label>
          <input className="sf-input" type="date" value={form.examDate}
            onChange={e => set('examDate', e.target.value)} disabled={submitting}
            min={new Date().toISOString().split('T')[0]} />
        </div>

        <div>
          <label className="sf-label">Difficulty Level</label>
          <select className="sf-select" value={form.difficulty}
            onChange={e => set('difficulty', e.target.value)} disabled={submitting}>
            <option value="" disabled>Choose difficulty…</option>
            <option value="Easy">🟢  Easy</option>
            <option value="Medium">🟡  Medium</option>
            <option value="Hard">🟠  Hard</option>
            <option value="Very Hard">🔴  Very Hard</option>
          </select>
        </div>

        <div>
          <label className="sf-label">Study Hours Needed</label>
          <input className="sf-input" type="number" placeholder="e.g. 30" min="1" step="1"
            value={form.hours} onChange={e => set('hours', e.target.value)} disabled={submitting} />
        </div>

        {error && (
          <div style={{ background: 'var(--accent-rose-dim)', border: '1px solid rgba(239,63,92,0.22)', borderRadius: 9, padding: '11px 14px', fontSize: 13, color: 'var(--accent-rose)', display: 'flex', alignItems: 'flex-start', gap: 9, lineHeight: 1.45 }}>
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: 'var(--accent-emerald-dim)', border: '1px solid rgba(14,201,126,0.22)', borderRadius: 9, padding: '11px 14px', fontSize: 13, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: 9 }}>
            <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
            {success}
          </div>
        )}

        <button className="sf-btn-primary" type="submit" disabled={submitting}
          style={{ width: '100%', padding: '13px 22px', marginTop: 2, fontSize: 15 }}>
          <Plus size={17} strokeWidth={2.5} />
          {submitting ? 'Adding…' : 'Add Subject'}
        </button>
      </form>
    </div>
  );
}