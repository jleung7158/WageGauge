import { NavLink } from "react-router-dom";



function Nav() {
  return (
    <nav className="color-bg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
      {/* <img src="./ghi/img/logo.png" alt="Logo" className="h-8 w-8" /> */}
      <div>
        <NavLink to="positions" className="text-gray-50 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Positions</NavLink>
      </div>
      <div>
        <NavLink to="companies" className="text-gray-50 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Companies</NavLink>
      </div>
      </div>
      </div>
    </nav>
  );
}

export default Nav;
