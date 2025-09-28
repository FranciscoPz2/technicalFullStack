'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import { apiService } from '@/services/api';
import Navbar from '@/components/Navbar';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  const propertyId = params.id as string;

  // Mock additional images for demo - replace with real property images
  const additionalImages = [
    property?.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800'
  ];

  useEffect(() => {
    if (propertyId) {
      loadProperty(propertyId);
    }
  }, [propertyId]);

  const loadProperty = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const propertyData = await apiService.getProperty(id);
      setProperty(propertyData);
    } catch (err) {
      console.error('Error loading property:', err);
      setError('Error al cargar la propiedad. Puede que no exista o haya un problema de conexión.');
    } finally {
      setIsLoading(false);
    }
  };

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
    description: string;
    bgColor: string;
    textColor: string;
  } => {
    if (price < 200000) return { 
      color: 'from-emerald-500 to-green-600', 
      label: 'Económico',
      description: 'Excelente oportunidad de inversión',
      bgColor: 'from-emerald-50 to-green-50',
      textColor: 'text-emerald-700'
    };
    if (price < 400000) return { 
      color: 'from-blue-500 to-cyan-600', 
      label: 'Precio Medio',
      description: 'Buena relación calidad-precio',
      bgColor: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-700'
    };
    if (price < 600000) return { 
      color: 'from-purple-500 to-violet-600', 
      label: 'Premium',
      description: 'Alta calidad y ubicación privilegiada',
      bgColor: 'from-purple-50 to-violet-50',
      textColor: 'text-purple-700'
    };
    return { 
      color: 'from-amber-500 to-orange-600', 
      label: 'Luxury',
      description: 'Propiedad exclusiva de alto standing',
      bgColor: 'from-amber-50 to-orange-50',
      textColor: 'text-amber-700'
    };
  };

  const shareProperty = async () => {
    const shareData = {
      title: property?.name || 'Propiedad',
      text: `Mira esta increíble propiedad: ${property?.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Enlace copiado al portapapeles');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  // Loading component with skeleton
  const LoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            {/* Breadcrumb skeleton */}
            <div className="h-12 bg-white/80 rounded-2xl w-1/3 skeleton"></div>
            
            {/* Main content skeleton */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/30">
              <div className="h-96 lg:h-[32rem] skeleton"></div>
              <div className="p-8 space-y-6">
                <div className="h-10 skeleton rounded w-3/4"></div>
                <div className="h-6 skeleton rounded w-2/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="h-32 skeleton rounded-2xl"></div>
                  <div className="h-32 skeleton rounded-2xl"></div>
                  <div className="h-32 skeleton rounded-2xl"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-14 skeleton rounded-2xl flex-1"></div>
                  <div className="h-14 skeleton rounded-2xl flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error component with enhanced design
  const ErrorState = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-orange-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              
              {/* Main error icon */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-white/50">
                <svg 
                 width="24" height="24"
                  className="mx-auto h-20 w-20 text-red-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
              </div>
            </div>
            
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">{error}</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Ver todas las propiedades
                </span>
              </Link>
              <button
                onClick={() => router.back()}
                className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg"
              >
                <span className="flex items-center justify-center">
                  <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver atrás
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <LoadingState />;
  if (error || !property) return <ErrorState />;

  const priceCategory = getPriceCategory(property.price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <Navbar />
      
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Breadcrumb Navigation */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/30">
              <li>
                <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors font-medium group">
                  <div className="flex items-center">
                    <div className="p-1 rounded-lg group-hover:bg-blue-50 transition-colors">
                      <svg  width="24" height="24" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <span className="ml-2 font-semibold">Inicio</span>
                  </div>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg  width="24" height="24" className="h-5 w-5 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <span className="text-gray-700 font-semibold line-clamp-1 max-w-xs">
                    {property.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Main Property Card */}
          <div className="bg-white/90 backdrop-blur-lg shadow-3xl rounded-3xl overflow-hidden border border-white/30">
            
            {/* Image Gallery Section */}
            <div className="relative">
              <div className="h-96 lg:h-[32rem] overflow-hidden relative group">
               
                
                {/* Loading skeleton for image */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 skeleton"></div>
                )}

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>

                {/* Enhanced Price Badge */}
                <div className="absolute top-6 right-6 transform group-hover:scale-105 transition-transform duration-300">
                  <div className={`bg-gradient-to-r ${priceCategory.bgColor} backdrop-blur-md border border-white/40 px-6 py-4 rounded-2xl shadow-2xl`}>
                    <div className={`text-3xl font-black bg-gradient-to-r ${priceCategory.color} bg-clip-text text-transparent`}>
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm font-bold text-gray-700">{priceCategory.label}</div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-white/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priceCategory.color} animate-pulse`}></div>
                      <div>
                        <div className="text-sm font-bold">{priceCategory.label}</div>
                        <div className="text-xs text-gray-600">{priceCategory.description}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Overlay */}
                <div className="absolute bottom-6 right-6 flex space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-4 bg-white/95 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transform hover:scale-110 transition-all duration-300 border border-white/50 ${
                      isFavorite ? 'animate-pulse text-red-500' : 'text-gray-600'
                    }`}
                    aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                  >
                    <svg 
                     width="24" height="24"
                      className="w-6 h-6"
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
                  
                  <button 
                    onClick={shareProperty}
                    className="p-4 bg-white/95 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transform hover:scale-110 transition-all duration-300 border border-white/50 text-gray-700"
                    aria-label="Compartir propiedad"
                  >
                    <svg  width="24" height="24" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>

                  <button className="p-4 bg-white/95 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transform hover:scale-110 transition-all duration-300 border border-white/50 text-gray-700">
                    <svg  width="24" height="24" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image Navigation Thumbnails */}
              <div className="absolute bottom-6 left-6 flex space-x-2 max-w-xs overflow-x-auto">
                {additionalImages.slice(0, 6).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'border-white shadow-lg scale-110' 
                        : 'border-white/50 hover:border-white hover:scale-105'
                    }`}
                  >
                    
                  </button>
                ))}
                
                {additionalImages.length > 6 && (
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-black/50 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center text-white text-sm font-bold">
                    +{additionalImages.length - 6}
                  </div>
                )}
              </div>
            </div>

            {/* Property Information Section */}
            <div className="p-8 lg:p-12">
              {/* Header */}
              <div className="mb-10">
                <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  {property.name}
                </h1>
                
                {/* Enhanced Address */}
                <div className="flex items-start space-x-4 mb-8">
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg">
                    <svg  width="24" height="24" className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl text-gray-800 font-semibold leading-relaxed">{property.address}</p>
                    <p className="text-gray-600 mt-2 flex items-center">
                      <svg  width="24" height="24" className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Ubicación verificada y disponible
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                
                {/* Price Information Card */}
                <div className={`bg-gradient-to-br ${priceCategory.bgColor} p-8 rounded-3xl border-2 border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Precio</h3>
                    <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                      <svg  width="24" height="24" className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${priceCategory.color} bg-clip-text text-transparent mb-3`}>
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">
                    {priceCategory.description}
                  </div>
                  <div className="mt-4 text-xs text-gray-600">
                    Precio por m²: €{Math.round(property.price / (Math.random() * 100 + 80))}
                  </div>
                </div>

                {/* Owner Information Card */}
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-3xl border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Propietario</h3>
                    <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                      <svg  width="24" height="24" className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {property.idOwner.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                        <svg  width="24" height="24" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-900">{property.idOwner}</div>
                      <div className="text-sm text-purple-700 font-semibold">Propietario verificado</div>
                      <div className="text-xs text-purple-600 mt-1">Miembro desde 2020</div>
                    </div>
                  </div>
                </div>

                {/* Interest & Analytics Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Interés</h3>
                    <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                      <svg  width="24" height="24" className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-4xl font-black text-green-900 mb-3">
                    {Math.floor(Math.random() * 150) + 25}
                  </div>
                  <div className="text-sm text-green-700 font-semibold">Visualizaciones esta semana</div>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">Alto interés</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col lg:flex-row gap-6">
                <button
                  onClick={() => router.back()}
                  className="lg:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver
                  </span>
                </button>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-2xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                  >
                    <span className="flex items-center justify-center">
                      <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Contactar
                    </span>
                  </button>
                  
                  <button className="px-8 py-4 bg-white/90 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg">
                    <span className="flex items-center justify-center">
                      <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Descargar Info
                    </span>
                  </button>
                </div>
              </div>

              {/* Additional Property Features */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Características Destacadas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: '🏠', label: 'Residencial', desc: 'Zona tranquila' },
                    { icon: '🚗', label: 'Parking', desc: 'Plaza incluida' },
                    { icon: '🌳', label: 'Jardín', desc: 'Espacio verde' },
                    { icon: '🔥', label: 'Calefacción', desc: 'Sistema central' },
                    { icon: '🏊', label: 'Piscina', desc: 'Comunitaria' },
                    { icon: '🛡️', label: 'Seguridad', desc: '24h vigilancia' },
                    { icon: '🚇', label: 'Transporte', desc: 'Bien comunicado' },
                    { icon: '🛒', label: 'Servicios', desc: 'Cerca comercios' }
                  ].map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-colors">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <div className="font-semibold text-gray-800 text-sm">{feature.label}</div>
                      <div className="text-xs text-gray-600">{feature.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-3xl border border-gray-200 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Contactar Propietario</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg  width="24" height="24" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8">
              {/* Property Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {property.idOwner.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{property.idOwner}</p>
                    <p className="text-sm text-gray-600">Propietario verificado</p>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">4.9 • 127 reseñas</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-xl">
                  <p className="font-semibold text-gray-800">{property.name}</p>
                  <p className="text-sm text-gray-600">{property.address}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(property.price)}</p>
                </div>
              </div>
              
              {/* Contact Options */}
              <div className="space-y-4">
                <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <span className="flex items-center justify-center">
                    <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Llamar ahora • +34 600 123 456
                  </span>
                </button>
                
                <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <span className="flex items-center justify-center">
                    <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Enviar email
                  </span>
                </button>
                
                <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <span className="flex items-center justify-center">
                    <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    WhatsApp
                  </span>
                </button>
                
                <button className="w-full p-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                  <span className="flex items-center justify-center">
                    <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Programar visita
                  </span>
                </button>
              </div>

              {/* Quick Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start">
                  <svg  width="24" height="24" className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blue-800 mb-1">Respuesta rápida garantizada</p>
                    <p className="text-xs text-blue-600">
                      • Respuesta en menos de 2 horas
                      • Disponible 7 días a la semana
                      • Visitas flexibles sin compromiso
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-3xl border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Compartir Propiedad</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg  width="24" height="24" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => copyToClipboard(window.location.href)}
                className="w-full p-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  <svg  width="24" height="24" className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar enlace
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}