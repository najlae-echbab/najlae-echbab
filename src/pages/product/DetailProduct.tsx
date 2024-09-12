import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import { ImagesInterface, ProductInterface } from "../../cor/_models";
import CustomImageGallery from "../../components/ImageGallery";
import { MdPlace } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import RelatedItems from "./RelatedItems";
import Title from "../../components/Title";
import { getProductById } from "../../cor/_requests";

const DetailProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductInterface>(useLocation().state);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<any[]>([]);
  console.log(images);

  const filterImage = (product: ProductInterface) => {
    const imagesData = product.images.map((image: ImagesInterface) => ({
      original: image.image_url,
      thumbnail: image.image_url,
    }));
    imagesData.unshift({
      original: product.image_url,
      thumbnail: product.image_url,
    });
    setImages(imagesData);
  };
  const getProductData = useCallback(async () => {
    try {
      if (id) {
        const productD = await getProductById(Number(id));
        setProduct(productD);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, [id]);
  useEffect(() => {
    filterImage(product);
  }, [product]);

  useMemo(() => {
    if (id && !product?.id) {
      getProductData();
    }
  }, [id, getProductData]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  return (
    <div>
      <Title title={"Produits - " + product?.name + ""} />

      <div className="grid grid-cols-12 ">
        <div className="col-span-12 lg:col-span-6 p-8">
          <CustomImageGallery images={images} />{" "}
        </div>
        <div className="col-span-12 lg:col-span-6 p-8 border-none lg:border ">
          <h1 className="text-5xl mb-1 ">{product?.name}</h1>
          <p className="mb-4">Category : {product?.category?.name}</p>
          <p className="text-3xl text-red-500">
            {product?.price && "Prix : " + product?.price + " DH"}
          </p>
          <div
            className="text-gray-700  mb-4"
            dangerouslySetInnerHTML={{
              __html: product?.description,
            }}
          ></div>
          {/* contact */}

          <div>
            <p className="text-3xl text-font ">Conatct :</p>
            <p className="text-gray-700 text-base my-3 flex  items-center gap-1">
              <span>
                <MdPlace />
              </span>{" "}
              <strong>{product?.city?.name}</strong>
            </p>
            <p className="text-gray-700 text-base my-3 flex  items-center gap-1 ">
              <span>
                {" "}
                <FaPhone />
              </span>{" "}
              :
              <strong>
                {product?.user?.phone}
                {product?.user?.phone_2 &&
                  product?.user?.phone_2 != "null" &&
                  " / " + product?.user?.phone_2}
              </strong>{" "}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <RelatedItems category={product?.category?.id} />
    </div>
  );
};

export default DetailProduct;
