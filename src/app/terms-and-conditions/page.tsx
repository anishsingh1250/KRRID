'use client';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#1A1C2C] flex flex-col items-center justify-center py-16 px-4 font-poppins">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{color:'#FFD700'}}>Terms and Conditions</h1>
        <p className="text-gray-800 mb-4 text-center">By enrolling at Krrid Chess Academy, you agree to the following terms and conditions:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>All classes must be scheduled in advance and attended on time.</li>
          <li>Missed classes without prior notice may not be rescheduled or refunded.</li>
          <li>Course materials are for personal use only and may not be shared or distributed.</li>
          <li>Respectful behavior is expected from all students and parents during sessions.</li>
          <li>Krrid reserves the right to update these terms at any time. Continued use of our services implies acceptance of any changes.</li>
        </ul>
        <p className="text-gray-600 text-sm text-center">For questions or clarifications, please contact us at <a href="mailto:officialkrrid@gmail.com" className="text-blue-600 underline">officialkrrid@gmail.com</a> or call +91 7309051044.</p>
      </section>
    </main>
  );
} 