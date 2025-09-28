'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-2xl border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Logo container */}
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <svg 
                  width="24" height="24"
                  className="h-7 w-7" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
             
              <div className="text-xs text-gray-500 font-medium -mt-1">
                Tu hogar perfecto
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                className="relative px-5 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10 flex items-center">
                  <svg  width="24" height="24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Propiedades
                </span>
              </Link>
              
              <Link
                href="/properties"
                className="relative px-5 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10 flex items-center">
                  <svg  width="24" height="24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explorar
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl scale-0 group-hover:scale-100 transition-transform origin-center duration-300"></div>
              </Link>

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="relative px-5 py-3 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 group rounded-xl"
              >
                <span className="relative z-10 flex items-center">
                  <svg  width="24" height="24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtros
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl scale-0 group-hover:scale-100 transition-transform origin-center duration-300"></div>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              <button className="relative p-3 text-gray-600 hover:text-blue-600 transition-colors duration-300 rounded-xl hover:bg-gray-100">
                <svg  width="24" height="24" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>

              <button className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white font-semibold rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl btn-magnetic">
                <span className="relative z-10 flex items-center">
                  <svg  width="24" height="24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contacto
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300"
            >
              <svg  width="24" height="24" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
            >
              <span className="sr-only">Abrir menú principal</span>
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                }`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 translate-y-2 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        <div className={`md:hidden mobile-menu transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-lg rounded-2xl mt-4 border border-gray-200/50 shadow-2xl">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Propiedades
            </Link>
            <Link
              href="/properties"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explorar
            </Link>
            <button className="w-full flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all duration-300">
              <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favoritos
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
            
            <div className="border-t border-gray-200 my-4"></div>
            
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span className="flex items-center justify-center">
                <svg  width="24" height="24" className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contacto
              </span>
            </button>
          </div>
        </div>

        {/* Quick Search Overlay */}
        <div className={`absolute top-full left-0 right-0 mt-2 transition-all duration-500 ${
          isSearchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-6 mx-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <svg  width="24" height="24" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar propiedades..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg  width="24" height="24" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Quick search suggestions */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Búsquedas populares:</p>
              <div className="flex flex-wrap gap-2">
                {['Madrid Centro', 'Casa con jardín', 'Piso moderno', 'Vista al mar'].map((term, index) => (
                  <button
                    key={index}
                    className="px-3 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}