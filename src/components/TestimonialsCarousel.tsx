import React, { useState, useEffect } from 'react';

interface TestimonialSlide {
  id: number;
  image: string;
  title: string;
  company: string;
  alt: string;
  rating: number;
}

const testimonialSlides: TestimonialSlide[] = [
  {
    id: 1,
    image: "/vendor/monst/img/placeholders/img-1.png",
    title: "“Confidence and grades went up fast.”",
    company: "Alicia R. · Austin, TX",
    alt: "Parent reviewing progress charts",
    rating: 4.8
  },
  {
    id: 2,
    image: "/vendor/monst/img/placeholders/img-2.jpg",
    title: "“Scheduling is flexible, results are real.”",
    company: "Harvey M. · San Diego, CA",
    alt: "Student showing progress report",
    rating: 4.7
  },
  {
    id: 3,
    image: "/vendor/monst/img/placeholders/img-3.jpg",
    title: "“Our son finally enjoys studying again.”",
    company: "Kim L. · Seattle, WA",
    alt: "Student smiling with books",
    rating: 5
  },
  {
    id: 4,
    image: "/vendor/monst/img/placeholders/img-4.jpg",
    title: "“Tutors are patient and really skilled.”",
    company: "Deena P. · Denver, CO",
    alt: "Tutor helping student",
    rating: 4.9
  }
];

// Star and Stars components for ratings
const Star = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="currentColor"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-1" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="h-4 w-4 text-[#2563EB]" />
      ))}
      {half === 1 && (
        <span className="relative inline-block h-4 w-4">
          <Star className="absolute inset-0 h-4 w-4 text-slate-300" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="h-4 w-4 text-[#2563EB]" />
          </span>
        </span>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 text-slate-300" />
      ))}
    </div>
  );
}

export const TestimonialsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialSlides.length) % testimonialSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getTransformValue = () => {
    const slideWidth = isDesktop ? 50 : 100;
    return `-${currentSlide * slideWidth}%`;
  };

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left column: heading */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              What Families say about <span className="text-[#2563EB]">Smart Brain</span>
            </h2>
            <p className="mt-6 text-slate-500 leading-8 max-w-[36ch]">
              Real stories from parents and learners who improved confidence, grades, and study habits with our tutors.
            </p>
          </div>

          {/* Right column: carousel */}
          <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: "0.2s"}}>
            {/* Carousel viewport */}
            <div className="overflow-hidden">
              <div 
                className="flex gap-8 transition-transform duration-500 ease-out"
                style={{transform: `translateX(${getTransformValue()})`}}
              >
                {testimonialSlides.map((slide) => (
                  <article 
                    key={slide.id}
                    className="w-full lg:w-1/2 shrink-0 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-6"
                  >
                    <div className="overflow-hidden rounded-xl">
                      <img 
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-[320px] object-cover"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{slide.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{slide.company}</p>
                      </div>
                      <Stars value={slide.rating ?? 5} />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button 
                type="button" 
                aria-label="Previous testimonial" 
                className="h-9 w-9 grid place-content-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-300"
                onClick={prevSlide}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <div className="flex items-center gap-2">
                {testimonialSlides.map((_, index) => (
                  <button 
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentSlide 
                        ? 'bg-[#2563EB] scale-125' 
                        : 'bg-slate-300 scale-100'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                type="button" 
                aria-label="Next testimonial" 
                className="h-9 w-9 grid place-content-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all duration-300"
                onClick={nextSlide}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};