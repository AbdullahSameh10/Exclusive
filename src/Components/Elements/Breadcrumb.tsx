import { Link } from "react-router";
import { useRouteTransition } from "@Hooks/index";

type BreadcrumbPropsTypes = {
  pages: string[];
  links: string[];
  currentPage: string;
};

export default function Breadcrumb({
  pages,
  links,
  currentPage,
}: BreadcrumbPropsTypes) {
  const transition = useRouteTransition();

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 mt-8 overflow-x-auto md:mt-12 lg:mt-20"
    >
      <div className="flex min-w-max items-center font-poppins text-sm">
        {pages.map((page, i) => (
          <div key={page} className="flex items-center">
            <Link
              to={links[i]}
              onClick={() => {
                transition.start();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="whitespace-nowrap text-neutral-500 transition-colors duration-300 hover:text-[#DB4444] dark:text-neutral-400 dark:hover:text-[#DB4444]"
            >
              {page}
            </Link>

            <span className="mx-3 text-neutral-400 dark:text-neutral-600">
              /
            </span>
          </div>
        ))}

        <span className="whitespace-nowrap font-medium text-black dark:text-white">
          {currentPage}
        </span>
      </div>
    </nav>
  );
}
