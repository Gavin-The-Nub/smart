import React from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger } from "@/components/animations/Stagger";

export default function Tutors() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 md:pb-28 -mt-24 pt-24 bg-[#F7FAFD]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-12">
            {/* Left Content */}
            <div className="flex-1 lg:pr-8">
              <div className="max-w-xl">
                <Reveal>
                  <h1 className="text-3xl lg:text-5xl lg:leading-normal mb-6 font-bold font-heading wow animate__animated animate__fadeIn">
                    Teach with Purpose —
                    <span className="text-blue-500"> Join Our Team</span>
                  </h1>
                </Reveal>

                <Reveal delay={200}>
                  <p className="text-blueGray-400 leading-relaxed mb-8 wow animate__animated animate__fadeIn text-lg">
                    At Smart Brain TLC, we believe teaching is more than a job —
                    it's a chance to empower underprivileged students and be
                    part of a mission-driven community.
                  </p>
                </Reveal>

                <Reveal delay={400}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      className="btn-primary py-4 px-8 wow animate__animated animate__fadeIn hover-up-2 text-center"
                      href="#benefits"
                    >
                      Apply Now
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right Image with Corner Holders */}
            <div className="flex-1 relative">
              <div className="relative max-w-lg mx-auto">
                <Reveal delay={300}>
                  {/* Corner Holders */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg z-10"></div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg z-10"></div>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg z-10"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg z-10"></div>

                  {/* Main Image */}
                  <img
                    className="jump rounded-xl shadow-2xl wow animate__animated animate__fadeIn w-full h-auto"
                    src="/vendor/monst/img/placeholders/img-6.png"
                    alt="Smiling tutor teaching online"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Teach with Smart Brain TLC?
                </h2>
                <p className="text-xl text-gray-600">
                  Join a community of educators making a real difference
                </p>
              </div>
            </Reveal>

            <Stagger
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              baseDelay={200}
              step={150}
            >
              {/* Flexible Hours */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Flexible Hours
                </h3>
                <p className="text-gray-600">
                  Set your own schedule and work when it fits your life
                </p>
              </div>

              {/* Competitive Pay */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Competitive Pay
                </h3>
                <p className="text-gray-600">
                  Earn competitive rates for your expertise and dedication
                </p>
              </div>

              {/* Make a Difference */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Opportunity to Make a Difference
                </h3>
                <p className="text-gray-600">
                  Help students reach their potential and change lives
                </p>
              </div>

              {/* Supportive Team */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Supportive and Passionate Team
                </h3>
                <p className="text-gray-600">
                  Join a community of dedicated educators who support each other
                </p>
              </div>

              {/* Teach with Purpose */}
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Teach with Purpose, Not Just for Pay
                </h3>
                <p className="text-gray-600">
                  Be part of our "Enroll One, Empower Two" mission
                </p>
              </div>
            </Stagger>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Make a Difference?
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl text-gray-600 mb-8">
                Join our team of passionate educators and help us democratize
                education for students everywhere.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Apply Now
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
