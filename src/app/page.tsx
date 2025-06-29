'use client';
import { useState, useEffect, useRef, RefObject, ChangeEvent, FormEvent } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const aboutRef = useRef(null);
  const plansRef = useRef(null);
  const coursesRef = useRef(null);
  const contactRef = useRef(null);
  const [isDemoOpen, setDemoOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', age: '', datetime: '', message: ''
  });
  const handleDemoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDemoForm({ ...demoForm, [e.target.name]: e.target.value });
  const handleDemoSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Demo form submitted: ' + JSON.stringify(demoForm)); };

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

  // Admin emails
  const ADMIN_EMAILS = [
    "anishsingh1250@gmail.com",
    "vineetsingh05082005@gmail.com",
    "sudhanshusingh0624@gmail.com",
  ];

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
        <span className="text-lg text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col font-body">
      {/* Navbar */}
      <nav className="  relative flex items-center justify-between  px-6 py-1 border-b border-gray-100  top-0 z-50 bg-white/70 backdrop-blur-md">
        <div className=" flex items-center gap-0 ml-[50px] h-[50px] w-[115px]   pt-[0px]">
          <Image src="logo.svg" alt="Krrid Logo" width={155} height={50} /> 
        </div>
        <div className="nav-mid absolute left-1/2 -translate-x-1/2 ">
        <ul className="hidden md:flex  flex items-center justify-center gap-8  text-black text-lg font-medium font-poppins">
          <li className={`transition-colors duration-200 hover:text-white/90 cursor-pointer ${activeSection === "about" ? "text-primary font-bold" : "hover:text-primary"}`}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={`transition-colors duration-200 hover:text-white/90 cursor-pointer ${activeSection === "courses" ? "text-primary font-bold" : "hover:text-primary"}`}>
            <Link href="/courses-curriculum">Courses & Curriculum</Link>
          </li>
          <li className={`transition-colors duration-200 hover:text-black/50 cursor-pointer ${activeSection === "contact" ? "text-primary font-bold" : "hover:text-primary"}`}>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
        </div>
        <div className="flex gap-3 mr-[50px]">
          <button
            className="bg-black text-white rounded-lg px-5 py-2 font-heading text-base font-semibold transition-transform duration-200 hover:scale-105 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60"
            onClick={() => setDemoOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isDemoOpen}
          >
            Book a Demo
          </button>
          {/* Admin Panel button, only for admins */}
          {user && ADMIN_EMAILS.includes(user.email) && (
            <button
              className="bg-gray-600 text-white rounded-lg px-5 py-2 font-medium font-poppins text-base  transition-transform duration-200 hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => router.push('/admin')}
            >
              Admin Panel
            </button>
          )}
        </div>
      </nav>

      {/* Demo Modal */}
      {isDemoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900/80 via-blue-600/80 to-blue-400/80"
          role="dialog"
          aria-modal="true"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-4 border-blue-200"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 focus:outline-none text-3xl"
              onClick={() => setDemoOpen(false)}
              aria-label="Close demo dialog"
            >
              &times;
            </button>
            <h1 className="text-3xl font-heading font-bold mb-4 text-blue-800" tabIndex={0}>Book Your Free Demo</h1>
            <p className="text-base text-gray-700 mb-4" tabIndex={0}>
              Fill the form below to get the available slot.
            </p>
            <form className="grid gap-4 mb-2" onSubmit={handleDemoSubmit}>
              <input className="rounded p-2 border border-blue-200" name="firstName" value={demoForm.firstName} onChange={handleDemoChange} placeholder="First name*" required />
              <input className="rounded p-2 border border-blue-200" name="lastName" value={demoForm.lastName} onChange={handleDemoChange} placeholder="Last name" />
              <input className="rounded p-2 border border-blue-200" name="email" value={demoForm.email} onChange={handleDemoChange} placeholder="Email*" type="email" required />
              <input className="rounded p-2 border border-blue-200" name="phone" value={demoForm.phone} onChange={handleDemoChange} placeholder="Phone*" required />
              <input className="rounded p-2 border border-blue-200" name="age" value={demoForm.age} onChange={handleDemoChange} placeholder="Age*" required />
              <input className="rounded p-2 border border-blue-200" name="datetime" value={demoForm.datetime} onChange={handleDemoChange} placeholder="Date and time*" required />
              <textarea className="rounded p-2 border border-blue-200" name="message" value={demoForm.message} onChange={handleDemoChange} placeholder="Message" rows={2} />
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                Book Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {/* <section id="hero" className="flex flex-col items-center text-center py-12 px-4 bg-gradient-to-b from-primary/10 to-white relative overflow-hidden">
        <h1 className="krrid-heading text-5xl md:text-6xl font-bold leading-tight mb-4">
          Learn through<br />the
          <span className="bg-krrid-highlight"> Krrid</span> way!
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
          <Image src="/chessboard.svg" alt="Chessboard" width={700} height={300} className="rounded-xl shadow-card drop-shadow-[0_0_40px_rgba(37,198,245,0.25)]" />
        </div>
      </section> */}
      <section id="hero" className="relative flex flex-col items-center text-center py-8 px-4   w-full h-[700px]">

  {/* Background Image */}
  <div className="absolute bottom-0   flex justify-center items-center mt-[0px] ">
    <Image
      src="/chessboard.svg"
      alt="Chessboard"
      width={1690}
      height={580}
      className="object-cover"
    />
  </div>

  {/* Foreground Text */}
  <h1 className="krrid-heading text-5xl md:text-6xl font-bold leading-tight mb-4 z-10">
    Learn through<br />the
    <span className="bg-krrid-highlight"> Krrid</span> way!
  </h1>
  <p className="text-gray-700 max-w-xl mx-auto mb-8 text-xl font-Inter font-regular z-10">
    Welcome to Krrid, the ultimate destination where games meet learning, and strategy builds success! 
  </p>
  <div className="flex gap-4 justify-center mb-8 z-10">
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
</section>


      {/* Turn Pawns Into Queens Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        
      >
      <section className="  py-10 px-4 flex flex-col items-center  overflow-x-clip min-h-[600px] md:min-h-[700px]">
        <div className="relative z-10 flex mt-[2em]  flex-col w-full max-w-5xl mx-auto items-center justify-center gap-5   ">
        <h2 className="font-heading text-5xl md:text-[80px] font-Inter font-semibold text-center text-[#181f2b]  leading-[72px] tracking-[-4.28px]">
              Turn Pawns Into 
              <br />Queens With Us!
            </h2>
            <p className="   text-gray-600 bg-white font-Inter  text-center max-w-lg mb-0 text-lg">Chess sharpens critical thinking, improve focus, and problem solving skills for school and life!</p>
</div>
          
        <div className=" absolute    flex flex-row w-full max-w-5xl mt-[8em] py-0 items-center justify-center gap-0 ">
        <img src="/pawn.svg" alt="Pawn" className="hidden md:block h-[510px] w-[250px] object-contain" style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))'}} />
       
        {/* <div className="flex w-full max-w-5xl mx-auto items-center justify-between gap-2 bg-blue-500"> */}
          {/* <img src="/pawn.svg" alt="Pawn" className="hidden md:block h-[700px] w-[250px] object-contain ml-[-40px]" style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))'}} /> */}
          <div className="flex flex flex-col items-center justify-center px-10 ">
            
            <div className="font-heading text-lg font-semibold text-center mb-3 text-[#181f2b]">At Krrid, we make learning fun with:</div>
            <div className="w-full max-w-xl flex flex-col gap-3 mb-2 items-center justify-center">
              <div className="grid grid-cols-4 gap-5 w-[42em] h-[2em]">
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Expert strategies</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">AI & real matches</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Interactive lessons</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Tactical puzzles</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2  w-[30em] h-[2em]">
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Tournaments & leaderboards</span>
                <span className="bg-gradient-to-r from-[#47D4EB]/85 to-[#ffffff]/70   text-[#181f2b] px-4 py-2  font-Inter text-base text-medium text-center  break-words truncate min-w-0 max-w-full flex items-center justify-center">Tournaments & leaderboards</span>
              </div>
            </div>
            <div className="font-Inter italic text-[#1D242B] text-center font-medium mt-8 text-base">With Krrid, kids don't just play, they master, grow, and excel!</div>
          </div>
          <img src="/queen.svg" alt="Queen" className="hidden md:block h-[460px] w-[250px]  object-contain " style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))'}} />
        {/* </div> */}
        </div>
        
      </section>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="py-6 px-4  flex flex-col items-center"
      >
        <h2 className="font-Inter text-4xl md:text-[80px]  font-semibold text-black text-center leading-[77px] tracking-[-2.28px]  mb-10">Benefits Of Chess <br/> For Kids</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full  max-w-6xl mt-10 mb-6">
          <div className="bg-gradient-to-t from-[#47D4EB]/20 to-[#ffffff]/20 border border-[3px] border-gray-300 rounded-4xl shadow-card p-5 flex flex-col items-start">
            <h3 className="font-Inter font-semibold text-2xl text-black mb-2">Empowering Strategic Minds:</h3>
            <p className="text-[#55525B] font-Inter font-regular text-start text-base mb-4">Cultivate planning, foresight, and critical decision-making skills that lay the foundation for academic and personal success.</p>
            <Image src="/boost.svg" alt="Book" width={396} height={200} />
          </div>
          <div className="bg-gradient-to-b from-[#000000]/90 to-[#55525B]/100 border border-[3px] border-black-300 rounded-4xl shadow-card p-0 flex flex-col items-center">
            <h3 className="font-Inter pl-6 pr-6 pt-6 pb-0 font-semibold text-2xl text-white mb-2">Enhancing Social Interaction:</h3>
            <p className="text-[#E1DFE8] pl-6 pr-6 pt-0 pb-0 font-Inter font-regular text-start text-base mb-4">Promote respectful competition, sportsmanship, and teamwork through interactive, fun chess sessions that connect young minds.</p>
            <Image src="/boost.svg" alt="Social" width={350} height={200} />
          </div>
          <div className="bg-gradient-to-t from-[#47D4EB]/20 to-[#ffffff]/20 border border-[3px] border-gray-300 rounded-4xl shadow-card p-0 flex flex-col items-start">
            <h3 className="font-Inter font-semibold text-2xl text-black mb-2 pl-6 pt-6 pr-6 pb-0">Boosting Cognitive Abilities:</h3>
            <p className="text-[#55525B] font-Inter font-regular text-start text-base leading-[24px] mb-4 pl-6 pr-6 pb-0">Enhance memory, concentration, and problem-solving skill , each move sharpens the mind for smarter learning.</p>
            <Image src="/boost.svg" alt="Cognitive" width={450} height={200}  />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <div className="bg-gradient-to-t from-[#47D4EB]/20 to-[#ffffff]/20 border border-[3px] border-gray-300 rounded-4xl shadow-card p-6 flex flex-col items-start">
            <h3 className="font-Inter font-semibold text-2xl text-black mb-2">Interactive & Engaging Experience:</h3>
            <p className="text-[#55525B] font-Inter font-regular text-start text-basemb-4">With Krrid's dynamic platform, learning chess transforms into an immersive journey where every match sparks curiosity, growth, and the joy of discovery.</p>
            <Image src="/boost.svg" alt="Engage" width={480} height={200} />
          </div>
          <div className="bg-gradient-to-t from-[#47D4EB]/20 to-[#ffffff]/20 border border-[3px] border-gray-300 rounded-4xl p-6 flex flex-col items-start">
            <h3 className="font-Inter font-semibold text-2xl text-black mb-2 ">Fostering Creativity & Innovation:</h3>
            <p className="text-[#55525B] font-Inter font-regular text-start text-base mb-4">Encourage kids to explore diverse strategies, turning challenges into opportunities and everyday moves into bold breakthroughs.</p>
            <Image src="/innovativatio.svg" alt="Creative" width={400} height={150} />
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 bg-black text-white flex flex-col ml-1 mr-1 pb-20 items-center rounded-t-[3rem] rounded-b-[3rem]"
      >
        <h2 className="font-Inter text-4xl md:text-[80px] font-bold text-center mb-12 z-20">What Our <br/> Students Say</h2>
        <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-between">
          
          <Image src="/iconl.svg" alt="Quote" width={120} height={120} className="absolute left-[-180px] md:left-[-180px] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-80 z-0" />
          
         
          <div className="relative z-10 w-full flex flex-col items-center">
            <TestimonialCarousel />
          </div>
          <Image src="/iconr.svg" alt="Quote" width={120} height={120} className="absolute right-[-180px] md:right-[-180px] top-1/2 -translate-y-1/2 w-32 h-32 md:w-56 md:h-56 opacity-80 z-0" />

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
            <div className="flex flex-row gap-2 bg-[#F1F1F1] items-center justify-start  px-2 py-1 rounded-full ">
              <Image src="/faqicon.svg" alt="FAQ" width={18} height={18} />
              <span className=" text-xs font-poppins text-black font-medium font-heading ">FAQs</span>
            </div>
            
            <h2 className="font-heading font-Inter text-3xl md:text-4xl text-black font-bold mb-2">Have Questions? <br/> We've Got You!</h2>
            <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-4 mb-2 shadow">
              <Image src="/handshake.svg" alt="Coach" width={48} height={48} className="rounded-full" />
              <span className="font-heading font-Inter text-black font-semibold  text-base">Trust The Process, And You'll <br/> See Progress In No Time <span className="text-accent text-red-500">🏆</span></span>
            </div>
            <p className="text-black font-Inter font-semibold text-base  mb-4">Feel free to reach out, we're here to assist you anytime!</p>
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
      <footer className="bg-black text-white pt-12 pb-0 px-0 rounded-t-[8rem] mt-1 w-full">
        <div className="flex  flex-col  md:flex-row justify-between items-center max-w-7xl mx-auto gap-5 px-1">
          <div className="flex flex-col gap-2 ml-0 items-start mt-2">
            <Image src="/logo.svg" alt="Krrid Logo" width={80} height={40} />
            <span className="text-lg leading-tight mt-4">Shiddhart Vihar, Gaur City 2,<br />Ghaziabad, Uttar Pradesh<br />201009</span>
            {/* <div className="flex gap-3 mt-2">
              <Image src="/ig.svg" alt="Instagram" width={20} height={20} />
              <Image src="/fb.svg" alt="Facebook" width={20} height={20} />
              <Image src="/x.svg" alt="X" width={20} height={20} />
              <Image src="/yt.svg" alt="YouTube" width={20} height={20} />
            </div> */}
            <div className="flex space-x-4 mt-2">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="w-6 h-6 text-blue-600" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="w-6 h-6 text-pink-500" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <FaYoutube className="w-6 h-6 text-blue-400" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="w-6 h-6 text-blue-700" />
      </a>
    </div>
          </div>
          <div className="flex  flex-row gap-70 items-start md:items-end">
            <span className="font-heading text-2xl font-Inter font-semibold text-white text-left  leading-tight">Have Any Questions?<br />Please Don't Hesitate To <br/> Connect With Us -</span>
           <div className="flex flex-col gap-2 items-start md:items-start">
           <span className="bg-gradient-to-r from-[#47D4EB]/100 to-[#000000]/100 text-white px-2 py-1  font-heading font-semibold text-base tracking-wide">+91 7309051044</span>
            <span className="bg-gradient-to-r from-[#47D4EB]/100 to-[#000000]/100 text-white px-2 py-1  font-heading font-semibold text-base tracking-wide">officialkrrid@Gmail.Com</span>

            </div> 
          </div>
        </div>
        <div className="bg-[#47D4EB] w-full mt-8 py-2 px-0 flex flex-col md:flex-row justify-between items-center max-w-full text-xs text-black font-semibold tracking-wide">
          <span className="ml-[8rem] font-Inter font-semibold ">Copyright © 2025 Krrid</span>
          <div className="flex gap-15 mr-[5rem] mt-2 md:mt-0">
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
