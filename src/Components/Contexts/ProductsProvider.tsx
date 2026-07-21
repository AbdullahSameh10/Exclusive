import { useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/Components/Types/Data.types";
import ProductsContext, { type CategoriesTypes } from "./ProductsContext";

interface Props {
  children: ReactNode;
}

export default function ProductsProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoriesTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      Promise.all([
        fetch("https://dummyjson.com/products?limit=0"),
        fetch("https://dummyjson.com/products/categories"),
      ])
        .then(async ([productsRes, categoriesRes]) => ({
          products: await productsRes.json(),
          categories: await categoriesRes.json(),
        }))
        .then(({ products, categories }) => {
          setProducts(products.products);
          setCategories(categories);
        })
        .finally(() => setLoading(false));
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = (id: number) =>
    products.find((product) => product.id === id);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
