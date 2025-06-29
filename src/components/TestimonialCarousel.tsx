import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Kundan Kumar',
    image: '/handshake.svg', // Make sure this image exists in public/
    text: 'I had no prior experience with chess, but the structured lessons and live sessions made learning easy and fun! Now, I can confidently play with friends and family. Highly recommended.'
  },
  {
    name: 'Aarav Sharma',
    image: '/handshake.svg',
    text: 'Krrid helped me improve my chess skills quickly. The coaches are friendly and the lessons are interactive. I love the tournaments!'
  },
  {
    name: 'Priya Singh',
    image: '/handshake.svg',
    text: 'The best chess learning platform for kids! My child enjoys every session and has become much more confident.'
  }
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + length) % length);
  const next = () => setCurrent((prev) => (prev + 1) % length);

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center rounded-2xl p-8 shadow-lg">
      {/* Testimonial Content */}
      <div className="flex flex-row items-center gap-6 w-full">
        <div className="flex flex-col items-center min-w-[120px]">
          <Image
            src={testimonials[current].image}
            alt={testimonials[current].name}
            width={80}
            height={80}
            className="rounded-full object-cover border-4 border-white shadow"
          />
          <span className="mt-3 text-primary text-base font-semibold text-center">{testimonials[current].name}</span>
        </div>
        <p className="text-white text-lg text-left font-Inter font-normal leading-relaxed">{testimonials[current].text}</p>
      </div>
      {/* Navigation Dots */}
      <div className="flex gap-2 mt-6 items-center justify-center">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${idx === current ? 'bg-white' : 'bg-gray-500/50'}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
      {/* Arrows */}
      <button
        className="absolute left-1 top-1/2 -translate-y-1/2  hover:bg-white/60 hover:rounded-full text-white  p-2"
        onClick={prev}
        aria-label="Previous testimonial"
        style={{ zIndex: 2 }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2  hover:bg-white/60 hover:rounded-full text-white rounded-full p-2"
        onClick={next}
        aria-label="Next testimonial"
        style={{ zIndex: 2 }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
} 