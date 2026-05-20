'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope, Sun, Moon, Menu, X, LogOut, LayoutDashboard, CalendarRange } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // Static theme state
  const [user, setUser] = useState(null); // Static user state (null = not logged in)

  const isActive = (path) => pathname === path;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Appointments', path: '/appointments' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent'
            }`}>
              DocAppoint
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? theme === 'dark'
                      ? 'text-teal-400 font-semibold'
                      : 'text-teal-600 font-semibold'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:text-teal-400'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Controls & Theme Buttons */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-colors duration-200 ${
                theme === 'dark'
                  ? 'border-slate-800 text-slate-400 hover:bg-slate-900'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-teal-600" />}
            </button>

            {/* Session Actions - Static (No user logged in) */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              <Link href="/login" className={`btn btn-sm btn-ghost font-medium px-4 py-2 h-auto min-h-0 rounded-lg ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
              }`}>
                Login
              </Link>
              <Link 
                href="/register" 
                className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 h-auto min-h-0 border-none rounded-lg shadow-sm shadow-teal-500/10"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile Menu Action Icon */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-teal-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className={`md:hidden py-4 px-6 space-y-4 shadow-xl ${
          theme === 'dark' ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'
        }`}>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 rounded-lg px-3 transition-colors ${
                  isActive(link.path)
                    ? theme === 'dark'
                      ? 'bg-teal-950/30 text-teal-400 font-semibold'
                      : 'bg-teal-50 text-teal-600 font-semibold'
                    : theme === 'dark'
                    ? 'text-slate-200 hover:bg-slate-900/50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Static - No user logged in */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link 
              href="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full btn btn-ghost btn-sm rounded-lg py-2.5 h-auto min-h-0 ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              Login
            </Link>
            <Link 
              href="/register" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn btn-sm bg-teal-600 border-none text-white rounded-lg py-2.5 h-auto min-h-0"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}