import React, { useCallback, useMemo, useState } from "react";
import Title from "../../components/Title";
import { useLocation } from "react-router";
import { BlogInterface } from "../../cor/_models";
import { getBlog } from "../../cor/_requests";
import { CiFilter } from "react-icons/ci";
import BlogAccordion from "../../components/BlogAccordion";
import { FaArrowUpShortWide, FaArrowUpWideShort } from "react-icons/fa6";
import Loading from "../../components/Loading";
import CardBlog from "../Home/CardBlog";

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalBlog, setTotalBlog] = useState<number>(0);
  const { state } = useLocation();
  const [orderBy, setOrderBy] = useState<string>("id");
  const [orderDir, setOrderDir] = useState<string>("desc");
  const [loading, setLoading] = useState<boolean>(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [categorySelected, setCategorySelected] = useState<number | undefined>(
    state?.category_id
  );

  const getItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data, meta } = await getBlog(
        `item_per_page=10&sort=${orderBy}&order=${orderDir}&filter_category_id=${categorySelected}&page=${currentPage}`
      );
      setBlogs((prevBlogs) => [...prevBlogs, ...data]);
      setTotalBlog(meta.total);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [orderBy, orderDir, currentPage, categorySelected]);

  useMemo(() => {
    getItems();
  }, [getItems, orderBy, orderDir, currentPage, categorySelected]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBlogs([]);
    setOrderBy(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderDirChange = async () => {
    await setBlogs([]);
    setOrderDir((prevOrderDir) => (prevOrderDir === "desc" ? "asc" : "desc"));
    setCurrentPage(1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <Title title="Blogs" />
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
              <BlogAccordion
                setBlogs={setBlogs}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
              />
            </div>
          </div>

          {/* Blogs */}
          <div className="col-span-12 lg:col-span-9">
            <div className="header flex justify-between bg-[#f8f8f8] p-4">
              <p>
                {blogs.length}/{totalBlog} Blogs
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
                  <option value="title">Titre</option>
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
                {blogs &&
                  blogs.length > 0 &&
                  blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <CardBlog blog={blog} />
                    </div>
                  ))}
              </div>
              {!loading && blogs.length == 0 && (
                <div className="flex justify-center">
                  <p className="text-3xl text-font">Aucun blog</p>
                </div>
              )}
              <div className="flex-col-center">
                <button
                  className={`btn-primary`}
                  hidden={loading || blogs.length == totalBlog}
                  onClick={handleLoadMore}
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
