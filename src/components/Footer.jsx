import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left Side - Logo & Name */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
              <span>🏥</span> DocAppoint
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Your trusted healthcare partner
            </p>
          </div>
          
          {/* Right Side - Social Icons */}
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition text-2xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-2xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition text-2xl">
              <FaLinkedin />
            </a>
          </div>
          
        </div>
        
        {/* Bottom Border & Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DocAppoint. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}