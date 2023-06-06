import React, { useState, useEffect } from 'react';
import { useCreateTopicMutation, useGetCompaniesQuery } from '../services/api';
import { useDispatch } from 'react-redux';
import { toggleIsOpen } from '../slices/topicFormSlice';

function TopicForm() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [createTopic] = useCreateTopicMutation();
	const [account_id, setAccount_id] = useState('');
	const { data: cData } = useGetCompaniesQuery();
	const dispatch = useDispatch();

	const currentAccount = async () => {
		const url = `http://localhost:8000/token`;
		const response = await fetch(url, {
			credentials: 'include',
			method: 'get',
		});
		if (response.ok) {
			const data = await response.json();
			setAccount_id(data.account.id);
		}
	};

	useEffect(() => {
		if (!account_id) {
			currentAccount();
		}
	}, [account_id]);

	function handleSubmit(event) {
		event.preventDefault();
		createTopic({ title, body, account_id, company_id });
		dispatch(toggleIsOpen());
	}

	const [company_id, setCompany_id] = useState('');
	function handleDropdownClick(e) {
		setCompany_id(parseInt(e.target.value));
	}

	function handleTitleInput(e) {
		setTitle(e.target.value);
	}

	function handleBodyInput(e) {
		setBody(e.target.value);
	}

	return (
		<div>
			<div className="container">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col m-2 p-2"
					id="topic"
				>
					<select
						id="companies"
						className="my-2 p-2 w-max rounded"
						onChange={(e) => {
							handleDropdownClick(e);
						}}
					>
						<option value="">Select the company</option>
						{cData?.map((company) => {
							return (
								<option key={company.id} value={company.id}>
									{company.name}
								</option>
							);
						})}
					</select>
					<input
						label="Title"
						id="title"
						placeholder="Type topic title here"
						value={title}
						onChange={(e) => handleTitleInput(e)}
						className="my-2 p-2 rounded"
					/>
					<textarea
						rows="3"
						label="Body"
						id="body"
						placeholder="Type topic body here"
						value={body}
						onChange={(e) => handleBodyInput(e)}
						className="my-2 p-2 rounded"
					/>
					<button className="my-2 p-2 bg-wageblue rounded w-max">Post!</button>
				</form>
			</div>
		</div>
	);
}

export default TopicForm;
