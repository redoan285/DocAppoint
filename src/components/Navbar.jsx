"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Stethoscope, Menu, X, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Appointments", path: "/all-appointments" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
      theme === "dark" ? "bg-gray-900/95 backdrop-blur-sm border-b border-gray-800" : "bg-white/95 backdrop-blur-sm border-b border-gray-200"
    }`}>
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        
        {/* Left Side - Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
            <Stethoscope className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <span className={`text-xl lg:text-2xl font-bold tracking-tight ${
            theme === "dark" 
              ? "bg-gradient-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent"
          }`}>
            DocAppoint
          </span>
        </Link>

        {/* Center - Navigation Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? theme === "dark"
                      ? "text-teal-400 font-semibold"
                      : "text-teal-600 font-semibold"
                    : theme === "dark"
                    ? "text-slate-300 hover:text-teal-400"
                    : "text-slate-600 hover:text-teal-600"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side - User Controls */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors duration-200 ${
              theme === "dark"
                ? "border-slate-700 text-slate-400 hover:bg-slate-800"
                : "border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 group"
              >
                <Avatar className="ring-2 ring-teal-500/30 transition-transform duration-300 group-hover:scale-105">
                  <Avatar.Image 
                    referrerPolicy="no-referrer" 
                    alt={user.name || "User"} 
                    src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8F81&color=fff`} 
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                  <p className="text-xs text-slate-400">Welcome,</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 line-clamp-1 max-w-[120px]">
                    {user?.name || user?.email?.split("@")[0]}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 z-50 border ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}>
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        theme === "dark" ? "text-slate-200 hover:bg-gray-700" : "text-slate-700 hover:bg-gray-50"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        theme === "dark" ? "text-slate-200 hover:bg-gray-700" : "text-slate-700 hover:bg-gray-50"
                      }`}
                    >
                      My Profile
                    </Link>
                    <hr className={`my-1 ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`} />
                    <button
                      onClick={handleSignOut}
                      className={`block w-full text-left px-4 py-2 text-sm text-red-600 transition-colors ${
                        theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-3">
              <Link
                href="/login"
                className={`text-sm font-medium px-3 lg:px-4 py-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "text-slate-200 hover:bg-slate-800" 
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm font-medium px-3 lg:px-4 py-2 rounded-lg shadow-md shadow-teal-500/20 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              theme === "dark" ? "text-slate-400" : "text-slate-500"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${
              theme === "dark" ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden py-4 px-6 space-y-4 shadow-xl ${
          theme === "dark" ? "bg-gray-900 border-t border-gray-800" : "bg-white border-t border-gray-200"
        }`}>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium py-2.5 rounded-lg px-3 transition-colors ${
                    isActive(link.path)
                      ? theme === "dark"
                        ? "bg-teal-950/30 text-teal-400 font-semibold"
                        : "bg-teal-50 text-teal-600 font-semibold"
                      : theme === "dark"
                      ? "text-slate-200 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="ring-2 ring-teal-500/30">
                  <Avatar.Image 
                    referrerPolicy="no-referrer" 
                    alt={user.name || "User"} 
                    src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8F81&color=fff`} 
                  />
                  <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">{user?.name || "User"}</h4>
                  <p className="text-xs text-slate-500 truncate max-w-[180px]">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center py-2.5 rounded-lg text-base font-medium ${
                  theme === "dark" 
                    ? "text-slate-200 hover:bg-slate-800" 
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-base font-medium bg-gradient-to-r from-teal-500 to-teal-600 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;