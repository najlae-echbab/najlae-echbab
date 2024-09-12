import React, { useMemo, useState, useCallback } from "react";
import { BlogInterface } from "../../cor/_models";
import { getBlog } from "../../cor/_requests";
import CardBlog from "../Home/CardBlog";

type Props = {
  blog?: number;
};
const RelatedItems: React.FC<Props> = ({ blog }) => {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const getItems = useCallback(async () => {
    const { data } = await getBlog("filter_category_id=" + blog);
    setBlogs(data);
  }, [blog]);

  useMemo(() => {
    getItems();
  }, [blog, getItems]);
  return (
    <div className="w-full">
      <h1 className="text-5xl  text-font mb-4 mx-auto text-center w-full mt-8">
        Blog associés
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
    </div>
  );
};

export default RelatedItems;
