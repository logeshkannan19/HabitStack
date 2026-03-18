# HabitStack – Smart Habit Tracker App

[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

> [!NOTE]
> **Live Demo:** [habitstack-landing.vercel.app](https://habitstack-landing.vercel.app)

"Stack your habits. Build your future."

HabitStack is a modern, production-ready habit tracking web application designed to help users build consistent habits, track streaks, and visualize progress.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure signup/login with JWT and bcrypt |
| ✅ **Habit Management** | Add, edit, delete habits with categories |
| 🔥 **Streak Tracking** | Visualize current and longest streaks |
| 📊 **Progress Dashboard** | Beautiful charts with Recharts |
| ✨ **AI Insights** | Smart suggestions based on behavior |
| 🎮 **Gamification** | Earn points and level up |
| 🌙 **Dark Mode** | Premium dark UI with animations |

## 🛠 Tech Stack

| Component | Technology |
|----------|------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js, Express |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT, bcrypt |
| **Charts** | Recharts |
| **Animations** | Framer Motion |

## 📁 Project Structure

```
HabitStack/
├── client/              # React frontend
│   └── src/
│       └── components/  # UI components
├── server/              # Node.js backend
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── controllers/    # Business logic
│   ├── middleware/     # Auth middleware
│   └── utils/         # Utilities
└── .env
```

## 🚀 Quick Start

### Backend
```bash
cd server
npm install
cp .env.example .env  # Configure MongoDB URI
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## 💼 Demo Account

- **Email**: demo@habitstack.com
- **Password**: password123

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5001) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT token secret |

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
