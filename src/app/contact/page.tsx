'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function ContactPage() {
  // State for Book Demo form
  const [demoForm, setDemoForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', age: '', datetime: '', message: ''
  });
  // State for Callback form
  const [callbackForm, setCallbackForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', datetime: '', message: ''
  });
  const handleDemoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDemoForm({ ...demoForm, [e.target.name]: e.target.value });
  const handleCallbackChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCallbackForm({ ...callbackForm, [e.target.name]: e.target.value });
  const handleDemoSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Demo form submitted: ' + JSON.stringify(demoForm)); };
  const handleCallbackSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Callback form submitted: ' + JSON.stringify(callbackForm)); };
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-50 to-blue-200 flex flex-col items-center justify-center p-8">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full mb-8">
        <h1 className="text-5xl font-heading font-bold text-teal-800 mb-4 text-center">Book Demo Now</h1>
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Book Your Free Demo</h2>
        <p className="text-base text-gray-700 mb-4 text-center">Fill the form below to get the available slot.</p>
        <form className="grid gap-4 mb-8" onSubmit={handleDemoSubmit}>
          <input className="rounded p-2 border border-blue-200" name="firstName" value={demoForm.firstName} onChange={handleDemoChange} placeholder="First name*" required />
          <input className="rounded p-2 border border-blue-200" name="lastName" value={demoForm.lastName} onChange={handleDemoChange} placeholder="Last name" />
          <input className="rounded p-2 border border-blue-200" name="email" value={demoForm.email} onChange={handleDemoChange} placeholder="Email*" type="email" required />
          <input className="rounded p-2 border border-blue-200" name="phone" value={demoForm.phone} onChange={handleDemoChange} placeholder="Phone*" required />
          <input className="rounded p-2 border border-blue-200" name="age" value={demoForm.age} onChange={handleDemoChange} placeholder="Age*" required />
          <input className="rounded p-2 border border-blue-200" name="datetime" value={demoForm.datetime} onChange={handleDemoChange} placeholder="Date and time*" required />
          <textarea className="rounded p-2 border border-blue-200" name="message" value={demoForm.message} onChange={handleDemoChange} placeholder="Message" rows={2} />
          <button className="bg-gradient-to-r from-blue-500 to-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:from-blue-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Submit</button>
        </form>
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Request a Callback</h2>
        <p className="text-base text-gray-700 mb-4 text-center">Fill the form below to request a callback from our team.</p>
        <form className="grid gap-4 mb-8" onSubmit={handleCallbackSubmit}>
          <input className="rounded p-2 border border-blue-200" name="firstName" value={callbackForm.firstName} onChange={handleCallbackChange} placeholder="First name*" required />
          <input className="rounded p-2 border border-blue-200" name="lastName" value={callbackForm.lastName} onChange={handleCallbackChange} placeholder="Last name" />
          <input className="rounded p-2 border border-blue-200" name="email" value={callbackForm.email} onChange={handleCallbackChange} placeholder="Email*" type="email" required />
          <input className="rounded p-2 border border-blue-200" name="phone" value={callbackForm.phone} onChange={handleCallbackChange} placeholder="Phone*" required />
          <input className="rounded p-2 border border-blue-200" name="datetime" value={callbackForm.datetime} onChange={handleCallbackChange} placeholder="Date and time*" required />
          <textarea className="rounded p-2 border border-blue-200" name="message" value={callbackForm.message} onChange={handleCallbackChange} placeholder="Message" rows={2} />
          <button className="bg-gradient-to-r from-blue-500 to-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:from-blue-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Submit</button>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-teal-700 mb-2 text-center">Get In Touch</h2>
          <div className="flex flex-col gap-2 items-center">
            <div><span className="font-bold text-teal-700">Phone:</span> <a href="tel:+917309051044" className="text-blue-700 underline ml-1">+91 7309051044</a></div>
            <div><span className="font-bold text-teal-700">Email:</span> <a href="mailto:officialkrrid@gmail.com" className="text-blue-700 underline ml-1">officialkrrid@gmail.com</a></div>
            <div><span className="font-bold text-teal-700">Address:</span> <span className="text-gray-700 ml-1">Gaurs Shiddhartham Society, Gaur City 2, Ghaziabad, Uttar Pradesh 201009</span></div>
          </div>
        </div>
      </section>
    </main>
  );
} 