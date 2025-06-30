'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBookDemoModal } from "@/components/BookDemoModalContext";

export default function Navbar() {
  const { openBookDemoModal } = useBookDemoModal();
  const pathname = usePathname();

  // Define color schemes for different pages
  const getNavbarStyles = () => {
    switch (pathname) {
      case '/about':
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-blue-900/20 top-0 z-50 bg-[#1A1C2C]/95 backdrop-blur-md",
          text: "text-white",
          hover: "hover:text-blue-300",
          button: "bg-blue-500 hover:bg-blue-600 text-white"
        };
      case '/contact':
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-gray-800/20 top-0 z-50 bg-black/95 backdrop-blur-md",
          text: "text-white",
          hover: "hover:text-gray-300",
          button: "bg-white hover:bg-gray-100 text-black"
        };
      case '/courses-curriculum':
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-gray-200 top-0 z-50 bg-white/95 backdrop-blur-md",
          text: "text-gray-900",
          hover: "hover:text-gray-600",
          button: "bg-gray-900 hover:bg-gray-800 text-white"
        };
      case '/learn':
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-black top-0 z-50 bg-black text-white",
          text: "text-white",
          hover: "hover:text-gray-300",
          button: "bg-sky-500 hover:bg-sky-600 text-white"
        };
      case '/chess':
      case '/chess/play':
      case '/chess/multiplayer':
      case '/chess/puzzles':
      case '/chess/study':
      case '/chess/friends':
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-blue-900/20 top-0 z-50 bg-gradient-to-r from-black to-blue-900/95 backdrop-blur-md",
          text: "text-white",
          hover: "hover:text-blue-300",
          button: "bg-blue-500 hover:bg-blue-600 text-white"
        };
      default: // Home page and other pages
        return {
          nav: "relative flex items-center justify-between px-6 py-1 border-b border-gray-100 top-0 z-50 bg-white/100 backdrop-blur-md",
          text: "text-black",
          hover: "hover:text-gray-600",
          button: "bg-black hover:bg-gray-800 text-white"
        };
    }
  };

  const styles = getNavbarStyles();

  return (
    <nav className={styles.nav}>
      <div className="flex items-center gap-0 ml-[50px] h-[50px] w-[115px] pt-[0px]">
           <Link href="/"><Image src="/logo.svg" alt="Krrid Logo"  width={155} height={50} /> </Link> 
      </div>
      <div className="nav-mid absolute left-1/2 -translate-x-1/2 ">
        <ul className={`hidden md:flex flex items-center justify-center gap-8 ${styles.text} text-lg font-medium font-poppins`}>
          <li className={`transition-colors duration-200 ${styles.hover} cursor-pointer`}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={`transition-colors duration-200 ${styles.hover} cursor-pointer`}>
            <Link href="/courses-curriculum">Courses & Curriculum</Link>
          </li>
          <li className={`transition-colors duration-200 ${styles.hover} cursor-pointer`}>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-3 mr-[50px]">
        <button
          className={`${styles.button} pulse-fade-in-navbar-demo rounded-lg px-5 py-2 font-heading text-base font-semibold transition-transform duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-black hover:to-sky-400 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/60`}
          onClick={openBookDemoModal}
        >
          Book a Demo
        </button>
      </div>
    </nav>
  );
} 