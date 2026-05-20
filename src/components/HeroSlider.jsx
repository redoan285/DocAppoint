'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, HeartPulse } from 'lucide-react';

const heroSlides = [
  {
    title: "Your Health Journey, Guided by Top Specialists",
    subtitle: "Find, review, and schedule consults with high-rated medical practitioners inside Dhaka within minutes.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    badge: "Premier Clinical Booking Platform"
  },
  {
    title: "Instantly Book Heart & Neurological Consultation Sessions",
    subtitle: "Skip long telephone queues. Experience a fully unified CRUD appointment booking panel tailored to your schedules.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format",
    badge: "24/7 Verified Doctor Availability"
  },
  {
    title: "Transparent Care with Genuine Patient Reviews",
    subtitle: "Read validated feedback before finalizing appointments. Cancel or update slot details in just a single click.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    badge: "Patients First Architecture"
  }
];

export default function HeroSlider({ user }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-3xl min-h-[500px] flex items-center shadow-xl">
      {/* ইমেজ ব্যাকগ্রাউন্ড - কোনো ওভারলে ছাড়া */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroSlides[currentSlide].image}
          alt="Hero"
          className="w-full h-full object-cover object-center transition-all duration-1000 ease-in-out transform scale-105"
        />
        {/* খুব হালকা গ্রেডিয়েন্ট ওভারলে - শুধু টেক্সট পড়ার সুবিধার জন্য */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl px-8 sm:px-12 lg:px-16 py-16 space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 backdrop-blur-sm">
          <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
          {heroSlides[currentSlide].badge}
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
          {heroSlides[currentSlide].title}
        </h1>

        <p className="text-base sm:text-lg text-gray-100 max-w-xl font-normal leading-relaxed drop-shadow-md">
          {heroSlides[currentSlide].subtitle}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/appointments"
            className="btn bg-teal-500 hover:bg-teal-600 text-white px-6 font-semibold flex items-center gap-2 rounded-xl transition-all duration-300 shadow-lg"
          >
            Browse Doctors
            <ArrowRight className="w-4 h-4" />
          </Link>

          {!user && (
            <Link
              href="/register"
              className="btn btn-outline border-white/30 hover:bg-white/10 text-white px-6 rounded-xl backdrop-blur-sm"
            >
              Join Platform
            </Link>
          )}
        </div>
      </div>

      {/* স্লাইডার ডটস */}
      <div className="absolute bottom-6 right-8 sm:right-12 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-teal-400 w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}