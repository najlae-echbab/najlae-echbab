import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { useMemo, useState } from "react";
import { BrandInterface } from "../../cor/_models";
import { getBrands } from "../../cor/_requests";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
const Brands = () => {
  const [brands, setBrands] = useState<BrandInterface[]>([]);
  const [brandsLoading, setBrandsLoading] = useState<boolean>(false);
  const getBrandsList = async () => {
    try {
      setBrandsLoading(true);

      const categoryData = await getBrands("items=all");
      setBrands(categoryData);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setBrandsLoading(false);
    }
  };
  useMemo(() => {
    getBrandsList();
  }, []);
  return (
    <div className="flex flex-wrap flex-col justify-center p-4 mb-7">
      <h3 className="text-center   title">Trouver la pièce par constructeur</h3>
      <div className="w-full ">
        {brands.length > 0 && (
          <Swiper
            className="text-center w-75 swiperHome"
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop={true}
            // navigation
            pagination
            slidesPerView={4}
            autoplay={{
              delay: 2000,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 2,
              },
              639: {
                slidesPerView: 4,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            {brands.map((brand: BrandInterface) => (
              <SwiperSlide key={brand.id} className="h-[7rem] w-[7rem]">
                <Link
                  to={"/produits"}
                  state={{ brandSelected: brand.id }}
                  className="w-100 flex justify-center "
                >
                  <img
                    src={brand.image_url}
                    alt=""
                    width={100}
                    className="img-size h-[7rem] w-[7rem] object-contain border rounded-xl shadow-sm"
                  />{" "}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {brandsLoading && <Loading />}
      </div>
    </div>
  );
};

export default Brands;
