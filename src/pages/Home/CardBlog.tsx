import React from "react";
import { BlogInterface } from "../../cor/_models";
import { Link } from "react-router-dom";
type Props = {
  blog: BlogInterface;
};
const CardBlog: React.FC<Props> = ({ blog }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full rounded-xl"
        src={blog.image_url}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{blog.title}</div>
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{
            __html:
              blog.content.length > 100
                ? blog.content.slice(0, 100) + "..."
                : blog.content,
          }}
        ></div>
      </div>

      <div className="px-6 pt-4 pb-2 mb-4">
        <Link
          state={blog}
          to={`/blog/${blog.slug}/${blog.id}`}
          className="btn-primary "
        >
          Affichez details
        </Link>{" "}
      </div>
    </div>
  );
};

export default CardBlog;
