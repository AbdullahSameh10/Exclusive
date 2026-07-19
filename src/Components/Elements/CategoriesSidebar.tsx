import styles from "@/styles.module.css";
import { useEffect } from "react";
import type { CategoriesTypes } from "@Contexts/ProductsContext";

interface Props {
  categories: CategoriesTypes[];
  selectedCategory: string;
  onSelect: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

export default function CategoriesSidebar({
  categories,
  selectedCategory,
  onSelect,
  setCurrentPage,
}: Props) {
  useEffect(() => {
    onSelect("all");
  }, []);
  return (
    <aside
      className={`sticky top-28 h-[600px] w-64 shrink-0 overflow-hidden rounded-xl bg-white py-6 shadow-[0_0_10px_rgba(0,0,0,0.125)]`}
    >
      <h2 className="mx-6 mb-6 text-xl font-semibold">Categories</h2>

      <div
        className={`${styles.transparentScrollbar} h-full space-y-2 overflow-auto px-6 pb-12`}
      >
        {[
          {
            slug: "all",
            name: "All Products",
            url: "https://dummyjson.com/products?limit=0",
          },
          ...categories,
        ].map((category) => (
          <button
            key={category.slug}
            onClick={() => {
              onSelect(category.slug);
              setCurrentPage(1);
              window.scrollTo({ top: 170, behavior: "smooth" });
            }}
            className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition ${
              selectedCategory === category.slug
                ? "bg-[#DB4444] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <span className="capitalize">{category.name}</span>

            {selectedCategory === category.slug && (
              <div className="h-2 w-2 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
