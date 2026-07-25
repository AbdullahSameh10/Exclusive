import styles from "@/styles.module.css";
import type { CategoriesTypes } from "@Contexts/ProductsContext";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  categories: CategoriesTypes[];
  selectedCategory: string;
  setCurrentPage: (page: number) => void;
}

export default function CategoriesSidebar({
  categories,
  selectedCategory,
  setCurrentPage,
}: Props) {
  const [, setSearchParams] = useSearchParams();

  const [open, setOpen] = useState(false);

  const handleCategoryChange = (slug: string) => {
    setSearchParams(slug === "all" ? {} : { category: slug });

    setCurrentPage(1);

    window.scrollTo({
      top: 170,
      behavior: "smooth",
    });

    setOpen(false);
  };

  const categoryList = [
    {
      slug: "all",
      name: "All Products",
    },
    ...categories,
  ];

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setOpen(true)}
        className="mb-6 flex w-fit items-center gap-2 rounded-lg border border-black/20 px-4 py-2 font-poppins text-sm text-black transition hover:bg-[#DB4444] hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-[#DB4444] lg:hidden"
      >
        <FontAwesomeIcon icon={faFilter} />
        Categories
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform overflow-hidden rounded-r-xl bg-white py-6 shadow-xl transition-transform duration-300 dark:bg-[#111] ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:top-28 lg:h-[600px] lg:w-64 lg:translate-x-0 lg:rounded-xl`}
      >
        <div className="flex items-center justify-between px-6 lg:block">
          <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Categories
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="mb-6 text-xl text-black dark:text-white lg:hidden"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div
          className={` ${styles.transparentScrollbar} ${styles.redScrollbar} h-full space-y-2 overflow-auto px-6 pb-12`}
        >
          {categoryList.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all duration-300 ${
                selectedCategory === category.slug
                  ? "bg-[#DB4444] text-white"
                  : `text-black hover:bg-gray-100 dark:text-white dark:hover:bg-white/10`
              } `}
            >
              <span className="capitalize">{category.name}</span>

              {selectedCategory === category.slug && (
                <div className="h-2 w-2 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
