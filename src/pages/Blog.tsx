import React from 'react';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, ArrowRight, BookOpen, Heart, Users, Star, TrendingUp } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Proven Study Techniques That Boost Student Performance",
    excerpt: "Discover evidence-based learning strategies that help students retain information better and improve their academic outcomes.",
    category: "Learning Tips",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: "/vendor/monst/img/placeholders/img-1.png",
    icon: BookOpen
  },
  {
    id: 2,
    title: "Breaking Down Educational Barriers: Our Mission in Action",
    excerpt: "How Smart Brain TLC is making quality education accessible to underserved communities through innovative sponsorship programs.",
    category: "Education Equity",
    date: "December 10, 2024",
    readTime: "8 min read",
    image: "/vendor/monst/img/placeholders/img-2.jpg",
    icon: Heart
  },
  {
    id: 3,
    title: "From Struggle to Success: Maria's Transformation Story",
    excerpt: "A sponsor shares how their contribution helped transform a student's academic journey and opened doors to new opportunities.",
    category: "Sponsor Stories",
    date: "December 8, 2024",
    readTime: "6 min read",
    image: "/vendor/monst/img/placeholders/img-3.jpg",
    icon: Star
  },
  {
    id: 4,
    title: "Meet Sarah: The Tutor Making Math Fun for Elementary Students",
    excerpt: "Get to know one of our dedicated tutors who's helping young learners develop confidence in mathematics through creative teaching methods.",
    category: "Tutor Spotlights",
    date: "December 5, 2024",
    readTime: "4 min read",
    image: "/vendor/monst/img/placeholders/img-4.jpg",
    icon: Users
  },
  {
    id: 5,
    title: "Building Executive Function Skills in Middle School Students",
    excerpt: "Learn practical strategies to help students develop time management, planning, and organizational skills that last a lifetime.",
    category: "Learning Tips",
    date: "December 3, 2024",
    readTime: "7 min read",
    image: "/vendor/monst/img/placeholders/img-5.jpg",
    icon: BookOpen
  },
  {
    id: 6,
    title: "Q3 Impact Report: 1,200 Students Reached, 500 Sponsored Sessions",
    excerpt: "See the numbers behind our mission: detailed statistics on student progress, sponsorship impact, and community growth.",
    category: "Impact Reports",
    date: "November 30, 2024",
    readTime: "10 min read",
    image: "/vendor/monst/img/placeholders/img-6.jpg",
    icon: TrendingUp
  }
];

const CATEGORIES = [
  { name: "Learning Tips", color: "bg-blue-100 text-blue-800", icon: BookOpen },
  { name: "Education Equity", color: "bg-green-100 text-green-800", icon: Heart },
  { name: "Sponsor Stories", color: "bg-purple-100 text-purple-800", icon: Star },
  { name: "Tutor Spotlights", color: "bg-orange-100 text-orange-800", icon: Users },
  { name: "Impact Reports", color: "bg-pink-100 text-pink-800", icon: TrendingUp }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Blog & Resources
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Explore resources, tips, and stories from Smart Brain TLC. Discover insights on education, learning strategies, and our impact on communities.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Badge 
                    key={category.name}
                    variant="secondary"
                    className={`${category.color} px-4 py-2 rounded-full font-medium cursor-pointer hover:scale-105 transition-transform flex items-center gap-2`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.name}
                  </Badge>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, index) => {
              const IconComponent = post.icon;
              const categoryData = CATEGORIES.find(cat => cat.name === post.category);
              
              return (
                <Reveal key={post.id} delay={index * 100}>
                  <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                    {/* Post Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge 
                          variant="secondary"
                          className={`${categoryData?.color} px-3 py-1 rounded-full font-medium flex items-center gap-1.5`}
                        >
                          <IconComponent className="w-3 h-3" />
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>

                      <h2 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <button className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <Reveal delay={100}>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                Stay Updated
              </h2>
              
              <p className="text-slate-600 mb-8">
                Subscribe to our newsletter for the latest educational resources, success stories, and updates from Smart Brain TLC.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  Subscribe
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