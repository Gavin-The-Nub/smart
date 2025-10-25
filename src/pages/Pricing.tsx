import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger } from "@/components/animations/Stagger";
import { Check } from "lucide-react";
import studentsLearningImage from "../assets/students-learning-together.jpg";

const CheckIcon = () => <Check className="w-5 h-5 text-green-500" />;

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"us" | "ph">("us");
  const [purchaseMsg, setPurchaseMsg] = useState<string | null>(null);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Pricing & Credits — Smart Brain TLC";
  }, []);

  const plans = {
    us: [
      {
        name: "Starter",
        price: "$75",
        credits: "6 credits",
        duration: "≈ 3 hrs",
        description: "Best for trial or short-term",
        features: [
          "1:1 tutoring — 30 or 60 minutes",
          "Flexible scheduling",
          "Great for refreshers",
        ],
        isPopular: false,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
      {
        name: "Standard",
        price: "$132",
        credits: "12 credits",
        duration: "≈ 6 hrs",
        description: "Best for ongoing support",
        features: [
          "Priority booking & progress dashboard",
          "Test prep & ESL options",
          "Ideal weekly plan",
        ],
        isPopular: true,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
      {
        name: "Family",
        price: "$180",
        credits: "20 credits",
        duration: "≈ 10 hrs",
        description: "Great for long-term or siblings",
        features: [
          "Shareable for siblings",
          "Save more per hour",
          "Flexible scheduling",
        ],
        isPopular: false,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
      {
        name: "Family Plus",
        price: "$450",
        credits: "30 credits",
        duration: "≈ 15 hrs",
        description: "Maximum savings for active learners",
        features: [
          "Best per-hour rate",
          "Extended study plans",
          "Progress reporting",
        ],
        isPopular: false,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
    ],
    ph: [
      {
        name: "Starter",
        price: "₱750",
        credits: "5 credits",
        duration: "",
        description: "Best for trial or short-term",
        features: [
          "1:1 tutoring — 30 or 60 minutes",
          "Flexible scheduling",
          "Great for refreshers",
        ],
        isPopular: false,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
      {
        name: "Standard",
        price: "₱1,400",
        credits: "10 credits",
        duration: "",
        description: "Best for ongoing support",
        features: [
          "Priority booking & progress dashboard",
          "Test prep & ESL options",
          "Ideal weekly plan",
        ],
        isPopular: true,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
      {
        name: "Family",
        price: "₱2,700",
        credits: "20 credits",
        duration: "",
        description: "Great for long-term or siblings",
        features: [
          "Shareable for siblings",
          "Save more per hour",
          "Flexible scheduling",
        ],
        isPopular: false,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
      {
        name: "Family Plus",
        price: "₱5,000",
        credits: "40 credits",
        duration: "",
        description: "Maximum savings for families",
        features: [
          "Best per-hour rate",
          "Extended study plans",
          "Progress reporting",
        ],
        isPopular: false,
        primaryCta: "Buy Credits",
        secondaryCta: "How credits work",
      },
    ],
  };

  const currentPlans = plans[activeTab];

  const handleDemoPurchase = (planName: string) => {
    setPurchaseMsg(null);
    setPurchasingId(planName);

    // Mock purchase for frontend-only development
    setTimeout(() => {
      setPurchaseMsg(
        `Demo: ${planName} plan selected! This would redirect to payment in a real app.`
      );
      setPurchasingId(null);
    }, 1000);
  };

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
                    Pricing & <span className="text-blue-500">Credits</span>
                  </h1>
                  <p className="text-blueGray-400 leading-relaxed mb-8 wow animate__animated animate__fadeIn text-lg">
                    Buy credits to book tutoring sessions that fit your child's
                    needs. Every enrollment helps fund sponsorships for learners
                    in need.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right Image with Corner Holders */}
            <div className="flex-1 relative">
              <div className="relative max-w-lg mx-auto">
                <Reveal delay={200}>
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
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="flex justify-center mb-16">
              <div className="inline-flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("us")}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === "us"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  United States
                </button>
                <button
                  onClick={() => setActiveTab("ph")}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === "ph"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Philippines
                </button>
              </div>
            </div>
          </Reveal>

          {/* Pricing Cards */}
          <Stagger baseDelay={100} step={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentPlans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    plan.isPopular
                      ? "bg-[#2563EB] text-white shadow-xl hover:shadow-2xl"
                      : "bg-white ring-1 ring-slate-200"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-[#2563EB] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        plan.isPopular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <div
                      className={`text-4xl font-bold mb-1 ${
                        plan.isPopular ? "text-white" : "text-[#2563EB]"
                      }`}
                    >
                      {plan.price}
                    </div>
                    <div
                      className={`text-lg font-medium mb-1 ${
                        plan.isPopular ? "text-blue-100" : "text-slate-600"
                      }`}
                    >
                      {plan.credits}
                    </div>
                    {plan.duration && (
                      <div
                        className={`text-sm mb-4 ${
                          plan.isPopular ? "text-blue-100" : "text-slate-500"
                        }`}
                      >
                        {plan.duration}
                      </div>
                    )}
                    <p
                      className={`text-sm mb-8 ${
                        plan.isPopular ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      {plan.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckIcon />
                          <span
                            className={`text-sm ${
                              plan.isPopular ? "text-white" : "text-slate-600"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleDemoPurchase(plan.name)}
                        disabled={purchasingId === plan.name}
                        className={`block w-full py-3 px-6 text-sm font-semibold rounded-lg transition-colors ${
                          plan.isPopular
                            ? "bg-white text-[#2563EB] hover:bg-slate-50"
                            : "bg-[#2563EB] text-white hover:bg-[#1d4ed8]"
                        }`}
                      >
                        {purchasingId === plan.name
                          ? "Processing..."
                          : plan.primaryCta}
                      </button>
                      <a
                        href="/faq#credits"
                        className={`block w-full py-3 px-6 text-sm font-medium rounded-lg transition-colors ${
                          plan.isPopular
                            ? "border border-blue-400 text-white hover:bg-blue-600/20"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {plan.secondaryCta}
                      </a>
                      {purchaseMsg && (
                        <div className="text-xs text-center text-green-700">
                          {purchaseMsg}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="max-w-lg mb-16">
              <h2 className="mb-4 text-3xl lg:text-4xl font-bold font-heading text-slate-900">
                <span>Compare </span>
                <span className="text-[#2563EB]">plans </span>
                <span>and features</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-500">
                Find the perfect plan for your learning journey
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-slate-900">
                        Features
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-900">
                        Starter
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-white bg-[#2563EB]">
                        Standard
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-900">
                        Family
                      </th>
                      <th className="text-center py-4 px-6 font-semibold text-slate-900">
                        Family Plus
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-4 px-6 text-slate-600">
                        Session length options
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center bg-blue-50">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-600">
                        Priority booking
                      </td>
                      <td className="py-4 px-6 text-center">-</td>
                      <td className="py-4 px-6 text-center bg-blue-50">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-600">
                        Progress dashboard
                      </td>
                      <td className="py-4 px-6 text-center">-</td>
                      <td className="py-4 px-6 text-center bg-blue-50">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-600">
                        Shareable credits
                      </td>
                      <td className="py-4 px-6 text-center">-</td>
                      <td className="py-4 px-6 text-center bg-blue-50">-</td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-slate-600">Best for</td>
                      <td className="py-4 px-6 text-center text-slate-500 text-sm">
                        Trial runs
                      </td>
                      <td className="py-4 px-6 text-center text-slate-500 text-sm bg-blue-50">
                        Weekly sessions
                      </td>
                      <td className="py-4 px-6 text-center text-slate-500 text-sm">
                        Multiple students
                      </td>
                      <td className="py-4 px-6 text-center text-slate-500 text-sm">
                        Heavy usage
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footnote */}
      <section className="py-10 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <p className="text-sm text-slate-500 text-center">
              1 credit = 30 minutes. Sessions available in 30 or 60 minutes.
              Unused credits roll up to 2 months.
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
