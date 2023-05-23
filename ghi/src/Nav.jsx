import { NavLink } from "react-router-dom";
import HomePageIcon from "./img/icon.png";
import NotIcon from "./img/email.png";
import BgImage from "./img/Cityscapes.png";
import Switcher from "./components/Switcher";

function Nav() {
  return (
    <>
      {/* the pop up to sign in */}
      <div className="relative flex gap-x-6 overflow-hidden bg-fixed px-6 py-2.5 sm:px-3.5">
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          ></div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">WageGauge</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            Sign up to see detailed data for each position!
          </p>
          <div>
            <NavLink
              to="signup"
              className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Sign up! <span aria-hidden="true">&rarr;</span>
            </NavLink>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="h-5 w-5 text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
      {/* the background of the nav */}
      <div className="
          container-flex flex-row p-2
          bg-white
          dark:bg-darkmode
          ">
        {/* makes the buttons horizontal */}
        <div className="flex px-2 rounded space-x-4 mt-4 mb-5 justify-between">
          {/* the buttons on the left*/}
          <div className="flex flex-row space-x-4 justify-start">
            <div>
              <NavLink
                to="companies"
                className="
                hover:opacity-25
                transition-opacity
                block rounded-full px-5 py-4

                "
              >
                <img src={HomePageIcon} alt="Homepage" className="w-12 h-12" />
              </NavLink>
            </div>
            <div className="mt-5">
              <NavLink
                to="companies"
                className="text-gray-50
                hover:bg-gray-100
                hover:text-wageblue block
                block rounded-full px-5 py-3
                bg-wageblue
                text-base font-bold

                dark:text-wageblue
                dark:bg-darkblue
                hover:dark:bg-darkgray
                "
              >
                Companies
              </NavLink>
            </div>
            <div className="mt-5">
              <NavLink
                to="positions"
                className="
                  text-gray-50
                  hover:bg-gray-100
                  hover:text-wageblue
                  block rounded-full px-5 py-3
                  bg-wageblue
                  text-base font-bold

                  dark:text-wageblue
                  dark:bg-darkblue
                  hover:dark:bg-darkgray
                  "
              >
                Positions
              </NavLink>
            </div>
          </div>
          {/* nav buttons on the right side* */}
          {/* </div> */}
          <div className="flex flex-row space-x-4 justify-start">
            <div className="mt-6">
              <Switcher/>
            </div>
            <div className="mt-5">
              <NavLink
                to="signup"
                className="
                    text-gray-50
                    hover:bg-gray-100
                    hover:text-wageblue block
                    block rounded-full px-5 py-3
                    bg-wageblue
                    text-base font-bold

                    dark:text-wageblue
                    dark:bg-darkblue
                    hover:dark:bg-darkgray"
              >
                Login
              </NavLink>
            </div>

        </div>
        </div>
      </div>
      {/* bottom space */}
      {/* <div className=' pb-5' ></div> */}
    </>
  );
}

export default Nav;
