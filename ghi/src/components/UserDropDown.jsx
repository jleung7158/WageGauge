import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDropDown(props) {
	const handleLogout = props.handeLogout;
	const navigate = useNavigate();

	const handleSelectionChange = (e) => {
		const selection = e.target.value;
		navigate(selection);
	};

	return (
		<>
			<div
				className="mt-5
"
			>
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
					onChange={handleSelectionChange}
				>
					<option value="account">Account</option>
					<option value="">test</option>
					<option value="account">Account</option>
					<option onClick={handleLogout}>Logout</option>
				</select>
			</div>
		</>
	);
}
