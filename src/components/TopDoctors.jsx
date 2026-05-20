'use client';
import React, { useState, useEffect } from 'react';
import { Loader2, Star, Award, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopDoctors() {
  const [topDoctors, setTopDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const user = null;

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        setError(null);
        console.log('Fetching doctors from backend...');
        
        const res = await fetch('http://localhost:5000/doctors');
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Received data:', data);
        
        // ✅ আপনার ব্যাকএন্ড যেভাবে ডেটা দিচ্ছে সেভাবে অ্যাক্সেস করুন
        if (data.success && Array.isArray(data.data)) {
          setTopDoctors(data.data);
          console.log(`✅ Loaded ${data.data.length} doctors`);
        } else {
          console.error('Unexpected data format:', data);
          setTopDoctors([]);
        }
        
      } catch (err) {
        console.error('Error fetching top doctors:', err);
        setError(err.message);
        setTopDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopDoctors();
  }, []);

  const handleDetailsClick = (doctorId) => {
    if (user) {
      router.push(`/appointments/${doctorId}`);
    } else {
      router.push('/login');
    }
  };

  if (error) {
    return (
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-sm uppercase tracking-widest">
            Expert Practitioners
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            Top Rated Medical Doctors
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 dark:text-red-400 mb-4">⚠️ {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-teal-600 dark:text-teal-400 font-bold text-sm uppercase tracking-widest">
          Expert Practitioners
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
          Top Rated Medical Doctors
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Consult with highly professional, pre-screened specialists who have received top reviews.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
          <span className="text-slate-500 font-medium">Loading premium doctors...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topDoctors.length > 0 ? (
            topDoctors.map((doctor) => (
              <div key={doctor._id} className="group overflow-hidden border border-slate-200/60 dark:border-slate-800/80 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full rounded-xl bg-white dark:bg-slate-900">
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={doctor.image || 'https://via.placeholder.com/300x400?text=No+Image'} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 dark:bg-slate-900/95 dark:text-white shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    {doctor.rating || '৪.৫'}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-1 rounded-md">
                      {doctor.specialty || 'জেনারেল ফিজিশিয়ান'}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {doctor.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-y-1.5 pt-2 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-teal-500" />
                        <span>{doctor.experience || '৫ বছর'} Exp</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-500" />
                        <span>{doctor.location?.split(',')[0] || 'ঢাকা'}</span>
                      </div>
                      <div className="flex items-center gap-1 col-span-2">
                        <span className="font-bold text-teal-600 dark:text-teal-400 text-sm">৳{doctor.fee || '১০০০'}</span>
                        <span>Consultation Fee</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDetailsClick(doctor._id)}
                    className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl py-2.5 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 border border-dashed rounded-xl text-slate-400">
              No top-rated doctors found in database.
            </div>
          )}
        </div>
      )}
    </section>
  );
}