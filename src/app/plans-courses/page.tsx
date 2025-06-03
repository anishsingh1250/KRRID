'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function PlansCoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      {/* Navbar replicating the structure from home page for consistency */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo-text-krrid.svg" alt="Krrid Logo" width={100} height={30} />
          </Link>
        </div>
        <ul className="hidden md:flex gap-8 font-sans text-gray-700 text-sm">
          <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
          <li><Link href="/plans-courses" className="hover:text-primary font-semibold text-primary">Plans & Courses</Link></li>
          <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
        </ul>
        <div className="flex gap-3 items-center">
          <button className="bg-black text-white rounded-md px-5 py-2 font-sans text-sm font-medium transition-transform duration-200 hover:scale-105">Book a Demo</button>
          <Link href="/auth">
            <button className="bg-white text-black border border-black rounded-md px-5 py-2 font-sans text-sm font-medium shadow-sm transition-transform duration-200 hover:scale-105 hover:bg-gray-50">Sign Up / Login</button>
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-black mb-8">Our Plans & Courses</h1>
        <p className="text-lg text-gray-700 text-center">
          Discover the perfect chess learning plan for your child. We offer a variety of courses tailored to different skill levels and learning preferences.
          (Placeholder content for Plans and Courses page)
        </p>
        {/* Placeholder sections for Plans and Courses details */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-black mb-4">Subscription Plans</h2>
          <p className="text-gray-600">Details about different subscription tiers will go here.</p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Available Courses</h2>
          <p className="text-gray-600">Information about specific chess courses, like beginner, intermediate, advanced, tactics, openings, etc., will be listed here.</p>
        </div>
      </main>

      {/* Footer (Optional) */}
      {/* <footer className="bg-black text-white p-8 text-center">
        <p>&copy; {new Date().getFullYear()} Krrid. All rights reserved.</p>
      </footer> */}
    </div>
  );
}