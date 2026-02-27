'use client';

import { useState, useEffect, useCallback } from 'react';
import { StudySidebar } from '@/components/study-sidebar';
import { DashboardContent } from '@/components/dashboard-content';
import { SubjectsContent } from '@/components/subjects-content';
import { TimetableContent } from '@/components/timetable-content';
import { ProgressContent } from '@/components/progress-content';
import type { Subject } from '@/lib/supabase';

// ─── LocalStorage helpers (client-only) ──────────────────────────────────────
const STORAGE_KEY = 'studyflow_subjects';

function loadSubjectsFromStorage(): Subject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Subject[]) : [];
  } catch {
    return [];
  }
}

function saveSubjectsToStorage(subjects: Subject[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }: { msg: string; type: 'success' | 'error'; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: type === 'success' ? 'var(--accent-emerald-dim)' : 'var(--accent-rose-dim)',
      border: `1px solid ${type === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(244,63,94,0.3)'}`,
      color: type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)',
      padding: '12px 20px',
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 500,
      backdropFilter: 'blur(10px)',
      animation: 'fadeUp 0.3s ease',
      maxWidth: 360,
    }}>
      {msg}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [page, setPage] = useState('dashboard');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
  };

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadSubjectsFromStorage();
    setSubjects(stored);
    setLoading(false);
  }, []);

  const handleAddSubject = async (subject: Subject): Promise<void> => {
    const newSubject: Subject = {
      ...subject,
      id: generateId(),
    };
    setSubjects(prev => {
      const updated = [...prev, newSubject].sort((a, b) =>
        a.examDate.localeCompare(b.examDate)
      );
      saveSubjectsToStorage(updated);
      return updated;
    });
    showToast(`✓ ${newSubject.name} added successfully`);
  };

  const handleDeleteSubject = async (id: string): Promise<void> => {
    const name = subjects.find(s => s.id === id)?.name;
    setSubjects(prev => {
      const updated = prev.filter(s => s.id !== id);
      saveSubjectsToStorage(updated);
      return updated;
    });
    showToast(`${name ?? 'Subject'} removed`);
  };

  const handleGeneratePlan = useCallback(() => {
    if (subjects.length === 0) { showToast('Add subjects first', 'error'); return; }
    showToast('Study plan generated! Check your timetable.');
    setPage('timetable');
  }, [subjects.length]);

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
          <div style={{
            width: 40, height: 40,
            border: '3px solid var(--border)',
            borderTopColor: 'var(--accent-cyan)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>Loading…</div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      );
    }
    switch (page) {
      case 'dashboard': return <DashboardContent subjects={subjects} onGeneratePlan={handleGeneratePlan} onNavigate={setPage} />;
      case 'subjects':  return <SubjectsContent subjects={subjects} onAddSubject={handleAddSubject} onDeleteSubject={handleDeleteSubject} />;
      case 'timetable': return <TimetableContent subjects={subjects} />;
      case 'progress':  return <ProgressContent subjects={subjects} />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--background)' }}>
      <StudySidebar active={page} onNavigate={setPage} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '36px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {renderContent()}
        </div>
      </main>
      {toast && (
        <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </div>
  );
}

