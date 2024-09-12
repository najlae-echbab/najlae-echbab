import React from "react";
import { Route, Routes, Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import DetailProduct from "./pages/product/DetailProduct";
import DetailBlog from "./pages/blog/DetailBlog";
import Products from "./pages/product/Products";
import ScrollToTopButton from "./components/ScrollToTop";
import Blogs from "./pages/blog/Blogs";
import About from "./pages/About";
import Contact from "./pages/contacts/Contact";

const Header = () => {
  return (
    <>
      <div className="relative">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <ScrollToTopButton />
      </div>
      <Footer />
    </>
  );
};
const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path={"/produits"} element={<Products />} />
          <Route path={"/blogs"} element={<Blogs />} />
          <Route path={"/produit/:slug/:id"} element={<DetailProduct />} />
          <Route path={"/blog/:slug/:id"} element={<DetailBlog />} />
          <Route path={"/about"} element={<About />} /> 
          <Route path="/contact" element={<Contact />} />
        
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
