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

  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setShuffledProducts(shuffleArray(products));
  }, [products]);

  const PRODUCTS_PER_PAGE = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts =
    selectedCategory === "all"
      ? shuffledProducts
      : shuffledProducts.filter((p) => p.category === selectedCategory);

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

      <section className="mx-auto flex max-w-[1170px] gap-8 py-10">
        <CategoriesSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setCurrentPage={setCurrentPage}
        />

        <div className="flex-1">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {useCapitalizeSentence(selectedCategory)} Products
              </h1>

              <p className="text-gray-500">
                Showing {start}–{end} of {filteredProducts.length} products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.length !== 0
              ? paginatedProducts.map((product, i) =>
                  !loading ? (
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
                  ) : (
                    <ProductCardLoading key={i} />
                  ),
                )
              : [...Array(15)].map((i) => <ProductCardLoading key={i} />)}
          </div>
          <div className="mt-12 flex justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => p - 1);
                window.scrollTo({ top: 170, behavior: "smooth" });
              }}
              className="h-10 w-10 rounded-lg border disabled:opacity-40"
            >
              ←
            </button>

            {pages.map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className="flex h-10 w-10 items-center justify-center"
                >
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(Number(page));
                    window.scrollTo({ top: 170, behavior: "smooth" });
                  }}
                  className={`h-10 w-10 rounded-lg transition ${
                    currentPage === page
                      ? "bg-[#DB4444] text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => p + 1);
                window.scrollTo({ top: 170, behavior: "smooth" });
              }}
              className="h-10 w-10 rounded-lg border disabled:opacity-40"
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
