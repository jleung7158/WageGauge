import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import Nav from './Nav';
import './App.css';
import CompanyDetail from './CompanyDetail.jsx';
import CompanyList from './CompanyList';
import SignUpForm from './Signup';
import LoginForm from './Login';
// import AccountEdit from './UpdateAccountForm.jsx';
import AccountToCompany from './AccountToCompany.jsx';
import Switcher from './components/Switcher';
import Logout from './logout';
import About from './About';

function App() {
	return (
		<div
			className="
			overflow-auto
			h-screen
			bg-gradient-to-b
			from-weedgreen to-wageblue
			dark:bg-gradient-to-b
			dark:from-[#0a192f]
			dark:to-[#0a192f] "
		>
			<div>
				<BrowserRouter>
					<AuthProvider baseUrl="http://localhost:8000">
						<Nav />
						<div className="container-flex">
							<Routes>
								<Route>
									<Route path="companies" element={<CompanyList />} />
								</Route>
								<Route path="positions">
									<Route path="" element={<CompanyDetail />} />
								</Route>
								<Route path="Signup">
									<Route path="" element={<SignUpForm />} />
								</Route>
								<Route path="Login">
									<Route path="" element={<LoginForm />} />
								</Route>
								<Route path="Logout">
									<Route path="" element={<Logout />} />
								</Route>
								<Route path="About">
									<Route path="" element={<About />} />
								</Route>
							</Routes>
						</div>
					</AuthProvider>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
