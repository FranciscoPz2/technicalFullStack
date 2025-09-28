'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyPlaceholderSVG = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
    <div className="text-slate-400 text-center">
      <svg 
        width="24" height="24"
        className="w-16 h-16 mx-auto mb-3" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12V8l-3.5-2-4.5 3.5L4 8v8h12z" clipRule="evenodd" />
      </svg>
      <p className="text-sm font-medium">Imagen no disponible</p>
    </div>
  </div>
);

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPriceCategory = (price: number): { 
    color: string; 
    label: string; 
    bgColor: string;
    textColor: string;
  } => {
    if (price < 200000) return { 
      color: 'from-emerald-500 to-green-600', 
      label: 'Económico',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    };
    if (price < 400000) return { 
      color: 'from-blue-500 to-cyan-600', 
      label: 'Medio',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    };
    if (price < 600000) return { 
      color: 'from-purple-500 to-violet-600', 
      label: 'Premium',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    };
    return { 
      color: 'from-amber-500 to-orange-600', 
      label: 'Luxury',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    };
  };

  const priceCategory = getPriceCategory(property.price);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setIsHovered(false);
  };

  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
      
      <div 
        ref={cardRef}
        className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 card-interactive"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image container */}
        <div className="relative h-64 overflow-hidden">
          
          <PropertyPlaceholderSVG />
          
          {/* Loading skeleton */}
          {!isLoaded && !imageError && property.image && (
            <div className="absolute inset-0 skeleton"></div>
          )}

          {/* Image overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>

          {/* Price badge with enhanced design */}
          <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
            <div className={`${priceCategory.bgColor} backdrop-blur-md border border-white/30 px-4 py-2 rounded-2xl shadow-lg`}>
              <div className={`text-lg font-bold ${priceCategory.textColor}`}>
                {formatPrice(property.price)}
              </div>
              <div className={`text-xs ${priceCategory.textColor} opacity-80`}>
                {priceCategory.label}
              </div>
            </div>
          </div>

          {/* Category info with icon */}
          <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
            <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-xl shadow-lg border border-white/50">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${priceCategory.color}`}></div>
                <span className="text-xs font-semibold">{priceCategory.label}</span>
              </div>
            </div>
          </div>

          {/* Favorite button with pulse animation */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className={`absolute bottom-4 right-4 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/50 transform transition-all duration-300 ${
              isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0 group-hover:opacity-100'
            } ${isFavorite ? 'animate-pulse-glow' : ''}`}
          >
            <svg 
             width="24" height="24"
              className={`w-5 h-5 transition-colors duration-300 ${
                isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
              }`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>

          {/* Quick view button */}
          <div className={`absolute bottom-4 left-4 transform transition-all duration-300 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}>
            <button className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-white/50 hover:bg-white transition-colors">
              <svg  width="24" height="24" className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced content section */}
        <div className="p-6 space-y-4">
          {/* Property name with better typography */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {property.name}
          </h3>

          {/* Address with enhanced design */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
              <svg 
               width="24" height="24"
                className="w-4 h-4 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 flex-1 leading-relaxed">
              {property.address}
            </p>
          </div>

          {/* Enhanced owner info and stats */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {property.idOwner.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Propietario</p>
                <p className="text-sm font-semibold text-gray-700">{property.idOwner}</p>
              </div>
            </div>
            
            {/* Enhanced stats */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <svg  width="24" height="24" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium">{Math.floor(Math.random() * 50) + 10}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg  width="24" height="24" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">{Math.floor(Math.random() * 20) + 5}</span>
              </div>
            </div>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex space-x-3 pt-2">
            <Link href={`/properties/${property.id}`} className="flex-1">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus-ring btn-magnetic transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="flex items-center justify-center space-x-2">
                  <span>Ver Detalles</span>
                  <svg 
                    width="24" height="24"
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </span>
              </button>
            </Link>
            
            <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-300 focus-ring">
              <svg  width="24" height="24" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hover indicator */}
        <div className={`absolute inset-0 border-2 border-blue-400 rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}></div>
      </div>
    </div>
  );
}