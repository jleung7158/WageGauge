import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="container flex flex-row">
      <div className="container-fluid">
        <NavLink to="positions">Positions</NavLink>
      </div>
    </nav>
  );
}

export default Nav;
