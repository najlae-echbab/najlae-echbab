/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import { BlogInterface, ImagesInterface } from "../../cor/_models";
import { FormatDate } from "../../helpers/FormateDate";
import { Slideshow } from "../../components/Slider";
import RelatedItems from "./RelatedItems";
import RightDetailBlog from "./RightDetailBlog";
import VideoPlayer from "../../components/VideoPlayer";
import Title from "../../components/Title";
import { getBlogById } from "../../cor/_requests";

const DetailBlog = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState<BlogInterface>(useLocation().state);
  const [images, setImages] = useState<any[]>([]);

  const filterImages = (blog: BlogInterface) => {
    const imagesData = blog.images.map((image: ImagesInterface) => ({
      url: image.image_url,
    }));
    imagesData.unshift({
      url: blog.image_url,
    });
    setImages(imagesData);
  };

  const getBlogData = useCallback(async () => {
    try {
      if (id) {
        const blogData = await getBlogById(Number(id));
        setBlog(blogData);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }, [id]);

  useMemo(() => {
    if (id && !blog?.id) {
      getBlogData();
    }
  }, [id, getBlogData]);
  useEffect(() => {
    filterImages(blog);
  }, [blog]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blog]);

  return (
    <div>
      <Title title={"Blogs - " + (blog?.title ?? "")} />

      <div className="grid grid-cols-12 p-5 gap-5">
        <div className="col-span-12 lg:col-span-9">
          <div className="p-5  mb-4">
            <h1 className="text-5xl mb-2">{blog?.title}</h1>
            <p className="mb-4">
              {blog?.category.name} | {FormatDate(blog?.created_at)}
            </p>
            <div className="mb-[2rem]">
              <Slideshow images={images} />
            </div>

            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: blog?.content ?? "",
              }}
            ></div>
          </div>
          {blog?.url && <VideoPlayer url={blog.url} />}
        </div>
        <div className="col-span-12 lg:col-span-3">
          <RightDetailBlog />
        </div>
      </div>
      <hr />
      <RelatedItems blog={blog?.category.id} />
    </div>
  );
};

export default DetailBlog;
