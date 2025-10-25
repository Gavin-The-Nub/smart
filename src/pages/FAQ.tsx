import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Reveal } from '../components/animations/Reveal';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQTab {
  label: string;
  items: FAQItem[];
}

const faqData: FAQTab[] = [
  {
    label: "Parents",
    items: [
      {
        question: "How do credits work?",
        answer: "1 credit = 30 minutes. Credits can be used for 30 or 60 minute sessions. You can reschedule ≥24 hours before a session for a credit refund."
      },
      {
        question: "What session lengths do you support?",
        answer: "30 or 60 minutes (with flexible options like 45/90 if needed)."
      },
      {
        question: "Do credits expire?",
        answer: "Credits expire after 2 months."
      },
      {
        question: "How are reminders handled?",
        answer: "Email/SMS reminders are sent 24 hours and 1 hour before sessions."
      }
    ]
  },
  {
    label: "Sponsors",
    items: [
      {
        question: "How does sponsorship work?",
        answer: "A portion of paid enrollments funds our sponsorship pool. Sponsors can send a moderated welcome message at checkout and receive anonymized updates."
      },
      {
        question: "Will the sponsored student's photo be public?",
        answer: "Only with explicit parental consent; otherwise we share anonymized photos, work samples, or tutor summaries."
      },
      {
        question: "Can I contact a student directly?",
        answer: "Direct contact isn't allowed. Communication happens through moderated letters and platform updates."
      }
    ]
  },
  {
    label: "Tutors",
    items: [
      {
        question: "What happens if a student no-shows?",
        answer: "Credits are deducted if a student misses without notice; if a tutor cancels, credits are fully refunded."
      },
      {
        question: "Maximum daily sessions?",
        answer: "Students can book multiple sessions per day, with platform safeguards to avoid tutor burnout."
      }
    ]
  },
  {
    label: "Partners",
    items: [
      {
        question: "What reporting do partners receive?",
        answer: "Impact metrics such as total credits received/used, sessions completed, and progress summaries."
      }
    ]
  },
  {
    label: "Schools",
    items: [
      {
        question: "How do school credits and assignments work?",
        answer: "Sponsors can assign credits to a school; principals receive credits, assign to students, and track usage via dashboards with reporting."
      }
    ]
  }
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(0);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

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
                  Frequently Asked <span className="text-blue-600">Questions</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Find answers to common questions about our tutoring services, sponsorship programs, and partnerships.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            {/* Tabs */}
            <Reveal>
              <div className="flex flex-wrap gap-2 mb-12 justify-center">
                {faqData.map((tab, index) => (
                  <button
                    key={tab.label}
                    onClick={() => {
                      setActiveTab(index);
                      setOpenItems(new Set()); // Reset open items when switching tabs
                    }}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* FAQ Items */}
            <div className="max-w-4xl mx-auto">
              <Reveal delay={300}>
                <div className="space-y-4">
                  {faqData[activeTab].items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h3 className="font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                            openItems.has(index) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-5">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}