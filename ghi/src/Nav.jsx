import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div
      className="
    container flex flex-row w-screen
    p-2 mb-8
    bg-slate-100
    "
    >
      <div
        className="
      px-2 rounded
      bg-slate-300
      "
      >
        <NavLink to="positions">Positions</NavLink>
      </div>
      <div>
        <NavLink to="/companies">Companies</NavLink>
      </div>
    </div>
  );
}

export default Nav;
