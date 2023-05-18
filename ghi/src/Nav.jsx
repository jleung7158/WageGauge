import { NavLink } from "react-router-dom";



function Nav() {
  return (
    <div className="container-flex flex-row w-screen p-2 mb-8 color-bg">
      <div
        className="
        color-bg"
        >
          <div
            className="
          px-2 rounded
          color-bg
          "
          >

              <div className="relative flex h-16 items-center justify-between">
              <div>
                <NavLink to="positions"
                className="text-gray-50
                hover:bg-gray-700
                hover:text-white
                block rounded-md px-3 py-2
                text-base font-medium"
                >Positions</NavLink>
              </div>
                <div >
                  <NavLink to="companies"
                  className="text-gray-50
                  hover:bg-gray-700
                  hover:text-white block
                  rounded-md px-3 py-2
                  text-base font-medium">
                    Companies</NavLink>
                </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default Nav;
