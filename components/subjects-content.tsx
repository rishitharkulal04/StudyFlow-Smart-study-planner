'use client';

import { SubjectForm } from './subject-form';
import { SubjectsTable } from './subjects-table';
import type { Subject } from '@/lib/supabase';

interface Props {
  subjects: Subject[];
  onAddSubject: (s: Subject) => Promise<void>;
  onDeleteSubject: (id: string) => Promise<void>;
}

export function SubjectsContent({ subjects, onAddSubject, onDeleteSubject }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div className="animate-fade-up">
        <div className="page-title">Subjects</div>
        <div className="page-subtitle">Add and manage all your study subjects</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, alignItems: 'start' }}>
        <div className="animate-fade-up-1"><SubjectForm onAddSubject={onAddSubject} /></div>
        <div className="animate-fade-up-2"><SubjectsTable subjects={subjects} onDeleteSubject={onDeleteSubject} /></div>
      </div>
    </div>
  );
}