import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import Nav from './Nav';
import './App.css';
import CompanyDetail from './CompanyDetail.jsx';
import CompanyList from './CompanyList';
import SignUpForm from './Signup';
import About from './About';
import ForumPage from './ForumPage';
import Topic from './Topic';
import Test from './test';
import UpdateAccountInfo from './UpdateAccount';
import AccountToCompany from './AccountToCompany.js';
import AccountCompanyList from './AccountCompanyList.jsx';


function App() {
	const domain = /https:\/\/[^/]+/;
	const basename = process.env.PUBLIC_URL.replace(domain, '');

	return (
		<div
			className="
			overflow-auto
			h-screen
			bg-gradient-to-b
			from-[#164f87] to-[#5bb3c7]
			dark:bg-gradient-to-b
			dark:from-[#0a192f]
			dark:to-[#0a192f] "
		>
			<div>
				<BrowserRouter basename={basename}>
					<AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
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
								<Route path="About">
									<Route path="" element={<About />} />
								</Route>
								<Route path="ForumPage">
									<Route path="" element={<ForumPage />} />
									<Route path=":topic_id" element={<Topic />} />
								</Route>
								<Route path="test">
									<Route path="" element={<Test />} />
								</Route>
								<Route path="updateAccount">
									<Route path="" element={<UpdateAccountInfo />} />
								</Route>
								<Route path="AccountToCompany">
									<Route path="" element={<AccountToCompany />} />
								</Route>
								<Route path="AccountCompanyList">
									<Route path="" element={<AccountCompanyList />} />
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
