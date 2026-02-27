# StudyFlow Pro 📚

A smart study planner to track subjects, manage exam dates, and plan your study schedule.

## ✅ No Backend Required

This app uses **localStorage** for data persistence — no Supabase, no database, no environment variables needed. Just install and run.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🛠 Tech Stack

- **Next.js 15** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling
- **localStorage** — Data persistence (browser-based, no server needed)

## 📋 Features

- **Dashboard** — Overview of all subjects, upcoming exams, difficulty breakdown
- **Subjects** — Add/remove subjects with exam dates, difficulty, and study hours
- **Timetable** — Auto-generated daily study plan based on days remaining
- **Progress** — Track completed vs upcoming exams

## 💾 Data Storage

All data is saved in your browser's localStorage under the key `studyflow_subjects`. Data persists between sessions on the same browser/device.

## 🔧 Node.js Requirement

Requires **Node.js 18+**. Check with: `node --version`
