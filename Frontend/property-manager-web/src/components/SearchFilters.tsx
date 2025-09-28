'use client';

import { useState, useEffect, useCallback } from 'react';
import { PropertyFilter } from '@/types/property';

interface SearchFiltersProps {
  onFilterChange: (filter: PropertyFilter) => void;
  isLoading?: boolean;
}

export default function SearchFilters({ onFilterChange, isLoading }: SearchFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilter>({
    name: '',
    address: '',
    minPrice: undefined,
    maxPrice: undefined,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchFilters: PropertyFilter) => {
      const cleanFilters: PropertyFilter = {};
      if (searchFilters.name?.trim()) cleanFilters.name = searchFilters.name.trim();
      if (searchFilters.address?.trim()) cleanFilters.address = searchFilters.address.trim();
      if (searchFilters.minPrice && searchFilters.minPrice > 0) cleanFilters.minPrice = searchFilters.minPrice;
      if (searchFilters.maxPrice && searchFilters.maxPrice > 0) cleanFilters.maxPrice = searchFilters.maxPrice;
      
      onFilterChange(cleanFilters);
    }, 500),
    [onFilterChange]
  );

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.name?.trim()) count++;
    if (filters.address?.trim()) count++;
    if (filters.minPrice && filters.minPrice > 0) count++;
    if (filters.maxPrice && filters.maxPrice > 0) count++;
    setActiveFilters(count);
  }, [filters]);

  const handleInputChange = (field: keyof PropertyFilter, value: string | number | undefined) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    debouncedSearch(newFilters);
  };

  const handleSearch = () => {
    const cleanFilters: PropertyFilter = {};
    if (filters.name?.trim()) cleanFilters.name = filters.name.trim();
    if (filters.address?.trim()) cleanFilters.address = filters.address.trim();
    if (filters.minPrice && filters.minPrice > 0) cleanFilters.minPrice = filters.minPrice;
    if (filters.maxPrice && filters.maxPrice > 0) cleanFilters.maxPrice = filters.maxPrice;
    
    onFilterChange(cleanFilters);
  };

  const handleClear = () => {
    const emptyFilters: PropertyFilter = {
      name: '',
      address: '',
      minPrice: undefined,
      maxPrice: undefined,
    };
    setFilters(emptyFilters);
    onFilterChange({});
  };

  // Quick filters with enhanced options
  const quickPriceFilters = [
    { label: 'Hasta 200k', icon: '💰', max: 200000, color: 'from-green-500 to-emerald-600' },
    { label: '200k - 400k', icon: '🏠', min: 200000, max: 400000, color: 'from-blue-500 to-cyan-600' },
    { label: '400k - 600k', icon: '🏡', min: 400000, max: 600000, color: 'from-purple-500 to-violet-600' },
    { label: 'Más de 600k', icon: '🏰', min: 600000, color: 'from-amber-500 to-orange-600' },
  ];

  const locationSuggestions = [
    { name: 'Madrid', icon: '🏙️' },
    { name: 'Barcelona', icon: '🌊' },
    { name: 'Valencia', icon: '🍊' },
    { name: 'Sevilla', icon: '🌞' },
    { name: 'Bilbao', icon: '🏔️' },
    { name: 'Málaga', icon: '🏖️' },
  ];

  const applyQuickFilter = (min?: number, max?: number) => {
    const newFilters = { ...filters, minPrice: min, maxPrice: max };
    setFilters(newFilters);
    debouncedSearch(newFilters);
  };

  const applyLocationFilter = (location: string) => {
    const newFilters = { ...filters, address: location };
    setFilters(newFilters);
    debouncedSearch(newFilters);
  };

  return (
    <div className="relative mb-8">
      {/* Main search card with glassmorphism */}
      <div className="glass rounded-3xl shadow-2xl border border-white/30 p-8">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Encuentra tu hogar perfecto
            </h2>
            <p className="text-gray-600 mt-2 flex items-center">
              <svg  width="24" height="24" className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Utiliza nuestros filtros inteligentes para una búsqueda precisa
            </p>
          </div>
          
          {/* Filter toggle for mobile */}
          <div className="flex items-center space-x-4">
            {activeFilters > 0 && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {activeFilters} filtro{activeFilters > 1 ? 's' : ''} activo{activeFilters > 1 ? 's' : ''}
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden p-3 rounded-xl bg-white/80 hover:bg-white border border-gray-200 shadow-lg transition-all duration-300"
            >
              <svg 
               width="24" height="24"
                className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick location filters */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <svg  width="24" height="24" className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm font-semibold text-gray-700">Ubicaciones populares</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {locationSuggestions.map((location, index) => (
              <button
                key={index}
                onClick={() => applyLocationFilter(location.name)}
                disabled={isLoading}
                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white/70 hover:bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105 disabled:opacity-50 hover:border-blue-300"
              >
                <span className="block text-lg mb-1">{location.icon}</span>
                <span className="text-xs">{location.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick price filters with enhanced design */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <svg  width="24" height="24" className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <p className="text-sm font-semibold text-gray-700">Filtros rápidos por precio</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickPriceFilters.map((filter, index) => (
              <button
                key={index}
                onClick={() => applyQuickFilter(filter.min, filter.max)}
                disabled={isLoading}
                className="group relative overflow-hidden px-4 py-4 text-sm font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 hover:from-blue-600 hover:to-purple-600 border border-gray-300 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-2xl mb-2">{filter.icon}</span>
                  <span>{filter.label}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced filters */}
        <div className={`transition-all duration-500 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Property name input */}
            <div className="group relative">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🏠</span>
                  Nombre de la propiedad
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="Ej: Casa moderna..."
                  value={filters.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-lg placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                {filters.name && (
                  <button
                    onClick={() => handleInputChange('name', '')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg  width="24" height="24" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Location input with autocomplete style */}
            <div className="group relative">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center">
                  <span className="text-lg mr-2">📍</span>
                  Ubicación
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  placeholder="Ej: Madrid, Barcelona..."
                  value={filters.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-lg placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                {filters.address && (
                  <button
                    onClick={() => handleInputChange('address', '')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg  width="24" height="24" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Min price with currency formatting */}
            <div className="group relative">
              <label htmlFor="minPrice" className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center">
                  <span className="text-lg mr-2">💰</span>
                  Precio mínimo
                </div>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">€</span>
                <input
                  type="number"
                  id="minPrice"
                  placeholder="0"
                  min="0"
                  step="5000"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleInputChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full pl-10 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-lg placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>

            {/* Max price with currency formatting */}
            <div className="group relative">
              <label htmlFor="maxPrice" className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center">
                  <span className="text-lg mr-2">💎</span>
                  Precio máximo
                </div>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">€</span>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder="Sin límite"
                  min="0"
                  step="5000"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full pl-10 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-lg placeholder-gray-400"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="flex-1 relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-magnetic transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <svg  width="24" height="24" className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Buscando propiedades...
                </>
              ) : (
                <>
                  <svg  width="24" height="24" className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Propiedades
                </>
              )}
            </span>
          </button>
          
          <button
            onClick={handleClear}
            disabled={isLoading}
            className="px-8 py-4 bg-white/90 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
          >
            <span className="flex items-center justify-center">
              <svg  width="24" height="24" className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpiar Filtros
            </span>
          </button>
        </div>

        {/* Search tips */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="flex items-start">
            <svg  width="24" height="24" className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">Consejos de búsqueda</p>
              <p className="text-xs text-blue-600">
                • Los resultados se actualizan automáticamente mientras escribes
                • Usa los filtros rápidos para búsquedas comunes
                • Combina múltiples filtros para resultados más precisos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}