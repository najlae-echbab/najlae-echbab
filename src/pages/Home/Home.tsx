import React from "react";
import Slider from "./Slider";
import NewProducts from "./NewProducts";
import SectionInfo from "./SectionInfo";
import Blogs from "./Blogs";
import Brands from "./Brands";

const Home = () => {
  return (
    <div>
      <Slider />
      <NewProducts />
      <Brands />
     
      <Blogs />
    </div>
  );
};

export default Home;
