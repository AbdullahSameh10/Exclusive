import { useEffect, type ReactElement } from "react";
import { Breadcrumb } from "../Elements";
import useRouteTransition from "../Hooks/useRouteTransition";

type MiddleCardPropsTypes = {
  img: ReactElement;
  heading: string;
  subHeading: string;
};

type PersonCardPropsType = {
  img: string;
  name: string;
  description: string;
};

const IconShop = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.1416 5H27.4883L28.3216 13.3333C28.3216 13.3333 29.9883 15 32.4883 15C33.8006 15.0017 35.0684 14.524 36.0533 13.6567C36.1574 13.5594 36.235 13.4372 36.2787 13.3016C36.3224 13.166 36.3309 13.0214 36.3033 12.8817L35.1266 5.83333C35.0873 5.60049 34.9668 5.38909 34.7865 5.23656C34.6062 5.08404 34.3778 5.00024 34.1416 5V5Z"
      strokeWidth="2"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
    />
    <path
      d="M27.4883 5L28.3216 13.3333C28.3216 13.3333 26.6549 15 24.1549 15C21.6549 15 19.9883 13.3333 19.9883 13.3333V5H27.4883Z"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2"
    />
    <path
      d="M19.9886 5V13.3333C19.9886 13.3333 18.3219 15 15.8219 15C13.3219 15 11.6553 13.3333 11.6553 13.3333L12.4886 5H19.9886Z"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2"
    />
    <path
      d="M12.4883 5H5.8366C5.59993 4.99991 5.37089 5.08377 5.19023 5.23666C5.00957 5.38955 4.88899 5.60157 4.84994 5.835L3.67494 12.8833C3.64747 13.0231 3.65601 13.1676 3.69974 13.3032C3.74348 13.4387 3.82097 13.5609 3.92494 13.6583C4.4716 14.1417 5.69327 15.0017 7.48827 15.0017C9.98827 15.0017 11.6549 13.335 11.6549 13.335L12.4883 5.00167V5Z"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2"
    />
    <path
      d="M5 15V31.6667C5 32.5507 5.35119 33.3986 5.97631 34.0237C6.60143 34.6488 7.44928 35 8.33333 35H31.6667C32.5507 35 33.3986 34.6488 34.0237 34.0237C34.6488 33.3986 35 32.5507 35 31.6667V15"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2"
    />
    <path
      d="M24.7217 35V25C24.7217 24.1159 24.3705 23.2681 23.7454 22.6429C23.1202 22.0178 22.2724 21.6666 21.3883 21.6666H18.055C17.171 21.6666 16.3231 22.0178 15.698 22.6429C15.0729 23.2681 14.7217 24.1159 14.7217 25V35"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2"
      strokeMiterlimit="16"
    />
  </svg>
);

const IconSale = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0003 37.2728C29.5397 37.2728 37.273 29.5395 37.273 20C37.273 10.4606 29.5397 2.72729 20.0003 2.72729C10.4608 2.72729 2.72754 10.4606 2.72754 20C2.72754 29.5395 10.4608 37.2728 20.0003 37.2728Z"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.0914 14.547C24.762 13.9758 24.2834 13.505 23.707 13.1848C23.1305 12.8646 22.4777 12.7072 21.8186 12.7294H18.1823C17.2178 12.7294 16.2929 13.1124 15.611 13.7941C14.929 14.4759 14.5459 15.4005 14.5459 16.3647C14.5459 17.3288 14.929 18.2535 15.611 18.9353C16.2929 19.617 17.2178 20 18.1823 20H21.8186C22.783 20 23.708 20.383 24.3899 21.0648C25.0719 21.7465 25.455 22.6712 25.455 23.6354C25.455 24.5995 25.0719 25.5242 24.3899 26.2059C23.708 26.8877 22.783 27.2707 21.8186 27.2707H18.1823C17.5232 27.2929 16.8704 27.1354 16.2939 26.8153C15.7174 26.4951 15.2389 26.0242 14.9095 25.453"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8.18176V12.1212M20 27.8787V31.8181"
      className="stroke-white transition-colors duration-300 group-hover:stroke-black"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconShoppingBag = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.667 11.6667V8.33339C11.667 7.36818 11.9464 6.42362 12.4714 5.6137C12.9965 4.80379 13.7447 4.16315 14.6258 3.76912C15.5069 3.37509 16.4832 3.24451 17.4369 3.39313C18.3906 3.54176 19.2809 3.96325 20.0003 4.60672C20.7197 3.96325 21.61 3.54176 22.5637 3.39313C23.5174 3.24451 24.4937 3.37509 25.3749 3.76912C26.256 4.16315 27.0042 4.80379 27.5292 5.6137C28.0543 6.42362 28.3336 7.36818 28.3337 8.33339V11.6667H30.8337C31.4967 11.6667 32.1326 11.9301 32.6014 12.399C33.0703 12.8678 33.3337 13.5037 33.3337 14.1667V30.8417C33.3337 32.3866 32.72 33.8682 31.6276 34.9606C30.5352 36.053 29.0535 36.6667 27.5087 36.6667H13.3337C11.5655 36.6667 9.86986 35.9643 8.61961 34.7141C7.36937 33.4639 6.66699 31.7682 6.66699 30.0001V14.1667C6.66699 13.5037 6.93038 12.8678 7.39922 12.399C7.86807 11.9301 8.50395 11.6667 9.16699 11.6667H11.667ZM22.7253 34.1667C22.0454 33.1914 21.6818 32.0306 21.6837 30.8417V14.1667H9.16699V30.0001C9.16699 30.5472 9.27477 31.089 9.48416 31.5946C9.69356 32.1001 10.0005 32.5594 10.3874 32.9463C10.7743 33.3332 11.2336 33.6402 11.7391 33.8496C12.2447 34.0589 12.7865 34.1667 13.3337 34.1667H22.7253ZM19.167 11.6667V8.33339C19.167 7.67035 18.9036 7.03446 18.4348 6.56562C17.9659 6.09678 17.33 5.83339 16.667 5.83339C16.004 5.83339 15.3681 6.09678 14.8992 6.56562C14.4304 7.03446 14.167 7.67035 14.167 8.33339V11.6667H19.167ZM21.667 11.6667H25.8337V8.33339C25.8337 7.81878 25.6749 7.31669 25.379 6.89566C25.0832 6.47463 24.6645 6.15517 24.1803 5.98089C23.6961 5.8066 23.1699 5.78599 22.6736 5.92186C22.1773 6.05773 21.7349 6.34346 21.407 6.74005C21.5753 7.24005 21.667 7.77672 21.667 8.33339V11.6667ZM24.1837 30.8417C24.1837 31.7236 24.534 32.5693 25.1575 33.1929C25.7811 33.8164 26.6268 34.1667 27.5087 34.1667C28.3905 34.1667 29.2362 33.8164 29.8598 33.1929C30.4833 32.5693 30.8337 31.7236 30.8337 30.8417V14.1667H24.1837V30.8417Z"
      className="fill-white transition-colors duration-300 group-hover:fill-black"
    />
  </svg>
);

const IconMoneybag = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.4277 29.7731H20.9277C21.5521 29.7731 22.1512 29.5251 22.5928 29.0836C23.0343 28.6421 23.2821 28.0429 23.2822 27.4186C23.2822 26.7942 23.0343 26.1951 22.5928 25.7535C22.1512 25.312 21.5522 25.0641 20.9277 25.0641H20.4277V29.7731ZM19.0732 19.5006C18.4488 19.5006 17.8497 19.7485 17.4082 20.1901C16.9668 20.6316 16.7188 21.2308 16.7188 21.8551C16.7189 22.4793 16.9669 23.0777 17.4082 23.5192C17.8497 23.9607 18.4488 24.2096 19.0732 24.2096H19.5732V19.5006H19.0732ZM19.5732 25.0641H19.0732C18.2222 25.0641 17.4055 24.7255 16.8037 24.1237C16.2022 23.522 15.8644 22.7059 15.8643 21.8551C15.8643 21.0041 16.202 20.1874 16.8037 19.5856C17.4055 18.9838 18.2222 18.6461 19.0732 18.6461H19.5732V17.7184H20.4277V18.6461H20.9277C21.5915 18.6461 22.2393 18.8518 22.7812 19.235C23.2552 19.5702 23.6282 20.0265 23.8623 20.5543L23.9541 20.7858C23.9726 20.8384 23.9805 20.8941 23.9775 20.9498C23.9746 21.0059 23.9607 21.0613 23.9365 21.1119C23.9123 21.1625 23.8786 21.2083 23.8369 21.2457C23.7952 21.2832 23.7462 21.312 23.6934 21.3307C23.6405 21.3494 23.5843 21.3571 23.5283 21.3541C23.4724 21.3511 23.4177 21.3372 23.3672 21.3131C23.265 21.2643 23.1862 21.1767 23.1484 21.0699C22.9861 20.6109 22.6847 20.2133 22.2871 19.9323C21.8895 19.6512 21.4147 19.5005 20.9277 19.5006H20.4277V24.2096H20.9277C21.7788 24.2096 22.5955 24.5472 23.1973 25.149C23.799 25.7509 24.1367 26.5675 24.1367 27.4186C24.1366 28.2694 23.7988 29.0854 23.1973 29.6871C22.5955 30.2889 21.7788 30.6276 20.9277 30.6276H20.4277V31.5543H19.5732V30.6276H19.0732C18.4095 30.6275 17.7617 30.4219 17.2197 30.0387C16.6779 29.6556 16.2682 29.1135 16.0469 28.4879L16.042 28.4742C16.0215 28.421 16.0119 28.3642 16.0137 28.3073C16.0155 28.2502 16.0289 28.194 16.0527 28.1422C16.0766 28.0903 16.1111 28.044 16.1533 28.0055C16.1955 27.967 16.245 27.9366 16.2988 27.9176C16.3526 27.8987 16.4099 27.8907 16.4668 27.8942C16.5237 27.8976 16.5797 27.9128 16.6309 27.9381C16.6819 27.9634 16.7275 27.9985 16.7646 28.0416C16.8019 28.0849 16.8302 28.1357 16.8477 28.1901L16.8496 28.1969L16.8525 28.2037C17.177 29.1184 18.0483 29.773 19.0732 29.7731H19.5732V25.0641Z"
      className="fill-white stroke-white transition-colors duration-300 group-hover:fill-black group-hover:stroke-black"
    />
    <path
      d="M20.0361 3.80945C23.9382 3.80945 27.4978 5.04277 29.7168 6.12L29.8447 6.1825C30.284 6.39987 30.6638 6.60847 30.9766 6.7948L27.8457 11.3729L27.6143 11.7108L27.9014 12.0048C29.8396 13.9864 31.6698 16.5169 32.9805 19.1923C34.2934 21.8724 35.0683 24.6627 34.9414 27.1737C34.8155 29.6638 33.8056 31.8866 31.5166 33.5038C29.2054 35.1366 25.538 36.1884 20.0361 36.1884C14.5332 36.1883 10.8546 35.1548 8.52832 33.5438C6.22488 31.9487 5.19876 29.7545 5.05762 27.286C4.9153 24.7955 5.67566 22.0153 6.9834 19.3202C8.28876 16.63 10.1227 14.0594 12.0811 11.9989L12.3594 11.7069L12.1328 11.3739L9.02246 6.79675C9.17967 6.70416 9.35379 6.60749 9.54297 6.50671L9.54492 6.50574C9.7354 6.40331 9.94076 6.29779 10.1611 6.19031L10.2197 6.16199C12.4563 5.07592 16.0841 3.8095 20.0361 3.80945ZM26.957 12.6981C22.6083 14.3798 17.3703 14.38 13.0215 12.7001L12.8418 13.1659L12.4756 12.826C10.6577 14.7855 8.96568 17.1901 7.75098 19.6932C6.55983 22.149 5.86865 24.6147 5.89551 26.8036L5.91016 27.2372C6.0376 29.4718 6.94935 31.4116 9.0127 32.8417C11.1392 34.3136 14.6197 35.3338 20.0352 35.3339C25.4465 35.3339 28.9126 34.2956 31.0215 32.8055C33.0713 31.3568 33.9725 29.3909 34.0869 27.1298C34.2038 24.8131 33.4877 22.1697 32.2119 19.5673L32.2109 19.5653L31.9766 19.1044C30.7861 16.8113 29.2793 14.6958 27.5 12.8202L27.2695 12.577L26.957 12.6981ZM28.7627 7.08093C26.4933 7.24436 23.8596 7.72976 21.2637 8.4198L20.1553 8.72742C18.2952 9.26476 16.2165 9.22705 14.2295 8.90027L13.834 8.83093C13.3047 8.7328 12.7788 8.6166 12.2578 8.48132L10.9727 8.14734L11.7188 9.24597L13.499 11.8671L13.5908 12.0028L13.7451 12.0575C17.6692 13.4545 22.2998 13.4545 26.2246 12.0594L26.0566 11.5878L26.4697 11.87L29.2119 7.86218L29.7969 7.00671L28.7627 7.08093ZM20.0352 4.66394C16.7535 4.66399 13.7063 5.5779 11.5801 6.48035L11.7754 6.94031L11.6328 7.4198C12.3895 7.64493 13.1819 7.84098 13.9873 7.99011H13.9883C16.0232 8.3649 18.1082 8.43009 19.917 7.90613L19.918 7.90515C21.8862 7.33179 23.8882 6.88147 25.9121 6.55554L25.9766 5.58289C24.2351 5.05858 22.1902 4.66394 20.0352 4.66394Z"
      className="fill-white stroke-white transition-colors duration-300 group-hover:fill-black group-hover:stroke-black"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path
      d="M17 3H7C5.93913 3 4.92172 3.42143 4.17157 4.17157C3.42143 4.92172 3 5.93913 3 7V17C3 18.0609 3.42143 19.0783 4.17157 19.8284C4.92172 20.5786 5.93913 21 7 21H17C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V7C21 5.93913 20.5786 4.92172 19.8284 4.17157C19.0783 3.42143 18.0609 3 17 3Z"
      className="stroke-black transition-colors duration-300 group-hover/icon1:stroke-violet-500"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16V16Z"
      className="stroke-black transition-colors duration-300 group-hover/icon1:stroke-violet-500"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 7.5C17.7652 7.5 18.0196 7.39464 18.2071 7.20711C18.3946 7.01957 18.5 6.76522 18.5 6.5C18.5 6.23478 18.3946 5.98043 18.2071 5.79289C18.0196 5.60536 17.7652 5.5 17.5 5.5C17.2348 5.5 16.9804 5.60536 16.7929 5.79289C16.6054 5.98043 16.5 6.23478 16.5 6.5C16.5 6.76522 16.6054 7.01957 16.7929 7.20711C16.9804 7.39464 17.2348 7.5 17.5 7.5Z"
      className="fill-black transition-colors duration-300 group-hover/icon1:fill-violet-500"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path
      d="M11.5 9.05C12.417 8.113 13.611 7.5 15 7.5C16.4587 7.5 17.8576 8.07946 18.8891 9.11091C19.9205 10.1424 20.5 11.5413 20.5 13V20.5H18.5V13C18.5 12.0717 18.1313 11.1815 17.4749 10.5251C16.8185 9.86875 15.9283 9.5 15 9.5C14.0717 9.5 13.1815 9.86875 12.5251 10.5251C11.8687 11.1815 11.5 12.0717 11.5 13V20.5H9.5V8H11.5V9.05ZM4.5 6C4.10218 6 3.72064 5.84196 3.43934 5.56066C3.15804 5.27936 3 4.89782 3 4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3C4.89782 3 5.27936 3.15804 5.56066 3.43934C5.84196 3.72064 6 4.10218 6 4.5C6 4.89782 5.84196 5.27936 5.56066 5.56066C5.27936 5.84196 4.89782 6 4.5 6ZM3.5 8H5.5V20.5H3.5V8Z"
      className="fill-black transition-colors duration-300 group-hover/icon2:fill-violet-500"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <g clipPath="url(#clip0_24782_1563)">
      <path
        d="M14.1211 4.44336C14.9979 4.09254 15.9592 4.00852 16.8838 4.20117C17.8082 4.39388 18.6557 4.85462 19.3193 5.52637L19.3486 5.55664H19.3906C19.7296 5.55426 20.0806 5.59738 20.498 5.53809C20.882 5.48352 21.3278 5.34203 21.915 5.00977C21.6091 6.49447 21.4324 7.16729 20.7646 8.08301L20.7451 8.10938V8.14258C20.7451 11.9414 19.5781 14.7564 17.8262 16.7393C16.0729 18.7234 13.7275 19.8816 11.3623 20.3535C9.7452 20.6761 7.754 20.5731 5.99609 20.2109C5.11794 20.03 4.30096 19.7842 3.62012 19.4971C3.03699 19.2511 2.56006 18.9759 2.22949 18.6885C2.6606 18.6463 3.41195 18.553 4.24414 18.3594C5.24389 18.1267 6.37194 17.749 7.20312 17.1406L7.31934 17.0557L7.19922 16.9766C6.50766 16.5207 4.81165 15.4984 3.73145 13.5166C2.66701 11.5637 2.19288 8.66296 3.91406 4.42578C5.57929 6.34325 7.27273 7.66041 8.99512 8.36719C9.57627 8.60556 9.94226 8.72333 10.2314 8.79102C10.5195 8.85841 10.7322 8.8754 10.9922 8.91113L11.2871 8.95215L11.1074 8.77148C11.1323 7.84188 11.4255 6.93867 11.9541 6.17285C12.4906 5.3958 13.2444 4.79414 14.1211 4.44336ZM15.9053 5.90137C15.119 5.90124 14.3638 6.20994 13.8027 6.76074C13.3119 7.24267 13.0038 7.87627 12.9248 8.55371L12.9053 8.84668L12.877 10.4209C12.8756 10.4914 12.8592 10.5613 12.8291 10.625C12.799 10.6887 12.7556 10.7452 12.7021 10.791C12.6487 10.8368 12.5861 10.8716 12.5186 10.8916C12.4511 10.9115 12.3802 10.9166 12.3105 10.9072L10.749 10.6953C8.71753 10.4183 6.7663 9.48248 4.88965 7.91895L4.75781 7.80859L4.72754 7.97754C4.42573 9.64812 4.56793 11.0709 5.14746 12.3018C5.72674 13.532 6.73875 14.5607 8.15625 15.4521L9.90234 16.5498C9.97145 16.5932 10.0296 16.6529 10.0703 16.7236C10.111 16.7944 10.1339 16.8744 10.1367 16.9561C10.1395 17.0377 10.1217 17.1189 10.0859 17.1924C10.0501 17.2658 9.99667 17.3299 9.93066 17.3779L8.33887 18.541L8.11523 18.7041L8.3916 18.7207C9.34472 18.7801 10.2532 18.738 11.0098 18.5879C13.3887 18.1129 15.375 16.9789 16.7656 15.2207C18.1559 13.4627 18.9453 11.0883 18.9453 8.14258C18.9453 7.99705 18.8715 7.78499 18.7441 7.55762C18.6144 7.32598 18.4211 7.06491 18.167 6.82031C17.6584 6.33085 16.8999 5.90145 15.9053 5.90137Z"
        className="fill-black stroke-black transition-colors duration-300 group-hover/icon3:fill-violet-500 group-hover/icon3:stroke-violet-500"
        strokeWidth="0.2"
      />
    </g>
    <defs>
      <clipPath id="clip0_24782_1563">
        <rect
          width="24"
          height="24"
          className="fill-black transition-colors duration-300 group-hover/icon3:fill-violet-500"
        />
      </clipPath>
    </defs>
  </svg>
);

export default function About() {
  const transition = useRouteTransition();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
  }, [transition]);

  return (
    <div className="relative mb-[140px]">
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="About" />
      <div className="mt-[42px] flex flex-col gap-[140px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-10">
            <h1 className="font-inter text-[54px] font-semibold leading-[64px]">
              <span className="text-violet-500">Our</span> Story
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-[525px] font-poppins text-base font-normal leading-[26px] tracking-wider">
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </p>
              <p className="max-w-[505px] font-poppins text-base font-normal leading-[26px] tracking-wider">
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
          </div>
          <div className="flex translate-x-[20%] items-center justify-center">
            <img
              src="../src/Components/Assets/About/About us.svg"
              alt="about us illustration"
              className="w-[709px] animate-float"
            />
          </div>
        </div>
        <div className="flex gap-[30px]">
          <MiddleCard
            img={<IconShop />}
            heading="10.5k"
            subHeading="Sallers active in our site"
          />
          <MiddleCard
            img={<IconSale />}
            heading="33k"
            subHeading="Monthly Product Sale"
          />
          <MiddleCard
            img={<IconShoppingBag />}
            heading="45.5k"
            subHeading="Customer active in our site"
          />
          <MiddleCard
            img={<IconMoneybag />}
            heading="25k"
            subHeading="Anual gross sale in our site"
          />
        </div>
        <div className="flex gap-[30px]">
          <PersonCard
            img="src\Components\Assets\About\businessman 1.png"
            name="Tom Cruise"
            description="Founder & Chairman"
          />
          <PersonCard
            img="src\Components\Assets\About\businessman 2.png"
            name="Emma Watson"
            description="Managing Director"
          />
          <PersonCard
            img="src\Components\Assets\About\businessman 3.png"
            name="Will Smith"
            description="Product Designer"
          />
        </div>
        <div className="mx-auto mt-[56px] flex w-fit gap-[88px]">
          <div className="group flex flex-col items-center gap-6">
            <img
              src="src/Components/Assets/Services.svg"
              alt="icon"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col items-center gap-2 font-poppins">
              <span className="text-xl font-semibold">
                FREE AND FAST DELIVERY
              </span>
              <span className="text-sm font-normal">
                Free delivery for all orders over $140
              </span>
            </div>
          </div>
          <div className="group flex flex-col items-center gap-6">
            <img
              src="src/Components/Assets/Services (1).svg"
              alt="icon"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col items-center gap-2 font-poppins">
              <span className="text-xl font-semibold">
                24/7 CUSTOMER SERVICE
              </span>
              <span className="text-sm font-normal">
                Friendly 24/7 customer support
              </span>
            </div>
          </div>
          <div className="group flex flex-col items-center gap-6">
            <img
              src="src/Components/Assets/Services (2).svg"
              alt="icon"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col items-center gap-2 font-poppins">
              <span className="text-xl font-semibold">
                MONEY BACK GUARANTEE
              </span>
              <span className="text-sm font-normal">
                We reurn money within 30 days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiddleCard(props: MiddleCardPropsTypes) {
  const { img, heading, subHeading } = props;
  return (
    <div className="group flex h-[230px] w-[270px] flex-col items-center justify-center gap-6 rounded-md border border-black/30 bg-white transition-all duration-300 hover:border-violet-500 hover:bg-violet-500 hover:shadow-[0px_0px_20px_1px_#8a5cf6AA]">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2F2E30]/30 transition-colors duration-300 group-hover:bg-white/30">
        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-white">
          {img}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="font-inter text-[32px] font-bold leading-[30px] text-black transition-colors duration-300 group-hover:text-white">
          {heading}
        </span>
        <span className="font-poppins text-base font-normal text-black transition-colors duration-300 group-hover:text-white">
          {subHeading}
        </span>
      </div>
    </div>
  );
}

function PersonCard(porps: PersonCardPropsType) {
  const { img, name, description } = porps;

  return (
    <div className="group flex flex-col gap-8">
      <div className="flex h-[430px] w-[370px] items-end justify-center overflow-hidden rounded-md bg-[#F5F5F5]">
        <img
          src={img}
          alt="person image"
          className="h-[391px] transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-inter text-[32px] font-medium leading-[30px] text-black transition-colors duration-300 group-hover:text-violet-500">
            {name}
          </span>
          <span className="font-poppins text-base font-normal text-black transition-colors duration-300 group-hover:text-violet-500">
            {description}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="group/icon3">
            <TwitterIcon />
          </div>
          <div className="group/icon1">
            <InstagramIcon />
          </div>
          <div className="group/icon2">
            <LinkedinIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
