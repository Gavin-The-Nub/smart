import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Target, Clock, Brain } from 'lucide-react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Reveal } from '../components/animations/Reveal';
import { Stagger } from '../components/animations/Stagger';

const services = [
  {
    icon: BookOpen,
    title: "1:1 Tutoring",
    description: "Personalized sessions, 30 and 60 minutes. ESL support available for English language learners.",
    features: ["Customized curriculum", "Real-time progress tracking", "Flexible scheduling", "ESL specialization"]
  },
  {
    icon: Users,
    title: "Small Group Sessions",
    description: "Collaborative learning for 5–10 students (2 credits or 1 hr class). Perfect for peer interaction.",
    features: ["Collaborative learning", "Peer interaction", "Cost-effective", "Social learning environment"]
  },
  {
    icon: Target,
    title: "Test Prep",
    description: "SAT, ACT, local exams. Comprehensive preparation with proven strategies and practice materials.",
    features: ["SAT & ACT prep", "Local exam support", "Practice tests", "Strategy sessions"]
  },
  {
    icon: Clock,
    title: "Homework Help & Study Skills",
    description: "Build lifelong learning habits. Support with daily assignments and developing effective study techniques.",
    features: ["Daily homework support", "Study skill development", "Time management", "Academic planning"]
  },
  {
    icon: Brain,
    title: "Executive Function Coaching",
    description: "Time management, planning, focus. Essential skills for academic and personal success.",
    features: ["Time management", "Organization skills", "Focus training", "Planning strategies"]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/vendor/monst/img/backgrounds/intersect.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="text-center">
              <Reveal>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Our <span className="text-blue-600">Services</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  We provide personalized, high-quality tutoring for K–12 students and beyond. 
                  Sessions are flexible, engaging, and designed to boost confidence and performance.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" baseDelay={100} step={100}>
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.title} className="group">
                    <div className="h-full bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-300">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-500">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have improved their academic performance with our expert tutoring services.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-300"
                >
                  Book Tutoring
                </Link>
                <Link
                  to="/sponsors"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  Partner With Us
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}