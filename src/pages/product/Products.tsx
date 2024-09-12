import React, { useCallback, useMemo, useState } from "react";
import { ProductInterface } from "../../cor/_models";
import { FaArrowUpShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import { getProduct } from "../../cor/_requests";
import Card from "../Home/Card";
import Accordion from "../../components/Accordion";
import { CiFilter } from "react-icons/ci";
import Loading from "../../components/Loading";
import { useLocation } from "react-router";
import Title from "../../components/Title";

const Products = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const { state } = useLocation();
  const [orderBy, setOrderBy] = useState<string>("id");
  const [orderDir, setOrderDir] = useState<string>("desc");
  const [loading, setLoading] = useState<boolean>(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [brandSelected, setBrandSelected] = useState<number | undefined>(
    state?.brandSelected
  );
  const [modelSelected, setModelSelected] = useState<number | undefined>(
    state?.modelSelected
  );
  const [engineSelected, setEngineSelected] = useState<number | undefined>(
    state?.engineSelected
  );
  const [citySelected, setCitySelected] = useState<number | undefined>();
  const [categorySelected, setCategorySelected] = useState<
    number | undefined
  >();

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data, meta } = await getProduct(
        `item_per_page=10&sort=${orderBy}&order=${orderDir}&filter_brand_id=${brandSelected}&filter_brand_model_id=${modelSelected}&filter_engine_id=${engineSelected}&filter_city_id=${citySelected}&filter_category_id=${categorySelected}&page=${currentPage}`
      );
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setTotalProduct(meta.total);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [
    orderBy,
    orderDir,
    currentPage,
    brandSelected,
    modelSelected,
    engineSelected,
    citySelected,
    categorySelected,
  ]);

  useMemo(() => {
    getItems();
  }, [
    getItems,
    orderBy,
    orderDir,
    currentPage,
    brandSelected,
    modelSelected,
    engineSelected,
    citySelected,
    categorySelected,
  ]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProducts([]);
    setOrderBy(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderDirChange = async () => {
    await setProducts([]);
    setOrderDir((prevOrderDir) => (prevOrderDir === "desc" ? "asc" : "desc"));
    setCurrentPage(1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Title title={"Produits"} />
      <div className="p-4 ">
        {/* Mobile Filter Button */}
        <button
          className="lg:hidden bg-[#a7a2a2] p-4 opacity-[80%] rounded-full fixed  top-[50%]"
          onClick={toggleSidebar}
        >
          <CiFilter className="text-white" />
        </button>

        <div className="grid grid-cols-12 gap-4">
          {/* Filter Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-500 lg:relative lg:translate-x-0 lg:col-span-3 w-full p-4 border rounded-xl filter bg-white lg:bg-transparent`}
          >
            <button
              className="lg:hidden absolute top-4 right-4 mb-4 hover:text-red-500 text-xl text-black"
              onClick={toggleSidebar}
            >
              X
            </button>

            <p className="font-bold text-lg mb-3">Filtre :</p>
            <div className="border-t-2">
              <Accordion
                setProducts={setProducts}
                brandSelected={brandSelected}
                setBrandSelected={setBrandSelected}
                modelSelected={modelSelected}
                setModelSelected={setModelSelected}
                engineSelected={engineSelected}
                setEngineSelected={setEngineSelected}
                setCitySelected={setCitySelected}
                citySelected={citySelected}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
              />
            </div>
          </div>

          {/* Products */}
          <div className="col-span-12 lg:col-span-9">
            <div className="header flex justify-between bg-[#f8f8f8] p-4">
              <p>
                {products.length}/{totalProduct} Produits
              </p>
              <div className="flex gap-3 me-4">
                <label htmlFor="order">Trie Par :</label>
                <select
                  name="order border"
                  className=""
                  id="order"
                  onChange={(e) => handleOrderByChange(e)}
                  value={orderBy}
                >
                  <option value="id">Position</option>
                  <option value="price">Prix</option>
                  <option value="name">Nom</option>
                </select>
                <div>
                  {orderDir === "desc" ? (
                    <FaArrowUpWideShort
                      className="h-full cursor-pointer"
                      onClick={handleOrderDirChange}
                    />
                  ) : (
                    <FaArrowUpShortWide
                      className="h-full cursor-pointer"
                      onClick={handleOrderDirChange}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="body">
              {loading && <Loading />}
              <div className="p-4 gap-4 grid grid-cols-12">
                {products &&
                  products.length > 0 &&
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <Card product={product} />
                    </div>
                  ))}
              </div>
              {!loading && products.length == 0 && (
                <div className="flex justify-center">
                  <p className="text-3xl text-font">Aucun produit</p>
                </div>
              )}
              <div className="flex-col-center">
                <button
                  className={`btn-primary`}
                  hidden={loading || products.length == totalProduct}
                  onClick={handleLoadMore}
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
