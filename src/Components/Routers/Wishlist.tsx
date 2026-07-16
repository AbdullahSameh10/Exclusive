import { useContext, useMemo } from "react";
import { Button, ProductCard } from "@Elements/index";
import { Section } from "@Layouts/index";
import { UserContext, ProductsContext } from "@Contexts/index";

export default function Wishlist() {
  const { userWishlist } = useContext(UserContext);

  const { products, loading } = useContext(ProductsContext);

  const wishlistProducts = useMemo(() => {
    return products.filter((product) => userWishlist.includes(String(product.id)));
  }, [products, userWishlist]);

  const recommendations = products.filter((product) => !userWishlist.includes(String(product.id))).slice(0, 4);

  const moveAllToBag = () => {
    console.log("Move all wishlist items to cart");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-20 py-20">
      {/* Wishlist */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-medium">
            Wishlist ({wishlistProducts.length})
          </h1>

          <button
            onClick={moveAllToBag}
            className="self-start border-2 border-black rounded-md bg-transparent px-12 py-4 transition-all duration-300 text-black hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white sm:self-auto"
          >
            Move All To Bag
          </button>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              sale={Math.ceil(product.discountPercentage)}
              rating={product.rating}
              thumbnail={product.thumbnail}
              reviewsNo={product.reviews.length}
              isTrash
              trashPage
            />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <Section
        category="Just For You"
        button={
          <Button className="border border-gray-300 bg-transparent px-12 text-black transition hover:bg-gray-100">
            See All
          </Button>
        }
      >
        <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              sale={Math.ceil(product.discountPercentage)}
              rating={product.rating}
              thumbnail={product.thumbnail}
              reviewsNo={product.reviews.length}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
