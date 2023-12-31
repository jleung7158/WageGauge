import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTopicQuery, useGetCommentsQuery } from './services/api';

const Topic = () => {
	const { topic_id } = useParams();
	const { data: tData } = useGetTopicQuery(topic_id);
	const { data: commentData, refetch: refetchComments } = useGetCommentsQuery();
	const navigate = useNavigate();
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [accountId, setAccountId] = useState('');
	const [commentText, setCommentText] = useState('');
	const [successAlert, setSuccessAlert] = useState(false);
	const [commentSubmitted, setCommentSubmitted] = useState(false);

	const topicID = parseInt(topic_id);

	const currentAccount = async () => {
		const url = `${process.env.REACT_APP_API_HOST}/token`;
		const response = await fetch(url, {
			credentials: 'include',
			method: 'get',
		});
		if (response.ok) {
			const data = await response.json();
			setAccountId(data.account.id);
		}
	};
	/* eslint-disable */
	const getFilteredComments = (topic_id, commentData) => {
		return commentData?.filter((comment) => {
			for (const [key, value] of Object.entries([comment])) {
				if (comment.topic_id == topic_id) {
					return comment.text;
				}
			}
		});
	};
	const filteredComments = getFilteredComments(topic_id, commentData);
	/* eslint-enable */
	const handleForumClick = () => {
		navigate(`/ForumPage/`);
	};

	const handleCommentFormToggle = () => {
		setShowCommentForm(!showCommentForm);
	};

	const handleCommentSubmit = async (e) => {
		setCommentText('');
		setShowCommentForm(false);
		e.preventDefault();
		const comment = {
			text: commentText,
			account_id: accountId,
			topic_id: topicID,
		};

		const url = `${process.env.REACT_APP_API_HOST}/comments`;
		const config = {
			method: 'post',
			body: JSON.stringify(comment),
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		};
		const response = await fetch(url, config);
		if (response.ok) {
			setSuccessAlert(true);
			setCommentText('');
			setShowCommentForm(false);
			refetchComments();
			const alertTimeout = setTimeout(() => {
				setSuccessAlert(false);
				navigate(`/ForumPage/${topicID}`);
			}, 3000);
			return () => {
				clearTimeout(alertTimeout);
			};
		}
	};

	useEffect(() => {
		currentAccount();
	}, []);

	useEffect(() => {
		if (commentSubmitted) {
			refetchComments();
			setCommentSubmitted(false);
		}
	}, [commentSubmitted, refetchComments]);
	return (
		<div className="flex items-center justify-center">
			<div>
				{successAlert && (
					<div
						className="alert alert-success"
						role="alert"
						style={{
							position: 'fixed',
							top: '1rem',
							right: '1rem',
							zIndex: 1000,
							color: 'white',
							backgroundColor: 'green',
							borderColor: 'darkgreen',
							border: '1px solid',
							borderRadius: '5px',
							padding: '0.75rem 1.25rem',
						}}
					>
						Comment added!
					</div>
				)}
				<div className="text-2xl m-4 p-2 max-w-prose bg-slate-100 rounded-xl hover:bg-slate-200">
					<div className="font-bold text-lg">{tData?.title}</div>
					<div className="ml-4 font-normal text-sm">{tData?.body}</div>
				</div>
				<button
					onClick={handleForumClick}
					className="mx-8 p-2 bg-slate-300 rounded-lg mt-4"
				>
					Back to Forum
				</button>
				{showCommentForm ? (
					<div className="p-2 bg-slate-100 rounded-xl mt-4">
						<textarea
							className="w-full h-24 p-2 border border-gray-300 rounded"
							placeholder="Type your comment here..."
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
						></textarea>
						<button
							className="p-2 bg-indigo-600 text-white rounded mt-2"
							onClick={handleCommentSubmit}
							style={{ marginRight: '10px' }}
						>
							Post
						</button>
						<button
							className="p-2 bg-red-600 text-white rounded mt-2"
							onClick={handleCommentFormToggle}
						>
							Cancel
						</button>
					</div>
				) : (
					<button
						className="p-2 bg-indigo-600 text-white rounded mt-4"
						onClick={handleCommentFormToggle}
					>
						Add Comment
					</button>
				)}
				<div>
					{filteredComments?.map((comment) => {
						return (
							<div
								key={comment.id}
								className="ml-16 my-4 p-2 max-w-prose bg-slate-100 rounded-xl hover:bg-slate-200 text-sm"
							>
								{comment.text}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Topic;
