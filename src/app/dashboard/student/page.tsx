"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { FiLogOut, FiUser, FiBarChart2, FiBookOpen, FiCalendar, FiAward, FiPieChart, FiTarget, FiList, FiClock } from "react-icons/fi";

const sidebarLinks = [
  { label: "Dashboard", icon: <FiBarChart2 />, href: "/dashboard/student" },
  { label: "My Games & Courses", icon: <FiBookOpen />, href: "/dashboard/student/courses" },
  { label: "Achievements", icon: <FiAward />, href: "/dashboard/student/achievements" },
  { label: "Goals", icon: <FiTarget />, href: "/dashboard/student/goals" },
  { label: "Leaderboard", icon: <FiAward />, href: "/dashboard/student/leaderboard" },
  { label: "Schedule", icon: <FiCalendar />, href: "/dashboard/student/schedule" },
];

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/auth");
      else setUser(data.user);
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth");
  }

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Sample/mock data
  const progress = { level: 4, xp: 270, nextLevel: 5, nextXp: 400, streak: 7 };
  const dailyPuzzle = { title: "Knight's Path - Medium", xp: 25 };
  const continueLearning = { course: "Chess Mastery", level: 4, percent: 65 };
  const courses = [
    { name: "Openings", desc: "Master the most effective chess openings", percent: 100, free: true },
    { name: "Midgame Mastery", desc: "Develop strong midgame strategies", percent: 65, free: false },
    { name: "Endgame Strategy", desc: "Learn the art of winning endgames", percent: 0, free: false, locked: true },
  ];
  const achievements = [
    { title: "First Win", desc: "Win your first chess game", date: "2023-04-12" },
    { title: "Puzzle Streak", desc: "Solve a puzzle every day for 7 days", date: "2023-04-15" },
    { title: "Beat the Clock", desc: "Win a blitz game under 3 minutes", date: "2023-04-18" },
    { title: "Explorer", desc: "Try 5 different openings", date: null },
  ];
  const goals = [
    { title: "Improve solve time", desc: "Improve your puzzle solve time by 20% this week", progress: 12, total: 20 },
    { title: "Try Queen's Gambit", desc: "Practice and master the Queen's Gambit opening", progress: 2, total: 5 },
  ];
  const leaderboard = [
    { name: "Emma K.", xp: 845 },
    { name: "Michael T.", xp: 792 },
    { name: "Sarah L.", xp: 764 },
    { name: user.email.split("@")[0] + " (You)", xp: 270 },
    { name: "James W.", xp: 265 },
  ];
  const schedule = [
    { event: "Chess Tournament", date: "May 15" },
    { event: "Opening Strategy Session", date: "May 19" },
  ];

  return (
    <div className="min-h-screen bg-[#f7fafd] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#162447] text-white py-8 px-4 gap-8 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#1ecfff] rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl font-bold">K</div>
          <div>
            <div className="font-heading font-bold text-lg">Krrid</div>
            <div className="text-xs text-[#c6f3ff]">Chess Academy</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map(link => (
            <button key={link.label} className="flex items-center gap-3 px-4 py-2 rounded-lg font-heading text-base hover:bg-[#1ecfff] hover:text-[#162447] transition font-semibold">
              {link.icon} {link.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-3">
          <FiUser className="text-2xl" />
          <div>
            <div className="font-heading font-bold text-base">{user.email.split("@")[0]}</div>
            <div className="text-xs text-[#c6f3ff]">Level {progress.level} • {progress.xp} XP</div>
          </div>
        </div>
        <button onClick={handleSignOut} className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fbeaea] text-red-600 font-heading font-semibold w-full"><FiLogOut /> Sign Out</button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10 px-2 md:px-8">
        {/* Placeholder image for visual appeal */}
        <img src="https://placehold.co/1200x200?text=Krrid+Chess+Dashboard" alt="Dashboard Banner" className="rounded-2xl mb-8 w-full max-w-6xl object-cover" />
        {/* Welcome & Progress */}
        <div className="w-full max-w-6xl flex flex-col gap-6 mb-8">
          <h1 className="font-heading text-3xl md:text-4xl text-[#181f2b] font-bold">Welcome back, {user.email.split("@")[0]}!</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Card */}
            <div className="bg-white rounded-2xl border border-yellow-200 shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2 font-heading font-semibold text-lg text-yellow-700"><FiPieChart /> Your Progress</div>
              <div className="flex items-center gap-2">
                <span className="bg-[#1ecfff] text-white rounded-full px-3 py-1 font-bold">{progress.level}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2">
                  <div className="h-3 bg-[#1ecfff] rounded-full" style={{ width: `${((progress.xp - 0) / (progress.nextXp - 0)) * 100}%` }}></div>
                </div>
                <span className="bg-[#c6f3ff] text-[#162447] rounded-full px-3 py-1 font-bold">{progress.nextLevel}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{progress.xp} XP • {progress.nextXp} XP</div>
              <div className="text-xs text-green-600 mt-1">{progress.streak} day streak!</div>
            </div>
            {/* Daily Puzzle Card */}
            <div className="bg-white rounded-2xl border border-blue-200 shadow p-6 flex flex-col gap-2">
              <div className="font-heading font-semibold text-lg text-blue-700">Daily Puzzle Challenge</div>
              <div className="text-gray-700">{dailyPuzzle.title}</div>
              <div className="text-gray-500 text-sm mt-2">Daily Chess Puzzle<br />Solve for {dailyPuzzle.xp} XP</div>
              <button className="mt-4 bg-[#1ecfff] text-white rounded-lg px-4 py-2 font-heading font-semibold hover:bg-[#162447] transition">Solve Puzzle</button>
            </div>
            {/* Continue Learning Card */}
            <div className="bg-white rounded-2xl border border-green-200 shadow p-6 flex flex-col gap-2">
              <div className="font-heading font-semibold text-lg text-green-700">Continue Learning</div>
              <div className="text-gray-700">Pick up where you left off</div>
              <div className="bg-gradient-to-r from-[#1ecfff] to-[#162447] rounded-lg p-3 mt-2">
                <div className="text-white font-heading font-bold">{continueLearning.course}</div>
                <div className="text-white text-xs">Level {continueLearning.level}</div>
                <div className="w-full h-2 bg-white/30 rounded-full mt-2">
                  <div className="h-2 bg-white rounded-full" style={{ width: `${continueLearning.percent}%` }}></div>
                </div>
                <div className="text-white text-xs mt-1">{continueLearning.percent}% Complete</div>
              </div>
              <button className="mt-4 bg-green-500 text-white rounded-lg px-4 py-2 font-heading font-semibold hover:bg-[#162447] transition">Continue</button>
            </div>
          </div>
        </div>
        {/* My Games & Courses */}
        <div className="w-full max-w-6xl mt-2">
          <h2 className="font-heading text-xl font-bold mb-4">My Games & Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <div key={i} className={`rounded-2xl shadow-lg p-6 flex flex-col gap-2 ${course.locked ? 'bg-gradient-to-br from-gray-200 to-gray-400 opacity-60' : 'bg-gradient-to-br from-[#c6f3ff] to-[#1ecfff]'}`}>
                <div className="font-heading font-bold text-lg mb-1">{course.name}</div>
                <div className="text-gray-700 text-sm mb-2">{course.desc}</div>
                <div className="w-full h-2 bg-white/30 rounded-full">
                  <div className="h-2 bg-[#162447] rounded-full" style={{ width: `${course.percent}%` }}></div>
                </div>
                <div className="text-xs text-[#162447] mt-1">{course.percent}% Completed</div>
                {course.locked ? (
                  <button className="mt-2 bg-gray-400 text-white rounded-lg px-4 py-2 font-heading font-semibold cursor-not-allowed" disabled>Locked</button>
                ) : course.percent === 100 ? (
                  <button className="mt-2 bg-green-500 text-white rounded-lg px-4 py-2 font-heading font-semibold hover:bg-[#162447] transition">Review</button>
                ) : (
                  <button className="mt-2 bg-[#1ecfff] text-white rounded-lg px-4 py-2 font-heading font-semibold hover:bg-[#162447] transition">Continue</button>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Achievements & Badges */}
        <div className="w-full max-w-6xl mt-10">
          <h2 className="font-heading text-xl font-bold mb-4">Achievements & Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((ach, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border border-yellow-100">
                <div className="font-heading font-bold text-lg text-yellow-700">{ach.title}</div>
                <div className="text-gray-700 text-sm">{ach.desc}</div>
                <div className="text-xs text-gray-400 mt-2">{ach.date ? `Earned on ${ach.date}` : 'Not yet earned'}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Personalized Goals */}
        <div className="w-full max-w-6xl mt-10">
          <h2 className="font-heading text-xl font-bold mb-4">Personalized Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border border-blue-100">
                <div className="font-heading font-bold text-lg text-blue-700">{goal.title}</div>
                <div className="text-gray-700 text-sm">{goal.desc}</div>
                <div className="w-full h-2 bg-blue-200 rounded-full mt-2">
                  <div className="h-2 bg-[#1ecfff] rounded-full" style={{ width: `${(goal.progress / goal.total) * 100}%` }}></div>
                </div>
                <div className="text-xs text-blue-700 mt-1">{goal.progress}/{goal.total}</div>
                <button className="mt-2 bg-[#1ecfff] text-white rounded-lg px-4 py-2 font-heading font-semibold hover:bg-[#162447] transition">Work on Goal</button>
              </div>
            ))}
          </div>
        </div>
        {/* Leaderboard & Schedule */}
        <div className="w-full max-w-6xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <div>
            <h2 className="font-heading text-xl font-bold mb-4">Leaderboard</h2>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border border-purple-100">
              <div className="font-heading font-bold text-lg text-purple-700 mb-2">Top Learners</div>
              <ol className="list-decimal ml-5">
                {leaderboard.map((entry, i) => (
                  <li key={i} className={`flex justify-between items-center py-1 ${i === 0 ? 'font-bold text-yellow-600' : i === 1 ? 'font-bold text-gray-700' : i === 2 ? 'font-bold text-orange-700' : ''}`}>
                    <span>{entry.name}</span>
                    <span>{entry.xp} XP</span>
                  </li>
                ))}
              </ol>
              <button className="mt-4 bg-[#1ecfff] text-white rounded-lg px-4 py-2 font-heading font-semibold hover:bg-[#162447] transition">View Full Leaderboard</button>
            </div>
          </div>
          {/* Schedule */}
          <div>
            <h2 className="font-heading text-xl font-bold mb-4">Your Schedule</h2>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border border-green-100">
              <div className="font-heading font-bold text-lg text-green-700 mb-2">Upcoming Events</div>
              <ul>
                {schedule.map((item, i) => (
                  <li key={i} className="flex justify-between items-center py-1">
                    <span>{item.event}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 