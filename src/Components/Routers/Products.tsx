import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Breadcrumb,
  ProductCard,
  CategoriesSidebar,
  ProductCardLoading,
} from "@Elements/index";
import { ProductsContext } from "@Contexts/index";
import { shuffleArray } from "@Utilities/index";
import type { Product } from "@/Components/Types/Data.types";
import { useCapitalizeSentence, useRouteTransition } from "@Hooks/index";

export default function Products() {
  const transition = useRouteTransition();

  const { products, loading, categories } = useContext(ProductsContext);

  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";

  const searchQuery = searchParams.get("search")?.trim().toLowerCase() ?? "";

  const PRODUCTS_PER_PAGE = 15;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    transition.end();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setShuffledProducts(shuffleArray(products));
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredProducts = shuffledProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.brand?.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const start =
    filteredProducts.length === 0
      ? 0
      : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;

  const end = Math.min(
    currentPage * PRODUCTS_PER_PAGE,
    filteredProducts.length,
  );

  const pages = getPagination(currentPage, totalPages);

  return (
    <>
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Products" />

      <section className="mx-auto flex w-full max-w-[1170px] flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:px-0">
        <CategoriesSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setCurrentPage={setCurrentPage}
        />

        <div className="flex-1">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : `${useCapitalizeSentence(selectedCategory)} Products`}
              </h1>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                {searchQuery
                  ? `${filteredProducts.length} result${
                      filteredProducts.length !== 1 ? "s" : ""
                    } found`
                  : `Showing ${start}–${end} of ${filteredProducts.length} products`}
              </p>
            </div>
          </div>

          <div className="grid mx-auto w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [...Array(15)].map((_, i) => <ProductCardLoading key={i} />)
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-black/10 bg-gray-50 px-5 text-center dark:border-white/10 dark:bg-white/5">
                <h2 className="text-2xl font-semibold text-black dark:text-white">
                  No products found
                </h2>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Try another search keyword.
                </p>
              </div>
            ) : (
              paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  stock={product.stock}
                  minAmount={product.minimumOrderQuantity}
                  price={product.price}
                  rating={product.rating}
                  thumbnail={product.thumbnail}
                  reviewsNo={product.reviews.length}
                />
              ))
            )}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => p - 1);

                window.scrollTo({
                  top: 170,
                  behavior: "smooth",
                });
              }}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/20 text-black transition-all duration-300 hover:bg-[#DB4444] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-[#DB4444]"
            >
              ←
            </button>

            {pages.map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className="flex h-10 w-10 items-center justify-center text-black dark:text-white"
                >
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(Number(page));

                    window.scrollTo({
                      top: 170,
                      behavior: "smooth",
                    });
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 ${
                    currentPage === page
                      ? "bg-[#DB4444] text-white"
                      : `border border-black/20 text-black hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10`
                  } `}
                >
                  {page}
                </button>
              ),
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => p + 1);

                window.scrollTo({
                  top: 170,
                  behavior: "smooth",
                });
              }}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/20 text-black transition-all duration-300 hover:bg-[#DB4444] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white dark:hover:bg-[#DB4444]"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function getPagination(current: number, total: number) {
  const delta = 1;

  const pages: (number | string)[] = [];

  const range: number[] = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  pages.push(1);

  if (current - delta > 2) {
    pages.push("...");
  }

  pages.push(...range);

  if (current + delta < total - 1) {
    pages.push("...");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}