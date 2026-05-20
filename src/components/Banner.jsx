export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-cyan-300 blur-3xl"></div>
      </div>

      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-10 px-6 py-20 lg:flex-row lg:px-16">
        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-md">
            Trusted Healthcare Platform
          </span>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Book Your Doctor Appointment
            <span className="block text-cyan-200">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="mb-8 text-lg text-gray-100 md:text-xl">
            Connect with experienced doctors, schedule appointments instantly,
            and manage your healthcare online with ease.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button className="rounded-xl bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-lg transition duration-300 hover:scale-105 hover:bg-cyan-100">
              Get Appointment
            </button>

            <button className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-lg font-semibold backdrop-blur-md transition duration-300 hover:bg-white/20">
              Explore Doctors
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-sm text-gray-200">Professional Doctors</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-sm text-gray-200">Support Service</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">10k+</h3>
              <p className="text-sm text-gray-200">Happy Patients</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-cyan-300 opacity-30 blur-3xl"></div>

          <img
            src="https://i.ibb.co.com/jv3w6xB/doctor-banner.png"
            alt="Doctor"
            className="relative z-10 w-[320px] drop-shadow-2xl md:w-[450px]"
          />
        </div>
      </div>
    </section>
  );
}









// 'use client';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import Link from 'next/link';

// // Swiper CSS import
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// export default function Banner() {
  
//   const slides = [
//     {
//       id: 1,
//       title: 'Book Your Health Journey',
//       subtitle: 'Connect with top doctors instantly',
//       bgColor: 'from-blue-500 to-purple-600',
//       buttonText: 'Explore Doctors',
//       buttonLink: '/appointments'
//     },
//     {
//       id: 2,
//       title: 'Quality Healthcare at Your Fingertips',
//       subtitle: '24/7 Online Appointment Booking',
//       bgColor: 'from-green-500 to-teal-600',
//       buttonText: 'Book Now',
//       buttonLink: '/appointments'
//     },
//     {
//       id: 3,
//       title: 'Expert Doctors, Better Care',
//       subtitle: '1000+ Happy Patients Trust Us',
//       bgColor: 'from-orange-500 to-red-600',
//       buttonText: 'Get Started',
//       buttonLink: '/register'
//     }
//   ];

//   return (
//     <div className="relative h-[500px] md:h-[600px] w-full">
//       <Swiper
//         modules={[Autoplay, Pagination, Navigation]}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//           dynamicBullets: true,
//         }}
//         navigation={true}
//         loop={true}
//         className="h-full w-full"
//       >
//         {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div className={`bg-gradient-to-r ${slide.bgColor} h-full w-full flex items-center justify-center`}>
//               <div className="text-center text-white px-6">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">
//                   {slide.title}
//                 </h1>
//                 <p className="text-lg md:text-xl mb-8 opacity-90">
//                   {slide.subtitle}
//                 </p>
//                 <Link
//                   href={slide.buttonLink}
//                   className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
//                 >
//                   {slide.buttonText}
//                 </Link>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
      
//       {/* Custom Styles for Swiper */}
//       <style jsx global>{`
//         .swiper-button-next,
//         .swiper-button-prev {
//           color: white !important;
//           background: rgba(0,0,0,0.3);
//           width: 40px !important;
//           height: 40px !important;
//           border-radius: 50%;
//         }
//         .swiper-button-next:hover,
//         .swiper-button-prev:hover {
//           background: rgba(0,0,0,0.6);
//         }
//         .swiper-pagination-bullet {
//           background: white !important;
//         }
//         .swiper-pagination-bullet-active {
//           background: #3b82f6 !important;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }