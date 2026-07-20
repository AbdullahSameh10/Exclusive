import { useContext, useEffect, useMemo } from "react";
import { Breadcrumb, Button, ProductCard } from "@Elements/index";
import { Section } from "@Layouts/index";
import { UserContext, ProductsContext } from "@Contexts/index";
import { shuffleArray } from "@Utilities/index";
import { Link, useNavigate } from "react-router";
import { useRouteTransition } from "@Hooks/index";

export default function Wishlist() {
  const { userWishlist } = useContext(UserContext);

  const { products, loading } = useContext(ProductsContext);

  const transition = useRouteTransition();

  useEffect(() => {
    transition.end();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const shuffledProducts = useMemo(() => {
    return shuffleArray(products);
  }, [products]);
  const navigate = useNavigate();

  const wishlistProducts = shuffledProducts.filter((product) =>
    userWishlist.includes(String(product.id)),
  );

  const recommendations = shuffledProducts.slice(0, 4);

  const moveAllToBag = () => {
    console.log("Move all wishlist items to cart");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Wishlist" />
      <div className="flex flex-col gap-20 py-20 pt-10">
        {/* Wishlist */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">
              Wishlist ({wishlistProducts.length})
            </h1>

            {wishlistProducts.length > 0 && (
              <button
                onClick={moveAllToBag}
                className="self-start rounded-md border-2 border-black bg-transparent px-12 py-4 font-semibold text-black transition-all duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white sm:self-auto"
              >
                Move All To Bag
              </button>
            )}
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-[#FAFAFA] px-6 text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#DB4444]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="h-12 w-12 fill-[#DB4444]"
                >
                  <path d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" />
                </svg>
              </div>

              <h2 className="mb-3 font-inter text-3xl font-semibold">
                Your wishlist is empty
              </h2>

              <p className="mb-8 max-w-md font-poppins text-gray-500">
                Save your favorite products here so you can quickly find them
                later. Start exploring and add the items you love.
              </p>

              <Button onClick={() => navigate("/")} className="px-10">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  sale={Math.ceil(product.discountPercentage)}
                  stock={product.stock}
                  minAmount={product.minimumOrderQuantity}
                  rating={product.rating}
                  thumbnail={product.thumbnail}
                  reviewsNo={product.reviews.length}
                  isTrash
                  trashPage
                />
              ))}
            </div>
          )}
        </div>

        {/* Recommendations */}
        <Section category="Just For You" className="relative">
          <Link
            to="/products"
            onClick={() => {
              transition.start();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <button className="absolute right-0 top-0 self-start rounded-md border-2 border-black bg-transparent px-12 py-4 font-semibold text-black transition-all duration-300 hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white sm:self-auto">
              See All
            </button>
          </Link>
          <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {recommendations.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                sale={Math.ceil(product.discountPercentage)}
                stock={product.stock}
                minAmount={product.minimumOrderQuantity}
                rating={product.rating}
                thumbnail={product.thumbnail}
                reviewsNo={product.reviews.length}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
