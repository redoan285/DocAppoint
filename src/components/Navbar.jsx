'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🏥 DocAppoint
        </Link>
        
        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/appointments" className="hover:text-blue-600">All Appointments</Link>
          <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        </div>
        
        {/* Login/Register Buttons */}
        <div className="flex gap-4">
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Login
          </Link>
          <Link href="/register" className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg">
            Register
          </Link>
        </div>
        
      </div>
    </nav>
  );
}