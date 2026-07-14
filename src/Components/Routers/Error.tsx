import { Link } from "react-router";
import { Breadcrumb, Button } from "../Elements";

export default function Error() {
  
  return (
    <>
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="404 Error" />
      <div className="w-full h-[595px] flex flex-col justify-center items-center gap-10">
        <h1 className="font-inter font-medium text-[110px] leading-[115px]">404 Not Found</h1>
        <span className="mb-10 font-poppins font-normal text-base">Your visited page not found. You may go home page.</span>
        <Link to="/"><Button>Back to home page</Button></Link>
      </div>
    </>
  );
}
