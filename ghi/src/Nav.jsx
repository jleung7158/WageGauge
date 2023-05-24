import { NavLink } from "react-router-dom";
import HomePageIcon from "./img/icon.png";
import Switcher from "./components/Switcher";
import Banner from "./components/Banner";
import userIcon from './img/user.svg'

function Nav() {

  // const [banner, setBanner] = useState(true);

  // const hideBanner = () => {
  //   setBanner(false);
  // };

  // if (!banner) {
  //   return null;
  // }

  return (
    <>
      {/* the pop up to sign in */}
      <Banner/>
      {/* the background of the nav */}
      <div className="
          container-flex flex-row p-2
          bg-white
          dark:bg-moredark
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
                dark:bg-moredark
                dark:shadow-inner
                dark:hover:shadow-slate-500/20
                dark:hover:text-gray-300
                "
              >
                Dahsboard
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
                  dark:bg-moredark
                  dark:shadow-inner
                  dark:hover:shadow-slate-500/20
                  dark:hover:text-gray-300
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
            {/* <div className="mt-6">
              <img src={userIcon} alt="user" className="w-12 h-10 filter-white" />
            </div> */}

        </div>
        </div>
      </div>
      {/* bottom space */}
      {/* <div className=' pb-5' ></div> */}
    </>
  );
}

export default Nav;
