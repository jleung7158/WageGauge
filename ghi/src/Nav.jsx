import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink to="positions">Positions</NavLink>
      </div>
      <div>
        <NavLink to="/companies">Companies</NavLink>
      </div>
    </nav>
  );
}

export default Nav;
