import { useEffect } from "react";
import { Breadcrumb, Button } from "../Elements";
import useRouteTransition from "../Hooks/useRouteTransition";
import { useForm, ValidationError } from "@formspree/react";
import phoneIcon from "@Assets/icons-phone.svg";
import emailIcon from "@Assets/icons-mail.svg";

export default function Contact() {
  const transition = useRouteTransition();
  const [state, handleSubmit] = useForm("mojobadl");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    transition.end();
  }, [transition]);

  return (
    <div
      className={`${
        !state.succeeded ? "min-h-[778px]" : "min-h-[678px]"
      } mb-20 sm:mb-[140px] px-4`}
    >
      <Breadcrumb pages={["Home"]} links={["/"]} currentPage="Contact" />

      {!state.succeeded ? (
        <div className="mt-10 flex flex-col gap-6 sm:mt-20 lg:flex-row lg:gap-[30px]">
          <div className="flex w-full flex-col gap-8 rounded-lg bg-white px-6 py-8 shadow-[0px_1px_13px_0px_#44a9db50] dark:bg-neutral-900 sm:px-[35px] sm:py-[45px] lg:w-[340px]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <img src={phoneIcon} alt="phone icon" />

                <span className="font-poppins text-base font-medium text-black dark:text-white">
                  Call To Us
                </span>
              </div>

              <div className="flex flex-col gap-4 font-poppins text-sm text-neutral-700 dark:text-neutral-300">
                <span>We are available 24/7, 7 days a week.</span>

                <span>
                  Phone:
                  <a
                    href="tel: +8801611112222"
                    className="ml-1 text-[#44a9db] underline-offset-4 hover:underline"
                  >
                    +8801611112222
                  </a>
                </span>
              </div>
            </div>

            <hr className="border-[#00000080] dark:border-white/20" />

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <img src={emailIcon} alt="phone icon" />

                <span className="font-poppins text-base font-medium text-black dark:text-white">
                  Write To US
                </span>
              </div>

              <div className="flex flex-col gap-4 font-poppins text-sm text-neutral-700 dark:text-neutral-300">
                <span>
                  Fill out our form and we will contact you within 24 hours.
                </span>

                <span>
                  Emails:
                  <a
                    href="mailto:customer@exclusive.com"
                    className="ml-1 text-[#44a9db] underline-offset-4 hover:underline"
                  >
                    customer@exclusive.com
                  </a>
                </span>

                <span>
                  Emails:
                  <a
                    href="mailto:support@exclusive.com"
                    className="ml-1 text-[#44a9db] underline-offset-4 hover:underline"
                  >
                    support@exclusive.com
                  </a>
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-8 rounded-lg bg-white px-6 py-8 shadow-[0px_1px_13px_0px_#44a9db50] dark:bg-neutral-900 sm:px-[31px] sm:py-10 lg:w-[800px]"
          >
            <input type="hidden" name="_subject" value="New Contact Message" />
            <input type="hidden" name="_replyto" />

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder=""
                  name="Name"
                  id="Name"
                  className="peer w-full rounded-lg border border-[#F5F5F5] bg-[#F5F5F5] px-4 py-[13px] text-neutral-900 outline-none transition duration-200 focus:border-[#44a9db] focus:ring-2 focus:ring-[#44a9db40] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  required
                />

                <label
                  htmlFor="Name"
                  className="pointer-events-none absolute left-4 top-[13px] text-black/50 opacity-0 transition duration-200 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 dark:text-white/40"
                >
                  Your Name <span className="text-[#DB4444]">*</span>
                </label>

                <ValidationError
                  prefix="Name"
                  field="Name"
                  errors={state.errors}
                />
              </div>

              <div className="relative w-full">
                <input
                  placeholder=""
                  type="email"
                  name="email"
                  id="Email"
                  className="peer w-full rounded-lg border border-[#F5F5F5] bg-[#F5F5F5] px-4 py-[13px] text-neutral-900 outline-none transition duration-200 focus:border-[#44a9db] focus:ring-2 focus:ring-[#44a9db40] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  required
                />

                <label
                  htmlFor="Email"
                  className="pointer-events-none absolute left-4 top-[13px] text-black/50 opacity-0 transition duration-200 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 dark:text-white/40"
                >
                  Your Email <span className="text-[#DB4444]">*</span>
                </label>

                <ValidationError
                  prefix="Email"
                  field="Email"
                  errors={state.errors}
                />
              </div>

              <div className="relative w-full">
                <input
                  type="tel"
                  placeholder=""
                  name="Phone"
                  id="Phone"
                  className="peer w-full rounded-lg border border-[#F5F5F5] bg-[#F5F5F5] px-4 py-[13px] text-neutral-900 outline-none transition duration-200 focus:border-[#44a9db] focus:ring-2 focus:ring-[#44a9db40] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  required
                />

                <label
                  htmlFor="Phone"
                  className="pointer-events-none absolute left-4 top-[13px] text-black/50 opacity-0 transition duration-200 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 dark:text-white/40"
                >
                  Your Phone <span className="text-[#DB4444]">*</span>
                </label>

                <ValidationError
                  prefix="Phone"
                  field="Phone"
                  errors={state.errors}
                />
              </div>
            </div>

            <div className="relative h-[250px] w-full sm:h-full">
              <textarea
                placeholder=""
                id="message"
                name="Message"
                className="peer h-full w-full resize-none rounded-lg border border-[#F5F5F5] bg-[#F5F5F5] px-4 py-[13px] text-neutral-900 outline-none transition duration-200 focus:border-[#44a9db] focus:ring-2 focus:ring-[#44a9db40] dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                required
              />

              <label
                htmlFor="message"
                className="pointer-events-none absolute left-4 top-[13px] text-black/50 opacity-0 transition duration-200 peer-placeholder-shown:opacity-100 peer-focus:opacity-0 dark:text-white/40"
              >
                Your Message <span className="text-[#DB4444]">*</span>
              </label>

              <ValidationError
                prefix="Message"
                field="Message"
                errors={state.errors}
              />
            </div>

            <Button
              className="ml-auto w-full bg-[#3894c2] hover:bg-[#3894c2BB] disabled:cursor-not-allowed disabled:opacity-35 sm:w-[215px]"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="my-20 rounded-lg bg-green-50 p-10 text-center dark:bg-green-500/10">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
            Thanks! 🎉
          </h2>

          <p className="mt-2 text-green-600 dark:text-green-300">
            Your message has been sent successfully.
          </p>
        </div>
      )}
    </div>
  );
}
