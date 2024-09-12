export interface CategoryInterface {
  id: number;
  name: string;
  description: string;
  image: string;
  image_url: string;
}

export interface ProductInterfaceResponse {
  data: ProductInterface[];
  meta: {
    total: number;
  };
}
export interface BlogInterfaceResponse {
  data: BlogInterface[];
  meta: {
    total: number;
  };
}
export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price?: number;
  image_url: string;
  category: CategoryInterface;
  city: CityInterface;
  slug: string;
  images: ImagesInterface[];
  user: UserInterface;
}

export interface UserInterface {
  id: number;
  name: string;
  phone: string;
  phone_2?: string;
}
export interface ImagesInterface {
  id: number;
  image_url: string;
}
export interface BlogInterface {
  id: number;
  created_at: string;
  title: string;
  content: string;
  image_url: string;
  url: string | undefined;
  category: CategoryInterface;
  slug: string;
  images: ImagesInterface[];
}
// types.ts

export interface CityInterface {
  id: number;
  name: string;
}
export interface BrandInterface {
  id: number;
  name: string;
  image_url: string;
}
export interface ModelBrandInterface {
  id: number;
  name: string;
}
export interface EngineInterface {
  id: number;
  name: string;
}

export interface ApiResponseInterface<T> {
  data: T;
  status: string;
  message: string;
}
