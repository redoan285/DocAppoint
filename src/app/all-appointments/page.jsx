'use client';
import React, { useState, useEffect } from 'react';
import { Loader2, Star, Award, MapPin, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ সব ডাক্তার আনার জন্য এন্ডপয়েন্ট
        const res = await fetch('http://localhost:5000/all-appointments');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Received data:', data);
        
        // ডাটা স্ট্রাকচার অনুযায়ী অ্যাক্সেস
        let doctorsList = [];
        if (data.success && Array.isArray(data.data)) {
          doctorsList = data.data;
        } else if (Array.isArray(data)) {
          doctorsList = data;
        } else {
          doctorsList = [];
        }
        
        setDoctors(doctorsList);
        console.log(`✅ Loaded ${doctorsList.length} doctors`);
        
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllDoctors();
  }, []);

  // সার্চ ফিল্টার
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">
            Expert Practitioners
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
            Our Medical Doctors
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 mb-4">⚠️ {error}</p>
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
        <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">
          Expert Practitioners
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
          All Medical Doctors
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Browse through our complete list of qualified and experienced medical professionals.
        </p>
      </div>

      {/* সার্চ বার */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, specialty, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
          <span className="text-slate-500 font-medium">Loading doctors...</span>
        </div>
      ) : (
        <>
          <div className="text-right text-sm text-slate-500">
            Total {filteredDoctors.length} doctors found
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor._id} className="group overflow-hidden border border-slate-200/60 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full rounded-xl bg-white">
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={doctor.image || 'https://via.placeholder.com/300x400?text=Doctor'} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      {doctor.rating || '4.5'}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">
                        {doctor.specialty || 'General Physician'}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                        {doctor.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-y-1.5 pt-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-teal-500" />
                          <span>{doctor.experience || '5 years'} Exp</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal-500" />
                          <span>{doctor.location?.split(',')[0] || 'Dhaka'}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2">
                          <span className="font-bold text-teal-600 text-sm">৳{doctor.fee || '1000'}</span>
                          <span>Consultation Fee</span>
                        </div>
                      </div>
                    </div>

                    {/* ✅ ঠিক করা Link - শুধু একটি className থাকবে */}
                    <Link
                      href={`/all-appointments/${doctor._id}`}
                      className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl py-2.5 text-center transition-colors block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 border border-dashed rounded-xl text-slate-400">
                No doctors found matching your search.
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
