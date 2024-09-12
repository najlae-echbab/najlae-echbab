import React from "react";
import { ProductInterface } from "../../cor/_models";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";

type Props = {
  product: ProductInterface;
};
const Card: React.FC<Props> = ({ product }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg pb-4">
      <img
        className="w-full h-[15rem]"
        src={product.image_url}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        {/* <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html:
              product.description.length > 100
                ? product.description.slice(0, 100) + "..."
                : product.description,
          }}
        ></div> */}
        <p className="text-gray-700 text-base mt-3 flex  items-center gap-1">
          <span>
            <MdPlace />
          </span>{" "}
          <strong>{product.city.name}</strong>
        </p>
      </div>

      <div className="px-6 pt-4 pb-2 self-end">
        <Link
          state={product}
          to={`/produit/${product.slug}/${product.id}`}
          className="btn-primary "
        >
          Affichez details
        </Link>
      </div>
    </div>
  );
};

export default Card;
