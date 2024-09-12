import { useState, useMemo } from "react";
import Card from "./Card";
import { ProductInterface } from "../../cor/_models";
import { getProduct } from "../../cor/_requests";
import { Link } from "react-router-dom";

const NewProducts = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const getItems = async () => {
    const { data } = await getProduct("item_per_page=4");
    setProducts(data);
  };

  useMemo(() => {
    getItems();
  }, []);
  return (
    <div className="w-full mb-7">
      <h1 className="text-5xl  text-font mb-4 mx-auto text-center w-full mt-8">
        les novaux produits
      </h1>
      <div className="p-8  gap-4 grid grid-cols-12">
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
      <div className="flex-col-center">
        <Link to="/produits" className="btn-primary ">
          Affichez plus
        </Link>
      </div>
    </div>
  );
};

export default NewProducts;
