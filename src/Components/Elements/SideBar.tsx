import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { useRouteTransition } from "@Hooks/index";

const categories = [
  {
    title: "Women's Fashion",
    children: [
      {
        title: "Dresses",
        category: "womens-dresses",
      },
      {
        title: "Shoes",
        category: "womens-shoes",
      },
      {
        title: "Bags",
        category: "womens-bags",
      },
    ],
  },
  {
    title: "Men's Fashion",
    children: [
      {
        title: "Shirts",
        category: "mens-shirts",
      },
      {
        title: "Shoes",
        category: "mens-shoes",
      },
      {
        title: "Watches",
        category: "mens-watches",
      },
    ],
  },
  {
    title: "Electronics",
    category: "mobile-accessories",
  },
  {
    title: "Home & Lifestyle",
    category: "home-decoration",
  },
  {
    title: "Skin Care",
    category: "skin-care",
  },
  {
    title: "Sports & Outdoor",
    category: "sports-accessories",
  },
  {
    title: "Groceries & Pets",
    category: "groceries",
  },
  {
    title: "Health & Beauty",
    category: "beauty",
  },
];

export default function SideBar() {
  const transition = useRouteTransition();

  return (
    <aside className="hidden lg:block lg:max-h-[384px] lg:w-[233px] lg:border-r lg:border-black/20 lg:pr-6 lg:pt-10 dark:lg:border-white/20">
      <ul className="space-y-1">
        {categories.map((item) => (
          <li key={item.title} className="group relative">
            <Link
              to={`/products?category=${item.category}`}
              onClick={() => {
                transition.start();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 font-poppins text-[15px] font-medium text-black transition-all duration-300 hover:bg-red-50 hover:text-[#DB4444] dark:text-neutral-200 dark:hover:bg-red-500/10"
            >
              <span>{item.title}</span>

              {item.children && (
                <ChevronRight
                  size={17}
                  className="translate-x-0 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              )}
            </Link>

            {item.children && (
              <ul className="invisible absolute left-full top-0 z-50 ml-2 w-56 rounded-xl border bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-900">
                {item.children.map((child) => (
                  <li key={child.category}>
                    <Link
                      to={`/products?category=${child.category}`}
                      onClick={() => {
                        transition.start();
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="block rounded-md px-3 py-2 transition hover:bg-red-50 dark:hover:bg-neutral-800"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
