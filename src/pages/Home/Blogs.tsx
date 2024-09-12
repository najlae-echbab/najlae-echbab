import { useState, useMemo } from "react";
import CardBlog from "./CardBlog";
import { BlogInterface } from "../../cor/_models";
import { getBlog } from "../../cor/_requests";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const getItems = async () => {
    const { data } = await getBlog("item_per_page=4");
    setBlogs(data);
  };

  useMemo(() => {
    getItems();
  }, []);
  return (
    <div className="w-full mb-4">
      <h1 className="text-5xl  text-font mb-4 mx-auto text-center w-full mt-8">
        les novaux blogs
      </h1>
      <div className="p-8  gap-4 grid grid-cols-12">
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
      <div className="flex-col-center">
        <Link to={"/blogs"} className="btn-primary ">
          Affichez plus
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
