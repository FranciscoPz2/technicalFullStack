import { Property, CreatePropertyDto, PropertyFilter } from '@/types/property';

const API_BASE_URL = 'http://localhost:5026/api';

class ApiService {
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Obtener todas las propiedades con filtros
  async getProperties(filter?: PropertyFilter): Promise<{
    properties: Property[];
    totalCount: number;
    page: number;
    pageSize: number;
  }> {
    const searchParams = new URLSearchParams();
    
    if (filter?.name) searchParams.append('name', filter.name);
    if (filter?.address) searchParams.append('address', filter.address);
    if (filter?.minPrice) searchParams.append('minPrice', filter.minPrice.toString());
    if (filter?.maxPrice) searchParams.append('maxPrice', filter.maxPrice.toString());
    if (filter?.page) searchParams.append('page', filter.page.toString());
    if (filter?.pageSize) searchParams.append('pageSize', filter.pageSize.toString());

    const queryString = searchParams.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const properties = await response.json();
    
    // Obtener headers de paginación
    const totalCount = parseInt(response.headers.get('X-Total-Count') || '0');
    const page = parseInt(response.headers.get('X-Page') || '1');
    const pageSize = parseInt(response.headers.get('X-Page-Size') || '10');

    return {
      properties,
      totalCount,
      page,
      pageSize
    };
  }

  // Obtener una propiedad por ID
  async getProperty(id: string): Promise<Property> {
    return this.fetchApi<Property>(`/properties/${id}`);
  }

  // Crear nueva propiedad
  async createProperty(property: CreatePropertyDto): Promise<Property> {
    return this.fetchApi<Property>('/properties', {
      method: 'POST',
      body: JSON.stringify(property),
    });
  }

  // Actualizar propiedad
  async updateProperty(id: string, property: Partial<CreatePropertyDto>): Promise<Property> {
    return this.fetchApi<Property>(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(property),
    });
  }

  // Eliminar propiedad
  async deleteProperty(id: string): Promise<void> {
    await this.fetchApi<void>(`/properties/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();