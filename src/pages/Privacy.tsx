import React from 'react';
import { Reveal } from '@/components/animations/Reveal';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <p className="text-gray-700 mb-8">
                  We collect information you provide when creating accounts, booking sessions, communicating through our platform, and using our services. This includes personal details, academic information, session recordings for quality purposes, and usage analytics to improve our platform.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Information</h2>
                <p className="text-gray-700 mb-8">
                  Your information is used to provide tutoring services, manage credits and bookings, facilitate communication between tutors and students, process payments, send session reminders, and provide customer support. We also use aggregated data to improve our educational programs.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sponsorship Communications</h2>
                <p className="text-gray-700 mb-8">
                  Sponsors may send moderated welcome messages to students they support. All communications are reviewed for appropriateness. Sponsors receive anonymized progress updates and impact reports. Direct contact between sponsors and students is prohibited to protect privacy.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Photos & Media</h2>
                <p className="text-gray-700 mb-8">
                  Student photos and work samples are shared publicly only with explicit parental consent. Without consent, we share anonymized photos, work samples, or tutor-written summaries to demonstrate program impact while protecting student privacy.
                </p>
              </Reveal>

              <Reveal delay={500}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing & Processors</h2>
                <p className="text-gray-700 mb-8">
                  We share data with trusted service providers including payment processors, email/SMS services for reminders, video conferencing platforms (Zoom, Google Meet), and analytics services. All processors are bound by strict confidentiality agreements.
                </p>
              </Reveal>

              <Reveal delay={600}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
                <p className="text-gray-700 mb-8">
                  We use cookies and similar technologies to maintain login sessions, remember preferences, analyze platform usage, and improve user experience. You can control cookie settings through your browser preferences.
                </p>
              </Reveal>

              <Reveal delay={700}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-700 mb-8">
                  We implement industry-standard security measures including encryption, secure servers, access controls, and regular security audits. However, no system is completely secure, and we cannot guarantee absolute security.
                </p>
              </Reveal>

              <Reveal delay={800}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-700 mb-8">
                  We retain personal information as long as necessary to provide services, comply with legal obligations, and resolve disputes. Session recordings are typically retained for quality assurance and may be deleted after a reasonable period.
                </p>
              </Reveal>

              <Reveal delay={900}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Choices & Rights</h2>
                <p className="text-gray-700 mb-8">
                  You have the right to access, correct, or delete your personal information. You can update your account settings, opt out of non-essential communications, and request data deletion. Contact us to exercise these rights.
                </p>
              </Reveal>

              <Reveal delay={1000}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700 mb-8">
                  Our educational platform serves students under 18 with parental or guardian consent. We comply with applicable children's privacy laws and require parental approval for account creation and photo/media sharing.
                </p>
              </Reveal>

              <Reveal delay={1100}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Transfers</h2>
                <p className="text-gray-700 mb-8">
                  As we operate in multiple countries, your data may be transferred and processed in the United States, Philippines, or other jurisdictions where our service providers operate. We ensure appropriate safeguards are in place.
                </p>
              </Reveal>

              <Reveal delay={1200}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to this Policy</h2>
                <p className="text-gray-700 mb-8">
                  We may update this privacy policy to reflect changes in our practices or applicable laws. We will notify users of significant changes via email or platform notifications.
                </p>
              </Reveal>

              <Reveal delay={1300}>
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