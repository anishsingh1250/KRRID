'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
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
          <li><Link href="/plans-courses" className="hover:text-primary">Plans & Courses</Link></li>
          <li><Link href="/contact" className="hover:text-primary font-semibold text-primary">Contact Us</Link></li>
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
        <h1 className="text-4xl font-bold text-center text-black mb-8">Contact Us</h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          We'd love to hear from you! Whether you have questions about our courses, need support, or just want to say hello, feel free to reach out.
          (Placeholder content for Contact Us page)
        </p>
        
        {/* Placeholder for a contact form or contact details */}
        <div className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-6">Send us a message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
            </div>
            <button type="submit" className="w-full bg-black text-white rounded-md px-6 py-3 font-sans text-sm font-medium transition-transform duration-200 hover:scale-105">Send Message</button>
          </form>
        </div>
      </main>

      {/* Footer (Optional) */}
      {/* <footer className="bg-black text-white p-8 text-center">
        <p>&copy; {new Date().getFullYear()} Krrid. All rights reserved.</p>
      </footer> */}
    </div>
  );
}