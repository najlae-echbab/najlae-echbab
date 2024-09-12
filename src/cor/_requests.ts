import {
  ApiResponseInterface,
  BrandInterface,
  ModelBrandInterface,
  EngineInterface,
  ProductInterfaceResponse,
  CityInterface,
  CategoryInterface,
  BlogInterfaceResponse,
} from "./_models";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const getCities = async (query?: string): Promise<CityInterface[]> => {
  try {
    const response = await axios.get<CityInterface[]>(
      `${API_URL}/cities?${query}`
    );
    return response.data; // Access the data inside the `data` key
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Could not fetch cities");
  }
};
export const getBrands = async (query?: string): Promise<BrandInterface[]> => {
  try {
    const response = await axios.get<ApiResponseInterface<BrandInterface[]>>(
      `${API_URL}/brands/?${query}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
export const getCategories = async (
  query?: string
): Promise<CategoryInterface[]> => {
  try {
    const response = await axios.get<ApiResponseInterface<CategoryInterface[]>>(
      `${API_URL}/categories/?${query}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};

export const getBlogCategories = async (
  query?: string
): Promise<CategoryInterface[]> => {
  try {
    const response = await axios.get<ApiResponseInterface<CategoryInterface[]>>(
      `${API_URL}/blog-categories/?${query}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
export const getModelBrand = async (
  query?: string
): Promise<ModelBrandInterface[]> => {
  try {
    const response = await axios.get<
      ApiResponseInterface<ModelBrandInterface[]>
    >(`${API_URL}/brand-models?${query}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
export const getEngine = async (query?: string): Promise<EngineInterface[]> => {
  try {
    const response = await axios.get<ApiResponseInterface<EngineInterface[]>>(
      `${API_URL}/engines?${query}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
export const getProduct = async (
  query?: string
): Promise<ProductInterfaceResponse> => {
  try {
    const response = await axios.get<ProductInterfaceResponse>(
      `${API_URL}/products?${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getProductById = async (id: number): Promise<any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axios.get<any>(`${API_URL}/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBlogById = async (id: number): Promise<any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axios.get<any>(`${API_URL}/blogs/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
export const getBlog = async (
  query?: string
): Promise<BlogInterfaceResponse> => {
  try {
    const response = await axios.get<BlogInterfaceResponse>(
      `${API_URL}/blogs?${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching :", error);
    throw new Error("Could not fetch ");
  }
};
