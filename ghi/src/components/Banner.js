import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Banner() {
    const [banner, setBanner] = useState(true);

    const hideBanner = () => {
        setBanner(false);
    };

    if (!banner) {
        return null;
    }

return (
    <div className="relative flex gap-x-6 overflow-hidden bg-fixed px-6 py-2.5 sm:px-3.5 bg-wageblue">
            <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
            >
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-gray-900 dark:text-white">
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
                onClick={hideBanner}
            >
                <svg
                className="h-5 w-5 text-gray-900 dark:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
            </div>
        </div>
);
}
