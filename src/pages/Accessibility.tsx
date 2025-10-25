import React from 'react';
import { Reveal } from '@/components/animations/Reveal';

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Accessibility Statement
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
                <p className="text-gray-700 mb-8">
                  Smart Brain TLC Inc. is committed to providing an inclusive and accessible educational experience for all learners. We strive to ensure our platform is usable by people with diverse abilities and actively work to remove barriers to learning.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Standards & Practices</h2>
                <p className="text-gray-700 mb-8">
                  We aim to meet or exceed WCAG 2.1 AA standards for web accessibility. Our platform undergoes regular accessibility reviews and improvements. We continuously update our practices to align with current accessibility guidelines and best practices.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
                <div className="text-gray-700 mb-8">
                  <p className="mb-4">Our platform includes the following accessibility features:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Keyboard navigation support for all interactive elements</li>
                    <li>High contrast color schemes that meet accessibility standards</li>
                    <li>Alternative text descriptions for all images and graphics</li>
                    <li>Proper form labels and error messaging</li>
                    <li>Screen reader compatibility</li>
                    <li>Resizable text that maintains functionality up to 200% zoom</li>
                    <li>Clear heading structure for easy navigation</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Known Limitations</h2>
                <p className="text-gray-700 mb-8">
                  We are aware that some aspects of our platform may not yet meet all accessibility standards. We are actively working to address these limitations and appreciate your patience as we continue to improve. Specific areas under development include enhanced mobile accessibility and improved video conferencing accessibility features.
                </p>
              </Reveal>

              <Reveal delay={500}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback & Support</h2>
                <p className="text-gray-700 mb-8">
                  We welcome feedback about accessibility barriers or suggestions for improvement. Please contact us using the information below if you encounter any accessibility issues. We aim to respond to accessibility-related inquiries within 2 business days and work toward resolution as quickly as possible.
                </p>
              </Reveal>

              <Reveal delay={600}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Content</h2>
                <p className="text-gray-700 mb-8">
                  Our platform integrates with third-party services including video conferencing platforms and educational tools. While we cannot control the accessibility of these external services, we advocate for accessible options and provide guidance to users on how to access accessibility features in these tools.
                </p>
              </Reveal>

              <Reveal delay={700}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Date & Continuous Improvement</h2>
                <p className="text-gray-700 mb-8">
                  This accessibility statement was last updated on March 1, 2024. We are committed to continuous improvement and regularly review and update our accessibility practices. Our accessibility efforts are ongoing, and we welcome your input in making our platform more inclusive for all learners.
                </p>
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