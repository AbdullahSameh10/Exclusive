import { createContext } from "react";
import type { Product } from "@Components/Data.types";

interface ProductsContextType {
  products: Product[];

  loading: boolean;

  error: string | null;

  getProductById: (id: number) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType>({} as ProductsContextType);

export default ProductsContext;
