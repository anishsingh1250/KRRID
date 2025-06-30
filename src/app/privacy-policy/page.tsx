'use client';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#1A1C2C] flex flex-col items-center justify-center py-16 px-4 font-poppins">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{color:'#FFD700'}}>Privacy Policy</h1>
        <p className="text-gray-800 mb-4 text-center">Your privacy is important to us. This policy explains how Krrid Chess Academy collects, uses, and protects your information:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>We collect only necessary information for registration, communication, and class delivery.</li>
          <li>Your data is never sold or shared with third parties except as required for service delivery.</li>
          <li>All payment information is processed securely via trusted payment gateways.</li>
          <li>You may request to update or delete your information at any time by contacting us.</li>
          <li>We may update this policy periodically. Continued use of our services implies acceptance of any changes.</li>
        </ul>
        <p className="text-gray-600 text-sm text-center">For privacy concerns, please contact us at <a href="mailto:officialkrrid@gmail.com" className="text-blue-600 underline">officialkrrid@gmail.com</a> or call +91 72750 33235.</p>
      </section>
    </main>
  );
} 