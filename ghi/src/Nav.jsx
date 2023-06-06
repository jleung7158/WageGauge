import { NavLink, useNavigate } from 'react-router-dom';
import HomePageIcon from './img/icon.png';
import Switcher from './components/Switcher';
import Banner from './components/Banner';
import LoginForm from './Login';
import { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import UserDropDown from './components/UserDropDown';
import AccountToCompany from './AccountToCompany.js';

function Nav() {
	const { token, logout } = useToken();
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [showBanner, setShowBanner] = useState(true);
	const [showLogin, setShowLogin] = useState(true);
	const [showDropdown, setShowDropdown] = useState(false);

	//dropdownmenu
	const navigate = useNavigate();

	const handleSelectionChange = (e) => {
		const selection = e.target.value;

		if (selection === 'logout') {
			handleLogout();
		} else {
			navigate(selection);
		}
	};

	const handleLoginClick = () => {
		setShowLoginForm(true);
	};

	const handleLogout = () => {
		logout();
		setShowDropdown(false);
		setShowLogin(true);
	};

	const LogoutButton = () => {
		if (token) {
			return (
				<div>
					<NavLink
						to="#"
						className="
                    text-gray-50
                    hover:bg-gray-100
                    hover:text-wageblue block
                    block rounded-full px-5 py-3
                    bg-wageblue
                    text-base font-bold

                    dark:text-wageblue
                    dark:bg-moredark
                    dark:shadow-inner
                    dark:hover:shadow-slate-500/20"
						onClick={handleLogout}
					>
						Logout
					</NavLink>
				</div>
			);
		}
	};

	const handleCloseLoginForm = () => {
		setShowLoginForm(false);
	};

	const checkForToken = () => {
		if (token) {
			setShowBanner(false);
			setShowLogin(false);
			setShowDropdown(true);
		}
	};

	useEffect(() => {
		checkForToken();
	}, [token]);

	return (
		<>
			{/* the pop up to sign in */}
			{showBanner && <Banner ban={checkForToken} />}
			{/* the background of the nav */}
			<div
				className="
          container-flex flex-row p-2
          bg-white
          dark:bg-moredark
          "
			>
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
								DASHBOARD
							</NavLink>
						</div>
						<div className="mt-5">
							<NavLink
								to="ForumPage"
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
								FORUM
							</NavLink>
						</div>
					</div>
					{/* nav buttons on the right side* */}
					{/* </div> */}
					<div className="flex flex-row space-x-4 justify-start">
						<div
							className="mt-6
                    rounded-full px-3
                    dark:shadow-lg
                    dark:hover:shadow-slate-500/20"
						>
							<Switcher />
						</div>
						<div className="mt-5">
							<NavLink
								to="about"
								className="
                    text-gray-50
                    hover:bg-gray-100
                    hover:text-wageblue block
                    block rounded-full px-5 py-3
                    bg-wageblue
                    text-base font-bold

                    dark:text-wageblue
                    dark:bg-moredark
                    dark:shadow-inner
                    dark:hover:shadow-slate-500/20
                    "
							>
								ABOUT US
							</NavLink>
						</div>
						{showLogin && (
							<div className="mt-5">
								<NavLink
									to="#"
									className="
                    text-gray-50
                    hover:bg-gray-100
                    hover:text-wageblue block
                    block rounded-full px-5 py-3
                    bg-wageblue
                    text-base font-bold

                    dark:text-wageblue
                    dark:bg-moredark
                    dark:shadow-inner
                    dark:hover:shadow-slate-500/20"
									onClick={handleLoginClick}
								>
									LOGIN
								</NavLink>
							</div>
						)}
						<div className="">
							{showDropdown && (
								// <UserDropDown logout={handleLogout}/>
								<div className="mt-5">
									<select
										className="
                        text-gray-50
                        items-center
                        hover:bg-gray-100
                        hover:text-wageblue block
                        block rounded-full px-5 py-3
                        bg-wageblue
                        text-base font-bold

                        dark:text-wageblue
                        dark:bg-moredark
                        dark:shadow-inner
                        dark:hover:shadow-slate-500/20"
										value={''}
										onChange={handleSelectionChange}
									>
										<option value="" disabled>
											PROFILE
										</option>
										<option className="font-bold" value="updateAccount">
											UPDATE ACCOUNT
										</option>
										<option className="font-bold" value="AccountToCompany">
											REPORT YOUR SALARY
										</option>
										<option className="font-bold" value="logout">
											LOGOUT
										</option>
									</select>
								</div>
							)}
						</div>
					</div>
					{showLoginForm && (
						<div className="fixed inset-0 flex items-center justify-center z-50">
							<div className="fixed inset-0 bg-black opacity-50"></div>
							<div className="relative z-10">
								<LoginForm onClose={handleCloseLoginForm} />
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Nav;
