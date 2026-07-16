import { useEffect, useState, type ReactNode } from "react";
import type { Product, ProductsResponse } from "@Components/Data.types";
import ProductsContext from "./ProductsContext";

interface Props {
  children: ReactNode;
}

export default function ProductsProvider({ children }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/products?limit=194",
        );

        const data: ProductsResponse = await response.json();

        setProducts(data.products);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: number) =>
    products.find((product) => product.id === id);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
