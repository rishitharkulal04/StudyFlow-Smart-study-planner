# 📚 StudyFlow Pro — Smart Study Planner

> A beautiful, dark-themed study planner to track subjects, manage exam dates, and auto-generate your daily study schedule.

🌐 **Live Demo:** [https://study-flow-smart-study-planner.vercel.app](https://study-flow-smart-study-planner.vercel.app)

---

## ✨ Features

- **📊 Dashboard** — Overview of all subjects, upcoming exams countdown, difficulty breakdown & exam timeline
- **📖 Subjects** — Add/remove any subject with exam date, difficulty level, and study hours needed
- **📅 Timetable** — Auto-generated weekly view and daily study plan based on days remaining
- **📈 Progress** — Track completed vs upcoming exams with overall completion percentage
- **💾 Persistent Storage** — All data saved in browser localStorage, no account needed
- **🎨 Purple Dark Theme** — Premium dark UI with smooth animations and glassmorphism design

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+**
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rishitharkulal04/StudyFlow-Smart-study-planner.git

# 2. Navigate into the project
cd StudyFlow-Smart-study-planner

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. That's it — no database, no env variables needed! ✅

---

## 📁 Project Structure

```
studyflow-fixed/
├── app/
│   ├── api/
│   │   └── subjects/
│   │       ├── route.ts          # GET & POST subjects
│   │       └── [id]/
│   │           └── route.ts      # DELETE subject by id
│   ├── globals.css               # Global styles & design tokens
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Main page (client, localStorage)
│
├── components/
│   ├── dashboard-content.tsx     # Dashboard page
│   ├── subjects-content.tsx      # Subjects page layout
│   ├── subject-form.tsx          # Add subject form
│   ├── subjects-table.tsx        # Subjects list table
│   ├── timetable-content.tsx     # Timetable page
│   ├── progress-content.tsx      # Progress page
│   ├── study-sidebar.tsx         # Navigation sidebar
│   ├── theme-provider.tsx        # Theme context
│   └── ui/                       # shadcn/ui components
│
├── hooks/
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
│
├── lib/
│   ├── supabase.ts               # Data layer (localStorage-based)
│   └── utils.ts                  # Utility functions
│
├── next.config.mjs               # Next.js configuration
├── tailwind.config               # Tailwind CSS v4
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework (App Router) |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **shadcn/ui** | UI component library |
| **Lucide React** | Icons |
| **localStorage** | Data persistence (no backend needed) |
| **Vercel** | Deployment |

---

## 💾 Data Storage

All subject data is stored in the browser's **localStorage** under the key `studyflow_subjects`. This means:

- ✅ Works completely offline
- ✅ No sign-up or account required
- ✅ Data persists between browser sessions
- ⚠️ Data is per-browser/device (not synced across devices)

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rishitharkulal04/StudyFlow-Smart-study-planner)

Or manually:
1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Click Deploy — no environment variables needed!

---

## 📸 Screenshots

| Dashboard | Subjects | Timetable | Progress |
|---|---|---|---|
| Stats, next exam countdown | Add & manage subjects | Weekly + daily plan | Completion tracking |

---

## 📄 License

MIT License — feel free to use, modify, and   distribute.

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/rishitharkulal04">rishitharkulal04</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div> 
