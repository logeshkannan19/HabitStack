# HabitStack – Smart Habit Tracker App

"Stack your habits. Build your future."

HabitStack is a modern, production-ready habit tracking web application designed to help users build consistent habits, track streaks, and visualize progress with a premium SaaS-level experience.

## ✨ Features

- **Authentication System**: Secure signup/login with JWT and bcrypt.
- **Habit Management**: Easily add, edit, and delete habits with categories and frequencies.
- **Daily Check-in System**: Mark habits as completed and track your daily progress.
- **Streak Tracking 🔥**: Visualize your current and longest streaks to stay motivated.
- **Progress Dashboard 📊**: Beautiful charts (Recharts) and statistics showing your completion rate and activity.
- **AI Insights ✨**: Smart suggestions based on your behavior (Demo).
- **Gamification**: Earn points for completing habits and level up.
- **Premium UI**: Dark mode support, smooth animations (Framer Motion), and fully responsive design.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Recharts, Framer Motion.
- **Backend**: Node.js, Express, REST API.
- **Database**: MongoDB (Mongoose).
- **Auth**: JWT, bcryptjs.

## 📂 Project Structure

```
habitstack/
│── client/ (React frontend)
│── server/ (Node.js backend)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
│── .env
```

## 🚀 Setup Instructions

### Backend Setup
1. Navigate to `/server`
2. Run `npm install`
3. Create a `.env` file based on the provided template:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `npm run dev` (Ensure `nodemon` is installed)

### Frontend Setup
1. Navigate to `/client`
2. Run `npm install`
3. Start the dev server: `npm run dev`

## 💼 Demo User
- **Email**: demo@habitstack.com
- **Password**: password123

---
Built with ❤️ for a better future.
