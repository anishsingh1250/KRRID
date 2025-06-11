"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Kundan Kumar",
    text: "I had no prior experience with chess, but the structured lessons and live sessions made learning easy and fun! Now, I can confidently play with friends and family. Highly recommended.",
    image: "/student1.png",
  },
  {
    name: "Aarav Singh",
    text: "Krrid's platform is super engaging. The puzzles and tournaments keep me motivated!",
    image: "/student2.png",
  },
  {
    name: "Priya Sharma",
    text: "The teachers are amazing and the lessons are fun. I love the badges and achievements!",
    image: "/student3.png",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-8 md:gap-12 bg-transparent z-10">
        {/* Student image and name */}
        <div className="flex flex-col items-center min-w-[120px]">
          <Image src={testimonials[index].image} alt={testimonials[index].name} width={70} height={70} className="rounded-xl shadow-lg mb-2" />
          <span className="font-heading font-semibold text-[#1ecfff] text-base mt-1">{testimonials[index].name}</span>
        </div>
        {/* Testimonial text */}
        <div className="text-white text-lg text-left max-w-md leading-snug">
          {testimonials[index].text}
        </div>
      </div>
      {/* Navigation dots */}
      <div className="flex gap-2 mt-6 z-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-8 h-1.5 rounded-full transition-colors duration-200 ${i === index ? "bg-[#1ecfff]" : "bg-white/30"}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 