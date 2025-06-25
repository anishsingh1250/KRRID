import React, { useState } from "react";

const testimonials = [
  {
    name: "Alice K.",
    text: "This chess platform helped me improve my game tremendously! The lessons are clear and the interface is beautiful.",
    title: "Beginner Player"
  },
  {
    name: "Coach Bob",
    text: "As a coach, I love how easy it is to assign lessons and track progress. Highly recommended!",
    title: "Chess Coach"
  },
  {
    name: "Sophie L.",
    text: "The puzzles and interactive boards make learning chess fun and engaging for my kids.",
    title: "Parent"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
      <div className="relative w-full flex flex-col items-center min-h-[120px]">
        <p className="text-lg text-gray-700 text-center italic mb-4 transition-all duration-300 min-h-[60px]">
          "{testimonials[index].text}"
        </p>
        <div className="flex flex-col items-center">
          <span className="font-bold text-primary text-base">{testimonials[index].name}</span>
          <span className="text-xs text-gray-500">{testimonials[index].title}</span>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={prev}
          className="bg-gray-200 hover:bg-primary/20 text-black rounded-full p-2 transition"
          aria-label="Previous testimonial"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M13 15l-5-5 5-5" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={next}
          className="bg-gray-200 hover:bg-primary/20 text-black rounded-full p-2 transition"
          aria-label="Next testimonial"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="flex gap-1 mt-3">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full ${i === index ? "bg-primary" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel; 