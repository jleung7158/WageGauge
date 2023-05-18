import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg">
			<div className="container-fluid flex">
				<div className="mx-2">
					<NavLink to="/positions">Positions</NavLink>
				</div>
				<div className="mx-2">
					<NavLink to="/companies">Companies</NavLink>
				</div>
				<div className="mx-2">
					<NavLink to="/signup">SignUp</NavLink>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
