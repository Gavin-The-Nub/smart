import React, { useEffect } from 'react';
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Reveal } from "../components/animations/Reveal";
import { Stagger } from "../components/animations/Stagger";
import studentsImage from "../assets/students-learning-together.jpg";

export default function About() {
  useEffect(() => {
    document.title = "About Us - Smart Brain TLC | Enroll One, Empower Two";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative -mt-24 pt-24">
        <div className="hidden lg:block absolute inset-0 w-1/2 ml-auto bg-blueGray-100 z-0" style={{ zIndex: "-1" }}></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-3">
            <div className="w-full lg:w-1/2 px-3">
              <div className="py-12">
                <Reveal>
                  <div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
                    <h1 className="text-3xl lg:text-5xl mb-4 font-bold font-heading">
                      Enroll One, <span className="text-blue-500">Empower Two</span>
                    </h1>
                    <p className="text-blueGray-400 leading-relaxed mb-4">
                      Smart Brain TLC Inc. is an accessible, online-first tutoring platform that provides students with affordable, high-quality instruction while giving back—when one student enrolls, another learner in need gets a tutorial for free.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={300}>
                  <div className="text-center lg:text-left">
                    <Button className="mr-4 mb-4 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg">
                      Book Tutoring
                    </Button>
                    <Button variant="outline" className="px-8 py-4 rounded-lg border-blueGray-200 text-blueGray-600 hover:border-blueGray-300">
                      Partner With Us
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-3 lg:bg-blueGray-10 mb-12 lg:mb-0 pb-10">
              <Reveal delay={600}>
                <div className="flex items-center justify-center">
                  <img
                    className="lg:max-w-lg w-full h-auto rounded-lg shadow-lg"
                    src={studentsImage}
                    alt="Students learning together"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-blueGray-50">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between max-w-2xl lg:max-w-full mb-12">
              <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">
                  <span>Our </span>
                  <span className="text-blue-500">Mission & Vision</span>
                </h2>
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-blueGray-400 leading-loose">
                  We believe quality education should be a right, not a privilege, and we're committed to making that vision a reality.
                </p>
              </div>
            </div>
          </Reveal>
          
          <Stagger baseDelay={300} step={200}>
            <div className="flex flex-wrap -mx-3 -mb-6 text-center">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <div className="p-12 bg-white shadow rounded hover:shadow-lg transition-shadow duration-300">
                  <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full mb-6">
                    🎯
                  </div>
                  <h3 className="mb-4 font-bold font-heading text-xl">Our Mission</h3>
                  <p className="text-sm text-blueGray-400 leading-relaxed">
                    To democratize education and empower communities by offering affordable tutoring and creating opportunities for underprivileged learners.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <div className="p-12 bg-white shadow rounded hover:shadow-lg transition-shadow duration-300">
                  <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full mb-6">
                    🌟
                  </div>
                  <h3 className="mb-4 font-bold font-heading text-xl">Our Vision</h3>
                  <p className="text-sm text-blueGray-400 leading-relaxed">
                    A global learning community where quality education is a right, not a privilege and to be a leading tutorial and learning center where one student's success creates a ripple effect, empowering others in the community.
                  </p>
                </div>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl mt-2 mb-4 font-bold font-heading">
                What <span className="text-blue-500">Drives Us</span>
              </h2>
              <p className="text-blueGray-400 leading-loose">
                These core values guide everything we do at Smart Brain TLC
              </p>
            </div>
          </Reveal>
          
          <Stagger baseDelay={400} step={150}>
            <div className="flex flex-wrap justify-center -mx-3">
              {[
                { value: "Empowerment", icon: "💪", description: "Enabling students to reach their full potential" },
                { value: "Equity", icon: "⚖️", description: "Ensuring fair access to quality education" },
                { value: "Integrity", icon: "🤝", description: "Honest and transparent in all our interactions" },
                { value: "Innovation", icon: "💡", description: "Continuously improving our teaching methods" },
                { value: "Community", icon: "🌍", description: "Building connections that last beyond tutoring" }
              ].map((item, index) => (
                <div key={item.value} className="w-1/2 md:w-1/3 lg:w-1/5 px-3 mb-8">
                  <div className="text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{item.value}</h3>
                    <p className="text-sm text-blueGray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-blueGray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center -mx-3">
            <div className="w-full lg:w-1/2 px-3 mb-12 lg:mb-0">
              <Reveal>
                <div className="max-w-lg">
                  <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl mb-4">
                    Our Story
                  </span>
                  <h2 className="text-3xl md:text-4xl mb-6 font-bold font-heading">
                    From <span className="text-blue-500">Idea</span> to Impact
                  </h2>
                  <p className="text-blueGray-400 leading-relaxed mb-6">
                    Founded with the belief that every student deserves access to quality education, Smart Brain TLC began as a simple idea: what if every lesson could create two opportunities?
                  </p>
                  <p className="text-blueGray-400 leading-relaxed mb-6">
                    Our founder recognized the gap between students who could afford private tutoring and those who couldn't. This sparked the creation of our "Enroll One, Empower Two" model, ensuring that education becomes a shared resource rather than an exclusive privilege.
                  </p>
                  <p className="text-blueGray-400 leading-relaxed">
                    Today, we continue to grow our community of learners, educators, and partners who believe in the power of education to transform lives and communities.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="w-full lg:w-1/2 px-3">
              <Reveal delay={400}>
                <div className="text-center">
                  <img
                    className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
                    src={studentsImage}
                    alt="Our founder's vision"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Ready to Join Our <span className="text-blue-500">Learning Community</span>?
              </h2>
              <p className="text-blueGray-400 leading-loose mb-8">
                Whether you're a student ready to learn, an educator wanting to teach, or a partner looking to make an impact, there's a place for you at Smart Brain TLC.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg">
                  Book Tutoring
                </Button>
                <Button variant="outline" className="px-8 py-4 rounded-lg border-blueGray-200 text-blueGray-600 hover:border-blueGray-300">
                  Partner With Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}