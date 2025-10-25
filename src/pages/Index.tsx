import LottieBlock from "@/components/LottieBlock";
import { useState, useEffect } from 'react';
import React from "react";

// FAQ Disclosure component (clone of template's accordion/disclosure pattern)
interface FaqDisclosureProps {
  idx: number;
  q: string;
  a: string;
}

const FaqDisclosure: React.FC<FaqDisclosureProps> = ({ idx, q, a }) => {
  const [open, setOpen] = React.useState(false);
  const panelId = `faq-panel-${idx}`;
  const buttonId = `faq-button-${idx}`;
  return (
    <div className="rounded-2xl ring-1 ring-slate-200 bg-white shadow transition">
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] transition"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span>{q}</span>
        <svg
          className={`w-6 h-6 ml-2 transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`px-6 pb-5 text-slate-700 text-base transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        {open && <div>{a}</div>}
      </div>
    </div>
  );
};
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Slider1 } from '../components/Slider1';
import { CounterUp } from '../components/CounterUp';
import { Reveal } from '../components/animations/Reveal';
import { Stagger } from '../components/animations/Stagger';
import { TypingEffect } from '../components/TypingEffect';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { Users, TrendingUp, CheckCircle, Lightbulb, BarChart3, PieChart, Briefcase, Coins } from 'lucide-react';
import studentsLearningImage from '../assets/students-learning-together.jpg';

const Index = () => {
  const [inViewport, setInViewport] = useState(false);

  const handleScroll = () => {
    const elements = document.getElementsByClassName("counterUp");
    if (elements.length > 0) {
      const element = elements[0];
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isInViewport && !inViewport) {
        setInViewport(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 md:pb-28 -mt-24 pt-24 bg-[#F7FAFD]">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-12">
            {/* Left Content */}
            <div className="flex-1 lg:pr-8">
              <div className="max-w-xl">
                <h1 className="text-3xl lg:text-5xl lg:leading-normal mb-6 font-bold font-heading wow animate__animated animate__fadeIn">
                  Smart Brain Tutoring <br />
                  and <span className="text-blue-500">Learning Center</span>
                </h1>
                <div className="text-blueGray-400 leading-relaxed mb-8 wow animate__animated animate__fadeIn text-lg">
                  <TypingEffect text="Providing personalized tutoring services to help every student achieve academic success." />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a className="btn-primary py-4 px-8 wow animate__animated animate__fadeIn hover-up-2 text-center" href="#highlights">
                    Why Choose Us
                  </a>
                  <a className="btn-white wow animate__animated animate__fadeIn hover-up-2 text-center" data-wow-delay=".3s" href="#how-we-work">
                    How We Work?
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Image with Corner Holders */}
            <div className="flex-1 relative">
              <div className="relative max-w-lg mx-auto">
                {/* Corner Holders */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg z-10"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg z-10"></div>
                
                {/* Main Image */}
                <img
                  className="jump rounded-xl shadow-2xl wow animate__animated animate__fadeIn w-full h-auto" 
                  src={studentsLearningImage} 
                  alt="Students learning together in an engaging educational environment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Responsive 4-column grid with card styling */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 bg-[#F7FAFD]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Annual Partners */}
          <div className="bg-[#F9FAFB] rounded-xl p-6 shadow-sm flex items-center space-x-4" aria-label="950 annual partners">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" role="img" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#111827] counterUp">
                +<CounterUp end={950} duration={2000} />
              </div>
              <div className="text-sm text-gray-500">Annual Partners</div>
            </div>
          </div>
          {/* 2. Completed Projects */}
          <div className="bg-[#F9FAFB] rounded-xl p-6 shadow-sm flex items-center space-x-4" aria-label="58k completed projects">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" role="img" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#111827]">
                +<CounterUp end={58} duration={2000} />k
              </div>
              <div className="text-sm text-gray-500">Completed Projects</div>
            </div>
          </div>
          {/* 3. Happy Customers */}
          <div className="bg-[#F9FAFB] rounded-xl p-6 shadow-sm flex items-center space-x-4" aria-label="500 happy customers">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" role="img" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#111827]">
                +<CounterUp end={500} duration={2000} />
              </div>
              <div className="text-sm text-gray-500">Happy Customers</div>
            </div>
          </div>
          {/* 4. Research Work */}
          <div className="bg-[#F9FAFB] rounded-xl p-6 shadow-sm flex items-center space-x-4" aria-label="300 research work">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-blue-600" role="img" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#111827]">
                +<CounterUp end={300} duration={2000} />
              </div>
              <div className="text-sm text-gray-500">Research Work</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" aria-labelledby="services-title" className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm uppercase tracking-wide text-slate-500">What we offer</p>
            <h2 id="services-title" className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
              Personalized tutoring for every learner
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1:1 Tutoring */}
            <div className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition h-full">
              <div className="mx-auto mb-4 h-12 w-12 grid place-content-center rounded-xl bg-[#EEF4FF] text-[#2563EB]" aria-hidden="true">
                {/* icon: person */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 22a8 8 0 1116 0"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">1:1 Tutoring</h3>
              <p className="mt-1 text-slate-600">Personalized sessions, 30 and 60 minutes. ESL included.</p>
            </div>

            {/* Small Group Sessions */}
            <div className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition h-full">
              <div className="mx-auto mb-4 h-12 w-12 grid place-content-center rounded-xl bg-[#EEF4FF] text-[#2563EB]" aria-hidden="true">
                {/* icon: users */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11a4 4 0 10-8 0"/><path d="M2 20a8 8 0 0116 0"/><path d="M22 20a6 6 0 00-9-5"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Small Group Sessions</h3>
              <p className="mt-1 text-slate-600">Collaborative learning for 5–10 students (2 credits / 1 hr class).</p>
            </div>

            {/* Test Prep */}
            <div className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition h-full">
              <div className="mx-auto mb-4 h-12 w-12 grid place-content-center rounded-xl bg-[#EEF4FF] text-[#2563EB]" aria-hidden="true">
                {/* icon: graduation cap */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10l-10-5L2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Test Prep</h3>
              <p className="mt-1 text-slate-600">SAT, ACT, and local exams.</p>
            </div>

            {/* Homework Help & Study Skills */}
            <div className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition h-full">
              <div className="mx-auto mb-4 h-12 w-12 grid place-content-center rounded-xl bg-[#EEF4FF] text-[#2563EB]" aria-hidden="true">
                {/* icon: notebook */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5h12a2 2 0 012 2v12a2 2 0 01-2 2H4z"/><path d="M8 3v4"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Homework Help & Study Skills</h3>
              <p className="mt-1 text-slate-600">Build lifelong learning habits.</p>
            </div>

            {/* Executive Function Coaching */}
            <div className="flex flex-col items-center text-center rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition h-full">
              <div className="mx-auto mb-4 h-12 w-12 grid place-content-center rounded-xl bg-[#EEF4FF] text-[#2563EB]" aria-hidden="true">
                {/* icon: brain/timer */}
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 8a4 4 0 118 0v8a4 4 0 11-8 0z"/><path d="M12 2v2M6 6l-2-2M18 6l2-2"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Executive Function Coaching</h3>
              <p className="mt-1 text-slate-600">Time management, planning, and focus.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="/pricing" className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#2563EB] text-white font-medium hover:bg-[#1d4ed8]">
              See Pricing & Credits
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-teaser" className="pt-20 xl:bg-contain bg-top bg-no-repeat" style={{ backgroundImage: "url('/vendor/monst/img/backgrounds/intersect.svg')" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="max-w-lg mx-auto mb-4 text-4xl font-bold font-heading flex items-center justify-center gap-2">
              <Coins className="w-6 h-6 text-blue-500" />
              <span>Pricing & Credits</span>
            </h2>
            <p className="max-w-sm mx-auto text-lg text-blueGray-400">
              Buy credits to book tutoring sessions that fit your child's needs. Every enrollment helps fund sponsorships for learners in need.
            </p>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
              <div className="hover-up-5 pt-16 pb-8 px-4 text-center bg-white rounded shadow">
                <img className="h-20 mb-6 mx-auto" src="/vendor/monst/img/icons/startup.svg" alt="Starter" />
                <h3 className="mb-2 text-4xl font-bold font-heading">Starter</h3>
                <span className="text-4xl text-blue-500 font-bold font-heading">From $30 / session (US)</span>
                <p className="mt-2 mb-8 text-blueGray-400">Ideal for trials & short-term</p>
                <div className="flex flex-col items-center mb-8">
                  <ul className="text-blueGray-400">
                    <li className="flex mb-3">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>US Starter Pack: 6 credits (3 hrs) — $75 (~$25/hr)</span>
                    </li>
                    <li className="flex mb-3">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>PH Starter: 5 credits — ₱750 (₱150/credit)</span>
                    </li>
                    <li className="flex">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>1:1 tutoring — 30 or 60 minutes</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <a className="block sm:inline-block py-4 px-6 mb-4 sm:mb-0 sm:mr-3 text-xs text-white text-center font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded" href="#">
                    Start Free Trial
                  </a>
                  <a className="block sm:inline-block py-4 px-6 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded" href="#">
                    Purchase
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
              <div className="hover-up-5 pt-16 pb-8 px-4 text-center text-white bg-blue-500 rounded shadow relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
                </div>
                <img className="h-20 mb-6 mx-auto" src="/vendor/monst/img/icons/agency.svg" alt="Standard" />
                <h3 className="mb-2 text-4xl font-bold font-heading">Standard</h3>
                <span className="text-4xl font-bold font-heading">Ongoing support — best value</span>
                <p className="mt-2 mb-8">Family & small-group friendly</p>
                <div className="flex flex-col items-center mb-8">
                  <ul>
                    <li className="flex items-center mb-3">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>US: 12 credits (6 hrs) — $132 (~$22/hr)</span>
                    </li>
                    <li className="flex items-center mb-3">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Progress dashboard & priority booking</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>Test prep & ESL options</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <a className="block sm:inline-block py-4 px-6 mb-4 sm:mb-0 sm:mr-3 text-xs text-blue-500 font-semibold leading-none bg-white hover:bg-blueGray-50 rounded" href="#">
                    Start Free Trial
                  </a>
                  <a className="block sm:inline-block py-4 px-6 text-xs font-semibold leading-none border border-blue-400 hover:border-blue-400 rounded" href="#">
                    Purchase
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 px-3 mb-6">
              <div className="hover-up-5 pt-16 pb-8 px-4 text-center bg-white rounded shadow">
                <img className="h-20 mb-6 mx-auto" src="/vendor/monst/img/icons/enterprise.svg" alt="Family" />
                <h3 className="mb-2 text-4xl font-bold font-heading">Family</h3>
                <span className="text-4xl text-blue-500 font-bold font-heading">Save more — siblings & groups</span>
                <p className="mt-2 mb-8 text-blueGray-400">Bulk credits, shared</p>
                <div className="flex flex-col items-center mb-8">
                  <ul className="text-blueGray-400">
                    <li className="flex mb-3">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>US Family: 20 credits (10 hrs) — $180 (~$18/hr)</span>
                    </li>
                    <li className="flex mb-3">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>US Family Plus: 30 credits (15 hrs) — $450 (~$15/hr)</span>
                    </li>
                    <li className="flex">
                      <svg className="w-6 h-6 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>PH Family: 40 credits — ₱5,000 (₱125/credit)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <a className="block sm:inline-block py-4 px-6 mb-4 sm:mb-0 sm:mr-3 text-xs text-white text-center font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded" href="#">
                    Start Free Trial
                  </a>
                  <a className="block sm:inline-block py-4 px-6 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded" href="#">
                    Purchase
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-blueGray-400">
              1 credit = 30 minutes. Sessions available in 30 or 60 minutes. Credits roll over for up to 2 months (see FAQ for details).
            </p>
          </div>
        </div>
      </section>


      {/* Tutoring Highlights Section */}
      <section id="highlights" aria-labelledby="highlights-title" className="bg-[#F7FAFD]">
        <div className="mx-auto max-w-[1200px] px-6 py-20">
          {/* Header row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-500">Why families choose us</p>
              <h2 id="highlights-title" className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
                Smarter tutoring. Bigger impact.
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We provide personalized, high-quality tutoring for K–12 students and beyond.
              Sessions are flexible, engaging, and designed to boost confidence and performance.
            </p>
          </div>
          {/* Cards grid (must NOT be inside the header grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Interactive Learning */}
            <div className="bg-white rounded-3xl p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-[#EEF4FF] rounded-xl mb-6 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#2563EB]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Flexible Online Tutoring</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Credits-based booking with expert tutors.
              </p>
              <a href="/pricing" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Book Tutoring →
              </a>
            </div>
            {/* Card 2: Empower Others */}
            <div className="bg-white rounded-3xl p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-[#FEF3C7] rounded-xl mb-6 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-[#D97706]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Flexible Programs</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Test prep, homework support, and study skills.
              </p>
              <a href="/programs" className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                Learn More →
              </a>
            </div>
            {/* Card 3: Partner to Build */}
            <div className="bg-white rounded-3xl p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl mb-6 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[#9333EA]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Family-Focused Approach</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Supporting your child's academic journey.
              </p>
              <a href="/about" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                Our Philosophy →
              </a>
            </div>
            {/* Card 4: Building Community */}
            <div className="bg-white rounded-3xl p-8 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-[#ECFDF5] rounded-xl mb-6 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#10B981]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Proven Results</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Track progress and celebrate improvements.
              </p>
              <a href="/testimonials" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                Student Success →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors / Partner With Us Teaser Section */}
      <section id="sponsors-teaser" aria-labelledby="sponsors-title" className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-3xl bg-[#2563EB] text-white shadow-xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
            {/* Subtle reveal animation */}
            <div className="transition-all duration-700 ease-out opacity-100 translate-y-0">
              <h2 id="sponsors-title" className="text-2xl md:text-3xl font-bold mb-3">Partner With Us</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                At Smart Brain TLC’s Enroll One, Empower Two initiative, every enrollment funds an opportunity for another child. Whether you’re an individual, business, school, or foundation, we’ll customize a partnership that maximizes your impact.
              </p>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
                <article className="h-full rounded-2xl ring-1 ring-white/20 bg-white/5 backdrop-blur-sm p-6 md:p-7 shadow-sm hover:shadow-md hover:ring-white/40 transition">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 h-12 w-12 rounded-full bg-white/15 text-white grid place-content-center" aria-hidden="true">
                      {/* Heart icon */}
                      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z" /></svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg">Individuals &amp; Monthly Sponsorships</h3>
                    <p className="mt-2 text-white/90">Empower a child, lesson by lesson. One-time or monthly sponsorships with progress updates and a personal thank-you.</p>
                  </div>
                </article>
                <article className="h-full rounded-2xl ring-1 ring-white/20 bg-white/5 backdrop-blur-sm p-6 md:p-7 shadow-sm hover:shadow-md hover:ring-white/40 transition">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 h-12 w-12 rounded-full bg-white/15 text-white grid place-content-center" aria-hidden="true">
                      {/* Briefcase icon */}
                      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg">Corporate / Business Partners</h3>
                    <p className="mt-2 text-white/90">CSR-aligned packages and reporting. Showcase your commitment to education with visible impact.</p>
                  </div>
                </article>
                <article className="h-full rounded-2xl ring-1 ring-white/20 bg-white/5 backdrop-blur-sm p-6 md:p-7 shadow-sm hover:shadow-md hover:ring-white/40 transition">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 h-12 w-12 rounded-full bg-white/15 text-white grid place-content-center" aria-hidden="true">
                      {/* School icon */}
                      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10l9-5 9 5-9 5-9-5z"/><path d="M21 10v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"/><path d="M7 19a2 2 0 004 0"/></svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg">Schools &amp; Districts</h3>
                    <p className="mt-2 text-white/90">Bulk credits for students. Principals assign credits; receive usage and impact reports.</p>
                  </div>
                </article>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <a href="/sponsors" className="inline-flex h-11 px-6 items-center justify-center rounded-full bg-white text-[#2563EB] font-semibold hover:bg-slate-100 transition">Become a Partner Today</a>
                <a href="/contact?type=partner" className="inline-flex h-11 px-6 items-center justify-center rounded-full border border-white text-white font-semibold hover:bg-white/10 transition">Partner Inquiry Form</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutors — Join Our Team */}
      <section id="tutors-cta" className="py-20 bg-[#F7FAFD]">
        <div className="container mx-auto max-w-[1200px] px-6">
          {/* Header row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                Tutors — <span className="text-[#2563EB]">Join Our Team</span>
                <br className="hidden sm:block" />
              </h2>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-slate-500 leading-8">
                Teach with purpose. Enjoy flexible hours and competitive pay while helping
                under-resourced learners succeed.
              </p>
            </Reveal>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <Reveal delay={200}>
              <article className="relative pt-16 p-10 text-center rounded-[28px] bg-white shadow-xl ring-1 ring-slate-100 hover:shadow-2xl transition">
                {/* floating number badge */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-14 w-14 grid place-content-center rounded-full bg-[#E6EEFF] text-[#2563EB] text-xl font-bold shadow-md">
                  1
                </div>
                <LottieBlock
                  src="/animations/teacher-all-language.json"
                  title="Teach with Purpose"
                  className="mx-auto mb-6 overflow-hidden rounded-xl"
                  width={320}
                  height={320}
                />
                <h3 className="mb-3 text-2xl font-bold text-slate-900">Teach with Purpose</h3>
                <p className="text-slate-500 leading-relaxed max-w-[36ch] mx-auto">
                  Make a real impact each session with learners who need your expertise.
                </p>
              </article>
            </Reveal>

            {/* Card 2 */}
            <Reveal delay={350}>
              <article className="relative pt-16 p-10 text-center rounded-[28px] bg-white shadow-xl ring-1 ring-slate-100 hover:shadow-2xl transition">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-14 w-14 grid place-content-center rounded-full bg-[#E6EEFF] text-[#2563EB] text-xl font-bold shadow-md">
                  2
                </div>
                <LottieBlock
                  src="/animations/time.json"
                  title="Flexible Hours"
                  className="mx-auto mb-6 overflow-hidden rounded-xl"
                  width={320}
                  height={320}
                />
                <h3 className="mb-3 text-2xl font-bold text-slate-900">Flexible Hours</h3>
                <p className="text-slate-500 leading-relaxed max-w-[36ch] mx-auto">
                  Set a schedule that works for you—weekdays, weekends, or evenings.
                </p>
              </article>
            </Reveal>

            {/* Card 3 */}
            <Reveal delay={500}>
              <article className="relative pt-16 p-10 text-center rounded-[28px] bg-white shadow-xl ring-1 ring-slate-100 hover:shadow-2xl transition">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 h-14 w-14 grid place-content-center rounded-full bg-[#E6EEFF] text-[#2563EB] text-xl font-bold shadow-md">
                  3
                </div>
                <LottieBlock
                  src="/animations/two-businessmen.json"
                  title="Competitive Pay"
                  className="mx-auto mb-6 overflow-hidden rounded-xl"
                  width={320}
                  height={320}
                />
                <h3 className="mb-3 text-2xl font-bold text-slate-900">Competitive Pay</h3>
                <p className="text-slate-500 leading-relaxed max-w-[36ch] mx-auto">
                  Get paid reliably for every completed session with clear reporting.
                </p>
              </article>
            </Reveal>
          </div>

          {/* CTA row (unchanged) */}
          <div className="text-center mt-12">
            <a href="/tutors"
               className="inline-flex h-11 px-6 items-center justify-center rounded-full bg-[#2563EB] text-white font-medium hover:bg-[#1d4ed8] transition">
              Apply Now
            </a>
            <a href="/faq#tutors"
               className="inline-flex h-11 px-6 ml-3 items-center justify-center rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition">
              Tutor FAQ
            </a>
          </div>
        </div>
      </section>



      <TestimonialsCarousel />

      {/* FAQ Teaser Section */}
      <section id="faq-teaser" aria-labelledby="faq-title" className="py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-lg">Quick answers about credits, scheduling, and sponsorships.</p>
          </div>
          {/* Accordion */}
          <div className="space-y-4">
            <details className="group rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition open:shadow-md">
              <summary className="flex w-full items-center justify-between cursor-pointer px-5 py-4 md:px-6 md:py-5 text-left select-none">
                <span className="font-medium text-slate-900">What is a credit?</span>
                <svg className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div className="px-5 md:px-6 pt-0 pb-0 group-open:pb-5">
                <div className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr] group-open:grid-rows-[1fr]">
                  <div className="min-h-0">
                    <p className="text-slate-600 leading-relaxed">
                      One credit equals 30 minutes of tutoring. Sessions can be 30 or 60 minutes using 1 or 2 credits.
                    </p>
                  </div>
                </div>
              </div>
            </details>
            <details className="group rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition open:shadow-md">
              <summary className="flex w-full items-center justify-between cursor-pointer px-5 py-4 md:px-6 md:py-5 text-left select-none">
                <span className="font-medium text-slate-900">Do credits expire?</span>
                <svg className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div className="px-5 md:px-6 pt-0 pb-0 group-open:pb-5">
                <div className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr] group-open:grid-rows-[1fr]">
                  <div className="min-h-0">
                    <p className="text-slate-600 leading-relaxed">
                      Unused credits roll over for up to 2 months. See our full FAQ for details.
                    </p>
                  </div>
                </div>
              </div>
            </details>
            <details className="group rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition open:shadow-md">
              <summary className="flex w-full items-center justify-between cursor-pointer px-5 py-4 md:px-6 md:py-5 text-left select-none">
                <span className="font-medium text-slate-900">How do I book and schedule sessions?</span>
                <svg className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div className="px-5 md:px-6 pt-0 pb-0 group-open:pb-5">
                <div className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr] group-open:grid-rows-[1fr]">
                  <div className="min-h-0">
                    <p className="text-slate-600 leading-relaxed">
                      Choose a tutor and time that works for you; you’ll confirm using available credits. Rescheduling is flexible within the booking window.
                    </p>
                  </div>
                </div>
              </div>
            </details>
            <details className="group rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm transition open:shadow-md">
              <summary className="flex w-full items-center justify-between cursor-pointer px-5 py-4 md:px-6 md:py-5 text-left select-none">
                <span className="font-medium text-slate-900">Can I sponsor a student or partner with you?</span>
                <svg className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div className="px-5 md:px-6 pt-0 pb-0 group-open:pb-5">
                <div className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr] group-open:grid-rows-[1fr]">
                  <div className="min-h-0">
                    <p className="text-slate-600 leading-relaxed">
                      Yes—individuals and organizations can sponsor learners or partner with us. Visit the Sponsors page to get started.
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/faq" className="inline-flex h-11 px-6 items-center justify-center rounded-full bg-[#2563EB] text-white font-medium hover:bg-[#1d4ed8] transition">View All FAQs</a>
            <a href="/pricing" className="inline-flex h-11 px-6 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition">See Pricing &amp; Credits</a>
          </div> 
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;