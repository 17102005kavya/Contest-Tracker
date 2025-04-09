import React from "react";
import { Link } from "react-router-dom";
import { Moon, CalendarCheck, BookmarkCheck, Bell } from "lucide-react";
import Header from "../components/Header"
export default function HomePage() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 text-gray-900 p-6">
      {/* Hero Section */}
      <Header/>
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Track All Your Coding Contests in One Place
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Stay updated with contests from Codeforces, LeetCode, AtCoder, and more.
        </p>
        <Link
          to="/contests"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          View Upcoming Contests
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl shadow-md p-6 bg-white flex items-center gap-4">
          <Bell className="text-blue-500" />
          <div>
            <h3 className="font-semibold text-lg">Contest Reminders</h3>
            <p className="text-sm text-gray-500">
              Get notified before contests begin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl shadow-md p-6 bg-white flex items-center gap-4">
          <BookmarkCheck className="text-purple-500" />
          <div>
            <h3 className="font-semibold text-lg">Bookmark Contests</h3>
            <p className="text-sm text-gray-500">
              Save contests you don’t want to miss.
            </p>
          </div>
        </div>

        <div className="rounded-2xl shadow-md p-6 bg-white flex items-center gap-4">
          <CalendarCheck className="text-green-500" />
          <div>
            <h3 className="font-semibold text-lg">Calendar Sync</h3>
            <p className="text-sm text-gray-500">
              Add contests to your Google Calendar.
            </p>
          </div>
        </div>

        <div className="rounded-2xl shadow-md p-6 bg-white flex items-center gap-4">
          <Moon className="text-yellow-500" />
          <div>
            <h3 className="font-semibold text-lg">Light Theme</h3>
            <p className="text-sm text-gray-500">
              Enjoy a clean and simple light interface.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-2">Already a user?</h2>
        <p className="text-gray-600 mb-4">
          View your bookmarked and upcoming contests.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-5 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-400">
        <p>
          Built with ❤️ by Kavya Nair Puthiyedath &middot;{" "}
          <a href="https://github.com/17102005kavya" className="underline">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
