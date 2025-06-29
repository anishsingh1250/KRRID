import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col items-center justify-center p-8">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-3xl w-full mb-8">
        <h1 className="text-5xl font-heading font-bold text-blue-800 mb-4 text-center">About Krrid</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to Krrid, the ultimate destination where games meet learning, and strategy builds success! Through chess and interactive challenges, we turn curiosity into brilliance making one move at a time.
        </p>
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">Turn Pawns Into Queens With Us!</h2>
        <p className="text-base text-gray-600 mb-4 text-center">
          Chess sharpens critical thinking, improves focus, and problem-solving skills for school and life!
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <li className="bg-blue-50 rounded-lg p-4 text-blue-900 font-semibold shadow">Interactive lessons</li>
          <li className="bg-blue-50 rounded-lg p-4 text-blue-900 font-semibold shadow">AI & real matches</li>
          <li className="bg-blue-50 rounded-lg p-4 text-blue-900 font-semibold shadow">Tactical puzzles</li>
          <li className="bg-blue-50 rounded-lg p-4 text-blue-900 font-semibold shadow">Tournaments & leaderboards</li>
          <li className="bg-blue-50 rounded-lg p-4 text-blue-900 font-semibold shadow">Expert strategies</li>
        </ul>
        <p className="text-lg text-blue-700 font-bold text-center">With Krrid, kids don&apos;t just play, they master, grow, and excel!</p>
      </section>
    </main>
  );
} 