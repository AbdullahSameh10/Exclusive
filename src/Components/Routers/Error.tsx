import { Link } from "react-router";
import { Breadcrumb, Button } from "../Elements";

export default function Error() {
  return (
    <>
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="404 Error" />

      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-5 py-16 text-center sm:gap-8 md:gap-10">
        <h1 className="font-inter text-6xl font-medium leading-none text-gray-900 dark:text-white sm:text-7xl md:text-8xl lg:text-[110px] lg:leading-[115px]">
          404 Not Found
        </h1>

        <span className="max-w-xl font-poppins text-sm text-gray-600 dark:text-gray-300 sm:text-base">
          Your visited page was not found. You may go back to the home page.
        </span>

        <Link to="/">
          <Button className="px-6 py-3 sm:px-8">Back to home page</Button>
        </Link>
      </div>
    </>
  );
}
