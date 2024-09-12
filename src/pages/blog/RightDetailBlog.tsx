import React, { useMemo, useState } from "react";
import tiktok from "../../../public/img/social network/tik-tok.png";
import facebook from "../../../public/img/social network/facebook.png";
import instagram from "../../../public/img/social network/instagram.png";
import youtube from "../../../public/img/social network/youtube.png";
import { getBlogCategories } from "../../cor/_requests";
import { CategoryInterface } from "../../cor/_models";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const RightDetailBlog = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const getCategoresList = async () => {
    try {
      setCategoriesLoading(true);

      const categoryData = await getBlogCategories("items=all");
      setCategories(categoryData);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setCategoriesLoading(false);
    }
  };
  useMemo(() => {
    getCategoresList();
  }, []);
  return (
    <div>
      {/* socilaMedia */}
      <div className="socilaMedia border rounded-xl p-4 mb-5">
        <h2 className=" text-2xl text-center font-bold mb-4">Réseau social</h2>
        <div className="grid grid-cols-12 gap-5">
          <a
            target="_blank"
            href={import.meta.env.VITE_TIKTOK_URL}
            className="scoial"
          >
            <img src={tiktok} alt="tiktok" /> <p>Tik-tok</p>
          </a>
          <a
            target="_blank"
            href={import.meta.env.VITE_FACEBOOK_URL}
            className="scoial"
          >
            <img src={facebook} alt="facebook" /> <p>Facebook</p>
          </a>
          <a
            target="_blank"
            href={import.meta.env.VITE_YOUTUBE_URL}
            className="scoial"
          >
            <img src={youtube} alt="youtube" /> <p>Youtube</p>
          </a>
          <a
            target="_blank"
            href={import.meta.env.VITE_INSTAGARAM_URL}
            className="scoial"
          >
            <img src={instagram} alt="instagram" /> <p>Instagram</p>
          </a>
        </div>
      </div>
      {/* categories */}
      <div className=" border rounded-xl p-4 ">
        <h2 className=" text-2xl text-center font-bold mb-4">Categories</h2>
        <div className="h-max-[45vh] overflow-auto">
          {categories.map((category, index) => (
            <Link key={index} to="/blogs" state={{ category_id: category.id }}>
              <div
                className="relative  p-2 w-full text-center border mb-4 rounded-xl"
                style={{
                  backgroundImage: `url(${category.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
                {/* Text */}
                <p className="relative z-10  bg-opacity-50 text-white text-center capitalize text-lg font-semibold py-2 px-4 shadow-lg">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}

          {categoriesLoading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default RightDetailBlog;
