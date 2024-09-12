import React, { useMemo, useState } from "react";
import { CategoryInterface, BlogInterface } from "../cor/_models";
import { getBlogCategories } from "../cor/_requests";
import Loading from "./Loading";

type Props = {
  setBlogs: (blogs: BlogInterface[]) => void;

  categorySelected: number | undefined;

  setCategorySelected: (categorySelected: number | undefined) => void;
};
const BlogAccordion: React.FC<Props> = ({
  categorySelected,
  setBlogs,
  setCategorySelected,
}) => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);

  // Get brands

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

  const changeCategory = async (id: number | undefined) => {
    await setBlogs([]);
    setCategorySelected(id);
  };

  return (
    <div className="max-w-lg mx-auto my-4">
      <div className="border border-gray-200 rounded-md">
        {/* BlogAccordion Item 0 */}
        <details className="border-b">
          <summary className="flex items-center justify-between p-4 bg-[#f8f8f8] hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold text-gray-800">Categories</h3>
            <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300">
              <svg
                className="w-4 h-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </summary>
          <div className="p-4 max-h-60	  overflow-auto">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id={`category-${undefined}`}
                name="category"
                value={undefined}
                checked={categorySelected === undefined}
                onChange={() => changeCategory(undefined)}
                className="mr-2"
              />
              <label
                htmlFor={`category-${undefined}`}
                className="text-gray-800"
              >
                Toutes les catégories
              </label>
            </div>
            {categories.map((category, index) => (
              <div
                key={"category" + index + ""}
                className="flex items-center mb-2"
              >
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  value={category.id}
                  checked={categorySelected === category.id}
                  onChange={() => changeCategory(category.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-gray-800"
                >
                  {category.name}
                </label>
              </div>
            ))}
            {categoriesLoading && <Loading />}
          </div>
        </details>
      </div>
    </div>
  );
};

export default BlogAccordion;
