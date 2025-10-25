import React from 'react';
import { Reveal } from '@/components/animations/Reveal';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms & Conditions
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700 mb-8">
                  By accessing and using Smart Brain TLC Inc.'s platform, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Accounts & Eligibility</h2>
                <p className="text-gray-700 mb-8">
                  Users must provide accurate information when creating accounts. Parents or guardians must approve accounts for users under 18. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Credits & Sessions</h2>
                <p className="text-gray-700 mb-8">
                  Our credit system operates on the basis that 1 credit equals 30 minutes of tutoring time. Credits can be used for 30-minute or 60-minute sessions (using 1 or 2 credits respectively). Credits expire after 2 months from purchase date.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Bookings, Rescheduling & Cancellations</h2>
                <p className="text-gray-700 mb-8">
                  Sessions can be rescheduled with at least 24 hours notice for a full credit refund. No-shows (failure to attend without prior notice) result in forfeiture of credits. Tutor-initiated cancellations result in full credit refunds.
                </p>
              </Reveal>

              <Reveal delay={500}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sponsor & Partner Programs</h2>
                <p className="text-gray-700 mb-8">
                  Our "Enroll One, Empower Two" program allows sponsors to support students in need. Sponsors may send moderated welcome messages and receive anonymized progress updates. Direct contact between sponsors and students is not permitted.
                </p>
              </Reveal>

              <Reveal delay={600}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tutor Conduct & Platform Rules</h2>
                <p className="text-gray-700 mb-8">
                  All tutors must maintain professional conduct, arrive punctually for sessions, and provide quality instruction. Students and tutors must treat each other with respect and follow platform guidelines.
                </p>
              </Reveal>

              <Reveal delay={700}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payments, Fees & Taxes</h2>
                <p className="text-gray-700 mb-8">
                  All payments are processed securely through our platform. Prices are subject to change with notice. Users are responsible for applicable taxes in their jurisdiction.
                </p>
              </Reveal>

              <Reveal delay={800}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                <p className="text-gray-700 mb-8">
                  All content, materials, and resources provided through our platform remain the property of Smart Brain TLC Inc. or their respective owners. Users may not reproduce or distribute content without permission.
                </p>
              </Reveal>

              <Reveal delay={900}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use & Prohibited Activities</h2>
                <p className="text-gray-700 mb-8">
                  Users must not engage in harassment, share inappropriate content, attempt to circumvent payment systems, or use the platform for any illegal activities. Violations may result in account suspension or termination.
                </p>
              </Reveal>

              <Reveal delay={1000}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers & Limitation of Liability</h2>
                <p className="text-gray-700 mb-8">
                  Smart Brain TLC Inc. provides educational services "as is" and makes no guarantees regarding specific academic outcomes. Our liability is limited to the amount paid for services.
                </p>
              </Reveal>

              <Reveal delay={1100}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                <p className="text-gray-700 mb-8">
                  Users agree to indemnify and hold harmless Smart Brain TLC Inc. from any claims, damages, or expenses arising from their use of the platform or violation of these terms.
                </p>
              </Reveal>

              <Reveal delay={1200}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law & Dispute Resolution</h2>
                <p className="text-gray-700 mb-8">
                  These terms are governed by the laws of Wyoming, United States. Any disputes will be resolved through binding arbitration in Casper, Wyoming.
                </p>
              </Reveal>

              <Reveal delay={1300}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 mb-8">
                  We reserve the right to update these terms at any time. Users will be notified of significant changes via email or platform notifications.
                </p>
              </Reveal>

              <Reveal delay={1400}>
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