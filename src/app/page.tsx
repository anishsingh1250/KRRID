'use client';
import { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ChessSpinner from "@/components/ChessSpinner";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const aboutRef = useRef(null);
  const plansRef = useRef(null);
  const coursesRef = useRef(null);
  const contactRef = useRef(null);

  // Move FAQ array and state here
  const faqs = [
    {
      question: "I am a complete beginner. Can I join Krrid?",
      answer: "Absolutely! We offer personalized coaching for all levels, from beginners to advanced players. If you're unsure about your level, share your 'chess.com' or 'Lichess' ID, and we'll recommend the best training program for you.",
    },
    {
      question: "How long does it take to see improvement in my chess skills?",
      answer: "Progress varies based on practice, consistency, and learning pace. However, with regular training, structured lessons, and weekly tasks, most students notice significant improvement within a few months.",
    },
    {
      question: "Do you offer trial classes before enrollment?",
      answer: "Yes! We provide a free trial session so you can experience our teaching methods and interact with our coaches before enrolling.",
    },
    {
      question: "What is the ideal age to start learning chess?",
      answer: "Chess can be learned at any age! We have successfully trained kids as young as 4 years old, helping them develop cognitive skills and strategic thinking early on.",
    },
    {
      question: "How do online classes work, and are they effective?",
      answer: "Our online sessions use interactive boards, real-time game analysis, and structured lesson plans. With flexible timing and expert guidance, students find online learning just as effective, if not better, than offline classes.",
    },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const timer = setTimeout(() => setLoading(false), 2000);
    // Scroll listener for active section
    const handleScroll = () => {
      const sections = [
        { id: "about", ref: aboutRef },
        { id: "plans", ref: plansRef },
        { id: "courses", ref: coursesRef },
        { id: "contact", ref: contactRef },
      ];
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const ref = sections[i].ref.current as HTMLElement | null;
        if (ref && ref.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (ref: RefObject<any>) => {
    if (ref.current) {
      (ref.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <ChessSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-body">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Krrid Logo" width={80} height={40} />
        </div>
        <ul className="hidden md:flex gap-8 font-heading text-black text-sm">
          <li className={`transition-colors duration-200 cursor-pointer ${activeSection === "about" ? "text-primary font-bold" : "hover:text-primary"}`} onClick={() => scrollToSection(aboutRef)}>About Us</li>
          <li className={`transition-colors duration-200 cursor-pointer ${activeSection === "plans" ? "text-primary font-bold" : "hover:text-primary"}`} onClick={() => scrollToSection(plansRef)}>Plans</li>
          <li className={`transition-colors duration-200 cursor-pointer ${activeSection === "courses" ? "text-primary font-bold" : "hover:text-primary"}`} onClick={() => scrollToSection(coursesRef)}>Courses</li>
          <li className={`transition-colors duration-200 cursor-pointer ${activeSection === "contact" ? "text-primary font-bold" : "hover:text-primary"}`} onClick={() => scrollToSection(contactRef)}>Contact Us</li>
        </ul>
        <div className="flex gap-3">
          <Link href="/auth">
            <button className="bg-primary text-white rounded-lg px-5 py-2 font-heading text-base font-semibold shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/60">Sign Up / Login</button>
          </Link>
          <button className="bg-black text-white rounded-lg px-5 py-2 font-heading text-base font-semibold transition-transform duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60">Book a Demo</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center text-center py-12 px-4 bg-gradient-to-b from-primary/10 to-white relative overflow-hidden">
        <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight mb-4">
          Learn through <br />
          the <span className="bg-red-500 px-2 italic font-special text-primary">Krrid</span> way!
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-6 text-lg">
          Unlock genius through play. Krrid blends chess, challenges, and learning to transform curiosity into strategic mastery. Ready to make your move?
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <button
            className="bg-black text-white rounded-lg px-8 py-2 font-heading text-lg font-semibold shadow-md transition-transform duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60 ripple"
            onClick={e => { e.currentTarget.classList.add('ripple-animate'); setTimeout(() => e.currentTarget.classList.remove('ripple-animate'), 400); router.push("/chess"); }}
          >
            Play
          </button>
          <button
            className="bg-gray-100 text-black rounded-lg px-8 py-2 font-heading text-lg font-semibold border border-gray-300 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/60 ripple"
            onClick={e => { e.currentTarget.classList.add('ripple-animate'); setTimeout(() => e.currentTarget.classList.remove('ripple-animate'), 400); router.push("/learn"); }}
          >
            Learn
          </button>
        </div>
        <div className="w-full flex justify-center">
          <Image src="/chessboard-hero.png" alt="Chessboard" width={700} height={300} className="rounded-xl shadow-card drop-shadow-[0_0_40px_rgba(37,198,245,0.25)]" />
        </div>
      </section>

      {/* Turn Pawns Into Queens Section */}
      <section className="relative bg-white py-20 px-4 flex flex-col items-center justify-center overflow-x-clip min-h-[600px] md:min-h-[700px]">
        <div className="flex w-full max-w-5xl mx-auto items-center justify-between gap-2">
          <img src="/pawn.png" alt="Pawn" className="hidden md:block h-[240px] w-auto object-contain ml-[-40px]" style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))'}} />
          <div className="flex-1 flex flex-col items-center justify-center px-2">
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-center text-[#181f2b] mb-2 leading-tight">
              Turn Pawns Into Queens With Us!
            </h2>
            <p className="text-gray-400 text-center max-w-lg mb-6 text-lg">Chess sharpens critical thinking, improve focus, and problem solving skills for school and life!</p>
            <div className="font-heading text-lg font-semibold text-center mb-3 text-[#181f2b]">At Krrid, we make learning fun with:</div>
            <div className="w-full max-w-xl flex flex-col gap-3 mb-2">
              <div className="grid grid-cols-4 gap-4">
                <span className="bg-gradient-to-r from-[#c6f3ff] to-[#7ee8fa] text-[#181f2b] px-4 py-2 rounded-lg font-heading text-base text-center shadow break-words truncate min-w-0 max-w-full flex items-center justify-center">Expert strategies</span>
                <span className="bg-gradient-to-r from-[#c6f3ff] to-[#7ee8fa] text-[#181f2b] px-4 py-2 rounded-lg font-heading text-base text-center shadow break-words truncate min-w-0 max-w-full flex items-center justify-center">AI & real matches</span>
                <span className="bg-gradient-to-r from-[#c6f3ff] to-[#7ee8fa] text-[#181f2b] px-4 py-2 rounded-lg font-heading text-base text-center shadow break-words truncate min-w-0 max-w-full flex items-center justify-center">Interactive lessons</span>
                <span className="bg-gradient-to-r from-[#c6f3ff] to-[#7ee8fa] text-[#181f2b] px-4 py-2 rounded-lg font-heading text-base text-center shadow break-words truncate min-w-0 max-w-full flex items-center justify-center">Tactical puzzles</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <span className="bg-gradient-to-r from-[#c6f3ff] to-[#7ee8fa] text-[#181f2b] px-4 py-2 rounded-lg font-heading text-base text-center shadow break-words truncate min-w-0 max-w-full flex items-center justify-center">Tournaments & leaderboards</span>
                <span className="bg-gradient-to-r from-[#c6f3ff] to-[#7ee8fa] text-[#181f2b] px-4 py-2 rounded-lg font-heading text-base text-center shadow break-words truncate min-w-0 max-w-full flex items-center justify-center">Tournaments & leaderboards</span>
              </div>
            </div>
            <div className="italic text-gray-400 text-center mt-2 text-sm">With Krrid, kids don't just play, they master, grow, and excel!</div>
          </div>
          <img src="/queen.png" alt="Queen" className="hidden md:block h-[260px] w-auto object-contain mr-[-40px]" style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))'}} />
        </div>
      </section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4 bg-white flex flex-col items-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-black text-center mb-10">Benefits Of Chess For Kids</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-6">
          <div className="bg-gray-100 rounded-xl shadow-card p-6 flex flex-col items-start">
            <h3 className="font-heading font-semibold text-lg mb-2">Empowering Strategic Minds:</h3>
            <p className="text-gray-400 mb-4">Cultivate planning, foresight, and critical decision-making skills that lay the foundation for academic and personal success.</p>
            <Image src="/benefit-book.png" alt="Book" width={80} height={80} />
          </div>
          <div className="bg-black text-white rounded-xl shadow-card p-6 flex flex-col items-start">
            <h3 className="font-heading font-semibold text-lg mb-2">Enhancing Social Interaction:</h3>
            <p className="text-gray-100 mb-4">Promote respectful competition, sportsmanship, and teamwork through interactive, fun chess sessions that connect young minds.</p>
            <Image src="/benefit-social.png" alt="Social" width={80} height={80} />
          </div>
          <div className="bg-gray-100 rounded-xl shadow-card p-6 flex flex-col items-start">
            <h3 className="font-heading font-semibold text-lg mb-2">Boosting Cognitive Abilities:</h3>
            <p className="text-gray-400 mb-4">Enhance memory, concentration, and problem-solving skill , each move sharpens the mind for smarter learning.</p>
            <Image src="/benefit-cognitive.png" alt="Cognitive" width={80} height={80} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="bg-gray-100 rounded-xl shadow-card p-6 flex flex-col items-start">
            <h3 className="font-heading font-semibold text-lg mb-2">Interactive & Engaging Experience:</h3>
            <p className="text-gray-400 mb-4">With Krrid's dynamic platform, learning chess transforms into an immersive journey where every match sparks curiosity, growth, and the joy of discovery.</p>
            <Image src="/benefit-engage.png" alt="Engage" width={80} height={80} />
          </div>
          <div className="bg-gray-100 rounded-xl shadow-card p-6 flex flex-col items-start">
            <h3 className="font-heading font-semibold text-lg mb-2">Fostering Creativity & Innovation:</h3>
            <p className="text-gray-400 mb-4">Encourage kids to explore diverse strategies, turning challenges into opportunities and everyday moves into bold breakthroughs.</p>
            <Image src="/benefit-creative.png" alt="Creative" width={80} height={80} />
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4 bg-black text-white flex flex-col items-center rounded-t-[3rem] rounded-b-[3rem]"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-12 z-20">What Our Students Say</h2>
        <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
          {/* Left quote SVG */}
          <svg className="absolute left-[-60px] md:left-[-100px] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-80 z-0" style={{pointerEvents:'none'}} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="leftQuoteGradient" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1ecfff"/>
                <stop offset="1" stopColor="#1ecfff" stopOpacity="0.7"/>
              </linearGradient>
            </defs>
            <path d="M20 100V60C20 30 40 20 60 20V40C50 40 40 50 40 60V100H80V120H20V100Z" fill="url(#leftQuoteGradient)"/>
            <path d="M60 100V60C60 30 80 20 100 20V40C90 40 80 50 80 60V100H120V120H60V100Z" fill="url(#leftQuoteGradient)"/>
          </svg>
          {/* Right quote SVG */}
          <svg className="absolute right-[-60px] md:right-[-100px] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-80 z-0" style={{pointerEvents:'none'}} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rightQuoteGradient" x1="120" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1ecfff"/>
                <stop offset="1" stopColor="#1ecfff" stopOpacity="0.7"/>
              </linearGradient>
            </defs>
            <path d="M20 100V60C20 30 40 20 60 20V40C50 40 40 50 40 60V100H80V120H20V100Z" fill="url(#rightQuoteGradient)"/>
            <path d="M60 100V60C60 30 80 20 100 20V40C90 40 80 50 80 60V100H120V120H60V100Z" fill="url(#rightQuoteGradient)"/>
          </svg>
          <div className="relative z-10 w-full flex flex-col items-center">
        <TestimonialCarousel />
          </div>
          </div>
        <div className="flex gap-8 justify-center mt-14 z-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-xl w-24 h-24 flex items-center justify-center shadow-lg">
              <Image src="/yt.svg" alt="YouTube" width={40} height={40} />
          </div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-16 px-4 bg-white flex flex-col items-center"
      >
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
          <div className="flex-1 flex flex-col gap-4 items-start justify-start">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-heading mb-2">FAQs</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Have Questions? We've Got You!</h2>
            <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 mb-2 shadow">
              <Image src="/coach.png" alt="Coach" width={48} height={48} className="rounded-full" />
              <span className="font-heading text-sm">Trust The Process, And You'll See Progress In No Time <span className="text-accent">♥</span></span>
            </div>
            <p className="text-black text-sm mb-4">Feel free to reach out, we're here to assist you anytime!</p>
            <button className="bg-black text-white rounded-lg px-6 py-2 font-heading text-base">Contact Us</button>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {/* FAQ Accordions (static for now) */}
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border border-gray-200 bg-white shadow transition-all duration-200 ${openFaq === idx ? 'ring-2 ring-primary' : ''}`}
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 font-heading font-semibold text-base text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="text-black">{faq.question}</span>
                  <span className="ml-4 text-2xl text-gray-400">{openFaq === idx ? '×' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-6 pb-4 text-base text-gray-700 animate-fadeIn"
                  >
                    {faq.answer}
            </div>
                )}
            </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-0 px-0 rounded-t-[3rem] mt-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-8 px-4">
          <div className="flex flex-col gap-2 items-start">
            <Image src="/logo.svg" alt="Krrid Logo" width={80} height={40} />
            <span className="text-sm leading-tight">Shiddhart Vihar, Gaur City 2,<br />Ghaziabad, Uttar Pradesh<br />201009</span>
            <div className="flex gap-3 mt-2">
              <Image src="/ig.svg" alt="Instagram" width={20} height={20} />
              <Image src="/fb.svg" alt="Facebook" width={20} height={20} />
              <Image src="/x.svg" alt="X" width={20} height={20} />
              <Image src="/yt.svg" alt="YouTube" width={20} height={20} />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start md:items-end">
            <span className="font-heading text-lg text-white text-right leading-tight">Have Any Questions?<br />Please Don't Hesitate To Connect With Us -</span>
            <span className="bg-[#1ecfff] text-black px-3 py-1 rounded font-heading font-semibold text-base tracking-wide">+91 73090 51044</span>
            <span className="bg-[#1ecfff] text-black px-3 py-1 rounded font-heading font-semibold text-base tracking-wide">Officialkrrid@Gmail.Com</span>
          </div>
        </div>
        <div className="bg-[#1ecfff] w-full mt-8 py-2 px-0 flex flex-col md:flex-row justify-between items-center max-w-full text-xs text-black font-semibold tracking-wide">
          <span className="ml-4">Copyright © 2025 Krrid</span>
          <div className="flex gap-6 mr-4 mt-2 md:mt-0">
            <span className="hover:underline cursor-pointer">Refund Policy</span>
            <span className="hover:underline cursor-pointer">Terms and Conditions</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ParallaxChessPieces() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Parallax: pawn moves less, queen moves more
  const pawnY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const queenY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div ref={ref} className="flex justify-between w-full max-w-4xl">
      <motion.div
        style={{ y: pawnY }}
        animate={{ y: [0, -20, 0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <Image src="/pawn.png" alt="Pawn" width={120} height={180} />
      </motion.div>
      <motion.div
        style={{ y: queenY }}
        animate={{ y: [0, -30, 0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
      >
        <Image src="/queen.png" alt="Queen" width={120} height={180} />
      </motion.div>
    </div>
  );
}
