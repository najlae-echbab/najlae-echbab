import React, { useMemo, useState, useCallback } from "react";
import { ProductInterface } from "../../cor/_models";
import { getProduct } from "../../cor/_requests";
import Card from "../Home/Card";

type Props = {
  category: number;
};
const RelatedItems: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const getItems = useCallback(async () => {
    const { data } = await getProduct("filter_category_id=" + category);
    setProducts(data);
  }, [category]);

  useMemo(() => {
    getItems();
  }, [category, getItems]);
  return (
    <div className="w-full">
      <h1 className="text-5xl  text-font mb-4 mx-auto text-center w-full mt-8">
        Produits associés
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
    </div>
  );
};

export default RelatedItems;
