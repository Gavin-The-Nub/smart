import React from 'react';
import { Reveal } from '@/components/animations/Reveal';

export default function Refund() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Refund Policy
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Effective: March 1, 2024
              </p>
              <p className="text-sm text-gray-500 italic">
                This page provides general information and does not constitute legal advice.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              
              <Reveal delay={100}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-700 mb-8">
                  Smart Brain TLC Inc. is committed to providing fair and transparent refund policies. This policy outlines the conditions under which refunds are available for credits, sessions, and other services.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Credit Purchases</h2>
                <p className="text-gray-700 mb-8">
                  Non-expired credits may be refunded subject to administrative review and platform policies. Refund requests must be submitted within a reasonable timeframe and will be evaluated on a case-by-case basis. Expired credits (older than 2 months) are generally not eligible for refunds.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Cancellations</h2>
                <p className="text-gray-700 mb-8">
                  Sessions cancelled with at least 24 hours notice receive a full credit refund. Tutor-initiated cancellations result in automatic full credit refunds regardless of timing. Emergency cancellations may be evaluated for refund eligibility on a case-by-case basis.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No-Shows</h2>
                <p className="text-gray-700 mb-8">
                  Students who miss scheduled sessions without prior notice forfeit the credits used for that session. This policy ensures fair compensation for tutors who have reserved time for the session. Technical difficulties may be considered for refund eligibility with proper documentation.
                </p>
              </Reveal>

              <Reveal delay={500}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sponsored Credits & Donations</h2>
                <p className="text-gray-700 mb-8">
                  Sponsored credits and donations are generally non-refundable as they directly support students in need. However, exceptional circumstances may be reviewed on a case-by-case basis. Sponsors will receive confirmation of credit allocation and usage reports.
                </p>
              </Reveal>

              <Reveal delay={600}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Time</h2>
                <p className="text-gray-700 mb-8">
                  Approved refunds are typically processed within 5-10 business days and returned to the original payment method. Credit refunds to platform accounts are usually processed immediately. Bank processing times may vary depending on your financial institution.
                </p>
              </Reveal>

              <Reveal delay={700}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
                <div className="text-gray-700 mb-8">
                  <p className="mb-4">To request a refund, follow these simple steps:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Contact our support team using the information below</li>
                    <li>Provide your account details and reason for the refund request</li>
                    <li>Include any relevant documentation (session details, technical issues, etc.)</li>
                    <li>Our team will review your request within 2-3 business days</li>
                    <li>You will receive confirmation and timeline for processing</li>
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={800}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Smart Brain TLC Inc.</strong></p>
                  <p className="text-gray-700 mb-2">US Office: 5830 E 2nd St, Ste 7000, Casper, Wyoming 82609 US</p>
                  <p className="text-gray-700 mb-2">Philippines Office: J and J Arcade Bldg. Lawaan 1, Talisay Cebu 6045</p>
                  <p className="text-gray-700 mb-2">US Phone: +1 805 317 4524</p>
                  <p className="text-gray-700 mb-2">Philippines Phone: 0908 527 1364</p>
                  <p className="text-gray-700">Email: [Contact email coming soon]</p>
                </div>
              </Reveal>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}