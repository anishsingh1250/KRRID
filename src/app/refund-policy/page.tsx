'use client';

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-[#1A1C2C] flex flex-col items-center justify-center py-16 px-4 font-poppins">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{color:'#FFD700'}}>Refund Policy</h1>
        <p className="text-gray-800 mb-4 text-center">We value your trust and strive to provide the best learning experience at Krrid Chess Academy. If you are not satisfied with our services, please review our refund policy below:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
          <li>Refunds are available for unused classes if requested within 7 days of purchase.</li>
          <li>Trial/demo classes are non-refundable.</li>
          <li>Refunds will be processed to the original payment method within 7-10 business days after approval.</li>
          <li>No refunds for classes already attended or partially used packages.</li>
          <li>For any issues, please contact us at <a href="mailto:officialkrrid@gmail.com" className="text-blue-600 underline">officialkrrid@gmail.com</a> or call +91 7309051044.</li>
        </ul>
        <p className="text-gray-600 text-sm text-center">For more details, please refer to our Terms and Conditions or contact our support team.</p>
      </section>
    </main>
  );
} 