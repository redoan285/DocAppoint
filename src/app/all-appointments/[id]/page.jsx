'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Star, Award, MapPin, Phone, Mail, Calendar, Clock, ArrowLeft, Loader2 } from 'lucide-react';

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ইউজার চেক করুন
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // সব ডাক্তার থেকে নির্দিষ্ট ডাক্তার খুঁজে বের করা
        const res = await fetch("http://localhost:5000/all-appointments");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // ডাক্তারদের লিস্ট বের করা
        let doctorsList = [];
        if (data.success && Array.isArray(data.data)) {
          doctorsList = data.data;
        } else if (Array.isArray(data)) {
          doctorsList = data;
        } else if (data.doctors && Array.isArray(data.doctors)) {
          doctorsList = data.doctors;
        }
        
        // আইডি অনুযায়ী ডাক্তার খোঁজা
        const foundDoctor = doctorsList.find(doc => (doc._id === id || doc.id === id));
        
        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          setError("Doctor not found");
        }
        
      } catch (err) {
        console.error('Error fetching doctor details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  const handleBookAppointment = () => {
    if (user) {
      router.push(`/book-appointment/${id}`);
    } else {
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-3">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <span className="text-slate-500 font-medium">Loading doctor details...</span>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <p className="text-red-600 mb-4">⚠️ {error || "Doctor not found"}</p>
          <button 
            onClick={() => router.back()} 
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Doctors
        </button>

        {/* Doctor Details Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column - Image */}
            <div className="lg:col-span-1">
              <div className="relative h-96 lg:h-full">
                <img 
                  src={doctor.image || 'https://via.placeholder.com/600x800?text=Doctor'} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="font-semibold">{doctor.rating || '4.5'}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 p-8 lg:p-10">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-3">
                  {doctor.specialty || 'General Physician'}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                  Dr. {doctor.name}
                </h1>
                <p className="text-slate-500">{doctor.degree || 'MBBS, FCPS'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Award className="w-5 h-5 text-teal-600" />
                    <span><strong className="text-slate-800">Experience:</strong> {doctor.experience || '10+'} years</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <span><strong className="text-slate-800">Location:</strong> {doctor.location || 'Dhaka, Bangladesh'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-5 h-5 text-teal-600" />
                    <span><strong className="text-slate-800">Contact:</strong> {doctor.phone || '+880 1234 567890'}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <span><strong className="text-slate-800">Email:</strong> {doctor.email || `dr.${doctor.name?.toLowerCase().replace(/\s/g, '')}@example.com`}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <span><strong className="text-slate-800">Available Days:</strong> {doctor.availableDays || 'Sat - Thu'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <span><strong className="text-slate-800">Available Time:</strong> {doctor.availableTime || '10:00 AM - 8:00 PM'}</span>
                  </div>
                </div>
              </div>

              {/* About Doctor */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-3">About Doctor</h2>
                <p className="text-slate-600 leading-relaxed">
                  {doctor.bio || `Dr. ${doctor.name} is a highly experienced and compassionate ${doctor.specialty || 'medical professional'} dedicated to providing exceptional healthcare services. With over ${doctor.experience || '10'} years of experience, they specialize in diagnosing and treating various medical conditions with personalized care.`}
                </p>
              </div>

              {/* Consultation Fee & Booking */}
              <div className="bg-teal-50 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-slate-600 text-sm">Consultation Fee</p>
                    <p className="text-3xl font-bold text-teal-600">৳{doctor.fee || '1200'}</p>
                  </div>
                  <button
                    onClick={handleBookAppointment}
                    className="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;