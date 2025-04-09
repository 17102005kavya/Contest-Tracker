
```markdown
# 🏆 Contest Tracker

A full-stack web app to track competitive programming contests across platforms like Codeforces, LeetCode, CodeChef, and AtCoder. Users can filter, search, bookmark contests, add them to Google Calendar, and even find YouTube solution videos!

## ✨ Features

- 🔍 **Search** and filter contests by platform
- 📅 View **Upcoming** and **Past** contests
- 📌 **Bookmark** contests to revisit later
- 📹 Find **YouTube solutions** for past contests
- 📆 **Add to Google Calendar** directly
- 🔐 Authentication-based bookmarking (context-driven)
- 🎨 Responsive and animated UI using Tailwind & Framer Motion

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion
- React Icons

### Backend
- Node.js
- Express
- MongoDB
- YouTube Data API

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/contest-tracker.git
cd contest-tracker
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd backend
npm install
# Create .env file here
npm run dev
```

### 4. Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_youtube_data_api_key
```



## 🚀 Usage

1. Open your browser and navigate to `http://localhost:5173` (frontend)
2. Ensure backend runs on `http://localhost:5000`
3. Search/filter contests, bookmark them, and explore solution videos!



## 🧩 To-Do / Future Enhancements

- Contest reminder notifications
- User dashboard with calendar view
- Dark mode toggle
- Social logins via Google or GitHub
- Auto refresh + caching for contest data

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).


