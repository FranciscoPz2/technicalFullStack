export interface Property {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string;
}

export interface CreatePropertyDto {
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image: string;
}

export interface PropertyFilter {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export interface ApiResponse<T> {
  data: T;
  totalCount?: number;
  page?: number;
  pageSize?: number;
}