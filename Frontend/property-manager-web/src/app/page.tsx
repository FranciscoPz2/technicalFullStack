'use client';

import { useState, useEffect } from 'react';
import { Property, PropertyFilter } from '@/types/property';
import { apiService } from '@/services/api';
import Navbar from '@/components/Navbar';
import SearchFilters from '@/components/SearchFilters';
import PropertyList from '@/components/PropertyList';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<PropertyFilter>({});
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    cities: 50,
    satisfaction: 98
  });

  const loadProperties = async (filters: PropertyFilter = {}, page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const filterWithPagination = {
        ...filters,
        page,
        pageSize
      };

      const result = await apiService.getProperties(filterWithPagination);
      
      setProperties(result.properties);
      setTotalCount(result.totalCount);
      setCurrentPage(result.page);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalProperties: result.totalCount
      }));
    } catch (err) {
      console.error('Error loading properties:', err);
      setError('Error al cargar las propiedades. Por favor, intenta nuevamente.');
      setProperties([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleFilterChange = (filters: PropertyFilter) => {
    setCurrentFilters(filters);
    setCurrentPage(1);
    loadProperties(filters, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadProperties(currentFilters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    loadProperties(currentFilters, currentPage);
  };

  return (
    <div className="min-h-screen gradient-mesh">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-300/30 to-cyan-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            {/* Enhanced heading with better typography */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                  Encuentra Tu
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Hogar Perfecto
                </span>
              </h1>
              
              {/* Animated tagline */}
              <div className="relative">
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
                  Descubre propiedades excepcionales con nuestra plataforma inteligente.
                  <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                    Tu nuevo hogar te está esperando.
                  </span>
                </p>
              </div>
            </div>

            {/* Enhanced stats with animations */}
            <div className="grid grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {stats.totalProperties.toLocaleString()}+
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-semibold">Propiedades</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stats.cities}+
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-semibold">Ciudades</div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {stats.satisfaction}%
                  </div>
                  <div className="text-sm md:text-base text-gray-600 font-semibold">Satisfacción</div>
                </div>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => document.querySelector('.search-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl btn-magnetic"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Propiedades
                </span>
              </button>
              
              <button className="px-10 py-4  bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:bg-white hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="flex items-center justify-center">
                 <svg className="w-6 h-6 text-blue-500"  width="24" height="24"fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 20v-2a2 2 0 012-2h8a2 2 0 012 2v2M6 20H4a2 2 0 01-2-2v-2a2 2 0 012-2h2M6 20h12v-2" />
                  </svg>
                  Ver Catálogo
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search Section */}
        <div className="search-section">
          <SearchFilters 
            onFilterChange={handleFilterChange}
            isLoading={isLoading}
          />
        </div>

        {/* Enhanced Error Display */}
        {error && (
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-red-100 rounded-3xl blur opacity-50"></div>
            <div className="relative bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-3xl p-8 shadow-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="h-7 w-7 text-white"  width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-bold text-red-800 mb-2">
                    ¡Ups! Algo salió mal
                  </h3>
                  <p className="text-red-700 mb-4 leading-relaxed">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2"  width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Reintentar
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        <section className="results-section">
          {!isLoading && !error && (
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {totalCount > 0 ? 'Propiedades Disponibles' : 'No se encontraron propiedades'}
              </h2>
              {totalCount > 0 && (
                <p className="text-lg text-gray-600 flex items-center">
                  <svg  width="24" height="24" className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mostrando {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} de {totalCount} propiedades
                </p>
              )}
            </div>
          )}

          <PropertyList
            properties={properties}
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            isLoading={isLoading}
            onPageChange={handlePageChange}
          />
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative mt-32">
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Enhanced company info */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl mr-4 shadow-lg">
                    <svg   width="24" height="24"className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-white">PropertyManager</span>
                    <p className="text-blue-200 text-sm">Tu hogar perfecto</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                  Tu plataforma de confianza para encontrar la propiedad perfecta. 
                  Combinamos tecnología avanzada con un servicio personalizado para 
                  hacer realidad tus sueños inmobiliarios.
                </p>
                
                {/* Social links */}
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <span className="text-white text-sm font-bold">{social[0].toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced quick links */}
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Enlaces Rápidos</h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Sobre Nosotros', icon: '🏢' },
                    { name: 'Nuestros Servicios', icon: '⚡' },
                    { name: 'Testimonios', icon: '💬' },
                    { name: 'Blog', icon: '📝' },
                    { name: 'Contacto', icon: '📞' }
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <span className="mr-3 group-hover:scale-110 transition-transform">{link.icon}</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enhanced contact info */}
              <div>
                <h3 className="text-lg font-bold text-white mb-6">Contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <svg  width="24" height="24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-300">info@propertymanager.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <svg  width="24" height="24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Teléfono</p>
                      <p className="text-gray-300">+34 900 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <svg  width="24" height="24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Oficina</p>
                      <p className="text-gray-300">Madrid, España</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced footer bottom */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <p className="text-gray-400 text-sm">
                  © 2024 PropertyManager. Todos los derechos reservados.
                </p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Términos de Servicio
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Política de Privacidad
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}