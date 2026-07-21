import { createContext } from "react";
import type { Product } from "@/Components/Types/Data.types";

export type CategoriesTypes = {
  slug: string;
  name: string;
  url: string;
};

type ProductsContextType = {
  products: Product[];

  loading: boolean;

  categories: CategoriesTypes[];

  error: string | null;

  getProductById: (id: number) => Product | undefined;
};

const ProductsContext = createContext<ProductsContextType>(
  {} as ProductsContextType,
);

export default ProductsContext;
