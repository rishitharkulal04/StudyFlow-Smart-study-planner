// ─── Types ────────────────────────────────────────────────────────────────────

export type SubjectRow = {
  id: string;
  name: string;
  exam_date: string;
  difficulty: string;
  hours: number;
  created_at: string;
};

export type Subject = {
  id: string;
  name: string;
  examDate: string;
  difficulty: string;
  hours: number;
};

// ─── Converters ───────────────────────────────────────────────────────────────

export function rowToSubject(row: SubjectRow): Subject {
  return {
    id: row.id,
    name: row.name,
    examDate: row.exam_date,
    difficulty: row.difficulty,
    hours: row.hours,
  };
}

// ─── LocalStorage DB (replaces Supabase — no backend needed) ─────────────────

const STORAGE_KEY = 'studyflow_subjects';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadRows(): SubjectRow[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SubjectRow[]) : [];
  } catch {
    return [];
  }
}

function saveRows(rows: SubjectRow[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export const db = {
  getAllSubjects(): SubjectRow[] {
    return loadRows().sort((a, b) => a.exam_date.localeCompare(b.exam_date));
  },

  insertSubject(data: {
    name: string;
    exam_date: string;
    difficulty: string;
    hours: number;
  }): SubjectRow {
    const rows = loadRows();
    const row: SubjectRow = {
      id: generateId(),
      name: data.name,
      exam_date: data.exam_date,
      difficulty: data.difficulty,
      hours: data.hours,
      created_at: new Date().toISOString(),
    };
    rows.push(row);
    saveRows(rows);
    return row;
  },

  deleteSubject(id: string): boolean {
    const rows = loadRows();
    const filtered = rows.filter((r) => r.id !== id);
    if (filtered.length === rows.length) return false;
    saveRows(filtered);
    return true;
  },
};
