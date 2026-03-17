# HabitStack API Documentation

All API requests should be made to `http://localhost:5001/api`.

## Authentication

### Register User
`POST /auth/register`
- **Body**: `{ "name": "...", "email": "...", "password": "..." }`
- **Response**: `201 Created` with JWT token.

### Login User
`POST /auth/login`
- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: `200 OK` with JWT token.

---

## Habits

### Get All Habits
`GET /habits`
- **Auth**: Required (Bearer Token)
- **Response**: `200 OK` with list of habits.

### Create Habit
`POST /habits`
- **Auth**: Required (Bearer Token)
- **Body**: `{ "name": "...", "category": "...", "frequency": "..." }`

### Check-in Habit
`POST /habits/:id/checkin`
- **Auth**: Required (Bearer Token)
- **Response**: `200 OK` (Updates streak and grants XP).

---

## Statistics

### Get Dashboard Stats
`GET /stats`
- **Auth**: Required (Bearer Token)
- **Response**: `200 OK` with completion rate and chart data.
