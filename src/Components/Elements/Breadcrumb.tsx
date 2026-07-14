import { Link } from "react-router";
import { useRouteTransition } from "@Hooks/index";

type BreadcrumbPropsTypes = {
  pages: string[];
  links: string[];
  currentPage: string;
};

export default function Breadcrumb(props: BreadcrumbPropsTypes) {
  const { pages, links, currentPage } = props;
  const transition = useRouteTransition();
  return (
    <div className="mt-20 flex font-poppins">
      {pages.map((page, i) => (
        <div key={`${page}Wrapper`} className="mr-3 flex h-5 gap-3">
          <Link
            to={links[i]}
            key={page}
            onClick={() => {
              transition.start();
              window.scrollTo({ top: 0 });
            }}
            className="text-sm text-[#00000080] transition-colors duration-300 hover:text-black"
          >
            {page}
          </Link>
          <span className="text-sm text-[#00000080]" key={i}>
            /
          </span>
        </div>
      ))}
      <span className="text-sm text-black">{currentPage}</span>
    </div>
  );
}
