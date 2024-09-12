import React, { useCallback, useMemo, useState } from "react";
import {
  BrandInterface,
  ModelBrandInterface,
  EngineInterface,
  ProductInterface,
  CityInterface,
  CategoryInterface,
} from "../cor/_models";
import {
  getBrands,
  getCategories,
  getCities,
  getEngine,
  getModelBrand,
} from "../cor/_requests";
import Loading from "./Loading";

type Props = {
  setProducts: (products: ProductInterface[]) => void;
  brandSelected: number | undefined;
  modelSelected: number | undefined;
  engineSelected: number | undefined;
  citySelected: number | undefined;
  categorySelected: number | undefined;
  setEngineSelected: (engineSelected: number | undefined) => void;
  setModelSelected: (modelSelected: number | undefined) => void;
  setBrandSelected: (brandSelected: number | undefined) => void;
  setCitySelected: (citySelected: number | undefined) => void;
  setCategorySelected: (categorySelected: number | undefined) => void;
};
const Accordion: React.FC<Props> = ({
  brandSelected,
  setBrandSelected,
  setProducts,
  modelSelected,
  setModelSelected,
  engineSelected,
  setEngineSelected,
  setCitySelected,
  citySelected,
  categorySelected,
  setCategorySelected,
}) => {
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [models, setModels] = useState<ModelBrandInterface[]>([]);
  const [cities, setCities] = useState<CityInterface[]>([]);
  const [engines, setEngines] = useState<EngineInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [brandLoading, setBrandLoading] = useState<boolean>(false);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [engineLoading, setEngineLoading] = useState<boolean>(false);
  const [cityLoading, setCityLoading] = useState<boolean>(false);
  // Get brands
  const getBrandList = async () => {
    try {
      setBrandLoading(false);

      const brandData = await getBrands("items=all");
      setBrands(brandData);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setBrandLoading(false);
    }
  };
  const getCategoresList = async () => {
    try {
      setCategoriesLoading(true);

      const categoryData = await getCategories("items=all");
      setCategories(categoryData);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setCategoriesLoading(false);
    }
  };
  const getCityList = async () => {
    try {
      setCityLoading(false);

      const cityData = await getCities("items=in_product");
      setCities(cityData);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setCityLoading(false);
    }
  };

  useMemo(() => {
    getCategoresList();
    getCityList();
    getBrandList();
  }, []);

  // Get models
  const getModelList = useCallback(async () => {
    try {
      setModelLoading(true);
      if (brandSelected) {
        const brandData = await getModelBrand(
          "items=all&brand_id=" + brandSelected
        );
        setModels(brandData);
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setModelLoading(false);
    }
  }, [brandSelected]);

  useMemo(() => {
    if (brandSelected) {
      getModelList();
    }
  }, [brandSelected, getModelList]);

  // Get engines
  const getEngineList = useCallback(async () => {
    try {
      setEngineLoading(true);
      if (modelSelected) {
        const engineData = await getEngine(
          "items=all&model_id=" + modelSelected
        );
        setEngines(engineData);
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setEngineLoading(false);
    }
  }, [modelSelected]);

  useMemo(() => {
    if (modelSelected) {
      getEngineList();
    }
  }, [modelSelected, getEngineList]);
  const changeBrand = async (id: number) => {
    await setProducts([]);
    setModelSelected(undefined);
    setEngineSelected(undefined);
    setBrandSelected(id);
  };
  const changeCategory = async (id: number | undefined) => {
    await setProducts([]);
    setCategorySelected(id);
  };
  const changeModel = async (id: number) => {
    await setProducts([]);
    setEngineSelected(undefined);
    setModelSelected(id);
  };
  const changeEngine = async (id: number) => {
    await setProducts([]);
    setEngineSelected(id);
  };
  const changeCity = async (id: number | undefined) => {
    await setProducts([]);
    setCitySelected(id);
  };
  return (
    <div className="max-w-lg mx-auto my-4">
      <div className="border border-gray-200 rounded-md">
        {/* Accordion Item 0 */}
        <details className="border-b">
          <summary className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold text-gray-800">Categories</h3>
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300">
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="p-4 max-h-60	  overflow-auto">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id={`category-${undefined}`}
                name="category"
                value={undefined}
                checked={categorySelected === undefined}
                onChange={() => changeCategory(undefined)}
                className="mr-2"
              />
              <label
                htmlFor={`category-${undefined}`}
                className="text-gray-800"
              >
                Toutes les catégories
              </label>
            </div>
            {categories.map((category, index) => (
              <div
                key={"category" + index + ""}
                className="flex items-center mb-2"
              >
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  value={category.id}
                  checked={categorySelected === category.id}
                  onChange={() => changeCategory(category.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-gray-800"
                >
                  {category.name}
                </label>
              </div>
            ))}
            {categoriesLoading && <Loading />}
          </div>
        </details>
        {/* Accordion Item 1 */}
        <details className="border-b">
          <summary className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold text-gray-800">Marques</h3>
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300">
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="p-4 max-h-60	  overflow-auto">
            {brands.map((brand, index) => (
              <div
                key={"brand" + index + ""}
                className="flex items-center mb-2"
              >
                <input
                  type="radio"
                  id={`brand-${brand.id}`}
                  name="brand"
                  value={brand.id}
                  checked={brandSelected === brand.id}
                  onChange={() => changeBrand(brand.id)}
                  className="mr-2"
                />
                <label htmlFor={`brand-${brand.id}`} className="text-gray-800">
                  {brand.name}
                </label>
              </div>
            ))}
            {brandLoading && <Loading />}
          </div>
        </details>

        {/* Accordion Item 2 */}
        <details className="border-b">
          <summary className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold text-gray-800">Modèle</h3>
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300">
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="p-4 max-h-60  overflow-auto">
            {models.map((model, index) => (
              <div key={"model-" + index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`model-${model.id}`}
                  name="model"
                  value={model.id}
                  checked={modelSelected === model.id}
                  onChange={() => changeModel(model.id)}
                  className="mr-2"
                />
                <label htmlFor={`model-${model.id}`} className="text-gray-800">
                  {model.name}
                </label>
              </div>
            ))}
            {modelLoading && <Loading />}
          </div>
        </details>

        {/* Accordion Item 3 */}
        <details>
          <summary className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold text-gray-800">Moteur</h3>
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300">
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="p-4 max-h-60 overflow-auto">
            {engines.map((engine, index) => (
              <div key={"engine-" + index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`engine-${engine.id}`}
                  name="engine"
                  value={engine.id}
                  checked={engineSelected === engine.id}
                  onChange={() => changeEngine(engine.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`engine-${engine.id}`}
                  className="text-gray-800"
                >
                  {engine.name}
                </label>
              </div>
            ))}
            {engineLoading && <Loading />}
          </div>
        </details>
        {/* Accordion Item 4 */}
        <details>
          <summary className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold text-gray-800">Ville</h3>
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300">
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="p-4 max-h-60 overflow-auto">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id={`city-${undefined}`}
                name="city"
                value={undefined}
                checked={citySelected === undefined}
                onChange={() => changeCity(undefined)}
                className="mr-2"
              />
              <label htmlFor={`city-${undefined}`} className="text-gray-800">
                Toutes les villes
              </label>
            </div>
            {cities.map((city, index) => (
              <div key={"city-" + index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`city-${city.id}`}
                  name="city"
                  value={city.id}
                  checked={citySelected === city.id}
                  onChange={() => changeCity(city.id)}
                  className="mr-2"
                />
                <label htmlFor={`city-${city.id}`} className="text-gray-800">
                  {city.name}
                </label>
              </div>
            ))}
            {cityLoading && <Loading />}
          </div>
        </details>
      </div>
    </div>
  );
};

export default Accordion;
