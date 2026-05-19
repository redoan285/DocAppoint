'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';

// Swiper CSS import
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Banner() {
  
  const slides = [
    {
      id: 1,
      title: 'Book Your Health Journey',
      subtitle: 'Connect with top doctors instantly',
      bgColor: 'from-blue-500 to-purple-600',
      buttonText: 'Explore Doctors',
      buttonLink: '/appointments'
    },
    {
      id: 2,
      title: 'Quality Healthcare at Your Fingertips',
      subtitle: '24/7 Online Appointment Booking',
      bgColor: 'from-green-500 to-teal-600',
      buttonText: 'Book Now',
      buttonLink: '/appointments'
    },
    {
      id: 3,
      title: 'Expert Doctors, Better Care',
      subtitle: '1000+ Happy Patients Trust Us',
      bgColor: 'from-orange-500 to-red-600',
      buttonText: 'Get Started',
      buttonLink: '/register'
    }
  ];

  return (
    <div className="relative h-[500px] md:h-[600px] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`bg-gradient-to-r ${slide.bgColor} h-full w-full flex items-center justify-center`}>
              <div className="text-center text-white px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Styles for Swiper */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0,0,0,0.3);
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0,0,0,0.6);
        }
        .swiper-pagination-bullet {
          background: white !important;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}