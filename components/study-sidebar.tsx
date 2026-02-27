'use client';

import { LayoutDashboard, BookMarked, CalendarDays, TrendingUp, GraduationCap } from 'lucide-react';

interface StudySidebarProps { active: string; onNavigate: (page: string) => void; }

const navItems = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'subjects',  label: 'Subjects',   icon: BookMarked },
  { id: 'timetable', label: 'Timetable',  icon: CalendarDays },
  { id: 'progress',  label: 'Progress',   icon: TrendingUp },
];

export function StudySidebar({ active, onNavigate }: StudySidebarProps) {
  return (
    <aside style={{
      width: 242, minWidth: 242, height: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '26px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 11,
            background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(244,63,94,0.15))',
            border: '1px solid rgba(168,85,247,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(168,85,247,0.2)',
          }}>
            <GraduationCap size={20} color="#c084fc" strokeWidth={1.8} />
          </div>
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 17,
              color: 'var(--foreground)', letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #f0eafa, #c084fc)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              StudyFlow
            </div>
            <div style={{
              fontSize: 9.5, color: '#a855f7', letterSpacing: '0.15em',
              textTransform: 'uppercase', fontWeight: 600, opacity: 0.8, marginTop: 1,
            }}>
              Smart Planner
            </div>
          </div>
        </div>
      </div>

      {/* Subtle purple glow strip at top */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)',
      }} />

      {/* Nav */}
      <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-2)', padding: '6px 14px 8px' }}>
          Menu
        </div>
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => onNavigate(id)} className={`nav-item ${active === id ? 'active' : ''}`}>
            <Icon size={16} strokeWidth={active === id ? 2.2 : 1.8} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 11, color: 'var(--muted-2)' }}>v2.0 · StudyFlow Pro</div>
      </div>
    </aside>
  );
}