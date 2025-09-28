'use client';

import { Property } from '@/types/property';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
}

export default function PropertyList({ 
  properties, 
  totalCount, 
  currentPage, 
  pageSize, 
  isLoading = false,
  onPageChange 
}: PropertyListProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  
  const handlePageChange = (page: number) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPaginationPages = () => {
    const pages = [];
    const maxPagesToShow = 7;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Enhanced loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-lg"></div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded flex-1"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
                    <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded"></div>
                  </div>
                </div>
              </div>
              <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state with enhanced design
  const EmptyState = () => (
    <div className="text-center py-20">
      <div className="relative inline-block mb-8">
        {/* Animated background elements */}
        <div className="absolute -inset-4">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 absolute top-0 left-0"></div>
        </div>
        
        {/* Main icon */}
        <div className="relative bg-white rounded-full p-8 shadow-2xl border border-gray-100">
          <svg 
            width="24" height="24"
            className="mx-auto h-20 w-20 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
        </div>
      </div>
      
      <h3 className="text-3xl font-bold text-gray-900 mb-4">
        No se encontraron propiedades
      </h3>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Intenta ajustar los filtros de búsqueda o explora nuestras recomendaciones.
      </p>
      
      {/* Suggested actions with enhanced styling */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 btn-magnetic">
          <span  className="flex items-center justify-center">
            <svg  width="24" height="24" className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Ver todas las propiedades
          </span>
        </button>
        <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:shadow-lg">
          <span  className="flex items-center justify-center">
            <svg  width="24" height="24" className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpiar filtros
          </span>
        </button>
      </div>

      {/* Popular searches */}
      <div className="max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-gray-700 mb-4">Búsquedas populares:</p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Madrid Centro', 'Barcelona Eixample', 'Valencia Playa', 'Casa con jardín', 'Piso moderno'].map((search, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Enhanced loading info */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Buscando propiedades...
              </h3>
              <p className="text-gray-600">
                Estamos encontrando las mejores opciones para ti
              </p>
            </div>
          </div>
        </div>
        
        <LoadingSkeleton />
      </div>
    );
  }

  if (properties.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Enhanced results info */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Resultados de búsqueda
            </h3>
            <p className="text-gray-600 flex items-center">
              <svg  width="24" height="24" className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mostrando <span  className="font-semibold text-blue-600 mx-1">{(currentPage - 1) * pageSize + 1}</span> a
              <span  className="font-semibold text-blue-600 mx-1">{Math.min(currentPage * pageSize, totalCount)}</span>
              de <span  className="font-semibold text-purple-600 mx-1">{totalCount}</span> propiedades
            </p>
          </div>
          
          {/* Enhanced page info and sorting */}
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {totalPages > 1 && (
              <div className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-4 py-2 shadow-sm border border-blue-200">
                <svg  width="24" height="24" className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span  className="text-sm font-semibold text-blue-700">
                  Página {currentPage} de {totalPages}
                </span>
              </div>
            )}
            
            {/* Sort options */}
            <select className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Más relevantes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Más recientes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties grid with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="animate-fadeInScale"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PropertyCard property={property} index={index} />
          </div>
        ))}
      </div>

      {/* Enhanced pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-3">
            <div className="flex items-center space-x-2">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 group"
                aria-label="Página anterior"
              >
                <svg  width="24" height="24" className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page numbers */}
              <div className="flex space-x-1">
                {getPaginationPages().map((page, index) => (
                  <div key={index}>
                    {page === '...' ? (
                      <span  className="px-3 py-3 text-gray-400 font-medium">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageChange(page as number)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          page === currentPage
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 hover:scale-105'
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 group"
                aria-label="Página siguiente"
              >
                <svg  width="24" height="24" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load more option for better UX */}
      {currentPage < totalPages && (
        <div className="text-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100 text-gray-700 hover:text-blue-700 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-300 hover:border-blue-300"
          >
            <span  className="flex items-center justify-center">
              <svg  width="24" height="24" className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Cargar más propiedades
            </span>
          </button>
        </div>
      )}

      {/* Back to top button */}
      <div className="text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg  width="24" height="24" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
          Volver arriba
        </button>
      </div>
    </div>
  );
}