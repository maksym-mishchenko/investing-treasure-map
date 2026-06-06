# 🗺️ Investing Treasure Map

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**A Stranger Things-themed interactive guide to investing basics.** Built for my English teacher who was curious about how to start investing — each zone is a chapter in a learning journey through the Upside Down of finance.

## ✨ Features

- 🧠 **8 Learning Zones** — From money mindset to portfolio building, each themed as a Hawkins location
- 📚 **Curated Resources** — Books, podcasts, movies, and articles for each topic
- 🎯 **Interactive Quizzes** — Test your knowledge after each zone with multiple-choice questions
- 🔓 **Progressive Unlocking** — Complete quizzes to unlock the next zone on the map
- 🎨 **Animated Map** — SVG path connections with particle effects between zones
- 🔐 **Cookie-based Auth** — Simple login with role-based access (admin/user)
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 |
| Auth | Cookie-based sessions with Base64-encoded JSON |
| State | Client-side localStorage for quiz progress |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/       # Login, logout, session endpoints
│   ├── api/quiz/       # Quiz answer validation
│   ├── login/          # Login page
│   ├── zone/[slug]/    # Dynamic zone detail pages
│   └── page.tsx        # Main treasure map view
├── components/
│   ├── AuthProvider.tsx # Auth context with cookie sessions
│   ├── MapPath.tsx     # SVG path connections between zones
│   ├── Particles.tsx   # Floating particle effects
│   └── Quiz.tsx        # Interactive quiz component
└── lib/
    ├── auth.ts         # Auth helpers
    ├── progress.ts     # Zone unlock/completion tracking
    ├── quiz-answers.ts # Correct answers (server-side only)
    └── zones.ts        # All zone data, resources, and questions
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your passwords

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the treasure map.

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `ADMIN_PASSWORD` | Password for admin account |
| `GUEST_PASSWORD` | Password for guest account |

## 📜 License

[MIT](LICENSE) — Maksym Mishchenko

