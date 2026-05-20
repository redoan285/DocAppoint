'use client';
import { Award, MapPin, Star } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ইউজার চেক করুন (আপনার অথেন্টিকেশন সিস্টেম অনুযায়ী)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchAllDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ all-appointments এন্ডপয়েন্ট ব্যবহার করুন (যেটা আসলে সব ডাক্তার দেয়)
        const res = await fetch("http://localhost:5000/all-appointments");
        
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Received data:', data);
        
        // ব্যাকএন্ডের ডাটা স্ট্রাকচার অনুযায়ী ডাক্তার সেট করুন
        let doctorsList = [];
        
        if (data.success && Array.isArray(data.data)) {
          doctorsList = data.data;
        } else if (Array.isArray(data)) {
          doctorsList = data;
        } else if (data.doctors && Array.isArray(data.doctors)) {
          doctorsList = data.doctors;
        } else {
          doctorsList = [];
        }
        
        setDoctors(doctorsList);
        console.log(`✅ Loaded ${doctorsList.length} doctors`);
        
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.message);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDoctors();
  }, []);

  const handleDetailsClick = (doctorId) => {
    if (user) {
      router.push(`/appointments/${doctorId}`);
    } else {
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="text-slate-500">Loading doctors...</span>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <span className="text-teal-600 font-bold text-sm uppercase tracking-widest">
          Expert Practitioners
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
          All Medical Doctors
        </h1>
        <p className="text-slate-500 text-sm sm:text-base">
          Browse through our complete list of qualified and experienced medical professionals.
        </p>
        {doctors.length > 0 && (
          <p className="text-teal-600 font-semibold">Total {doctors.length} doctors available</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id || doctor.id} className="group overflow-hidden border border-slate-200/60 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full rounded-xl bg-white">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img 
                  src={doctor.image || 'https://via.placeholder.com/300x400?text=Doctor'} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Doctor';
                  }}
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

                <button
                  onClick={() => handleDetailsClick(doctor._id || doctor.id)}
                  className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl py-2.5 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-12 border border-dashed rounded-xl text-slate-400">
            <p>No doctors found in database.</p>
            <p className="text-xs mt-2">Please check your backend API at http://localhost:5000/all-appointments</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctors;