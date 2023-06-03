import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTopicQuery, useGetCommentsQuery } from "./services/api";

const Topic = () => {
  const { topic_id } = useParams();
  const { data: tData } = useGetTopicQuery(topic_id);
  const { data: commentData, refetch: refetchComments } = useGetCommentsQuery();
  const navigate = useNavigate();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [commentText, setCommentText] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const topicID = parseInt(topic_id);
  // console.log(topic_id);

  const currentAccount = async () => {
    const url = `http://localhost:8000/token`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });
    if (response.ok) {
      const data = await response.json();
      setAccountId(data.account.id);
    }
  };

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

  const handleForumClick = () => {
    navigate(`/ForumPage/`);
  };

  const handleCommentFormToggle = () => {
    setShowCommentForm(!showCommentForm);
  };

  const handleCommentSubmit = async (e) => {
    console.log("Comment submitted:", commentText);
    setCommentText("");
    setShowCommentForm(false);
    e.preventDefault();
    const comment = {
      text: commentText,
      account_id: accountId,
      topic_id: topicID,
    };
    console.log(comment);

    const url = `http://localhost:8000/comments`;
    const config = {
      method: "post",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const response = await fetch(url, config);
    if (response.ok) {
      setSuccessAlert(true);
      setCommentText("");
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
    <>
      {successAlert && (
        <div
          className="alert alert-success"
          role="alert"
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
            color: "white",
            backgroundColor: "green",
            borderColor: "darkgreen",
            border: "1px solid",
            borderRadius: "5px",
            padding: "0.75rem 1.25rem",
          }}
        >
          Comment added!
        </div>
      )}

      <div>
        <div className="text-2xl font-semibold m-4 p-2 max-w-prose bg-slate-100 rounded-xl hover:bg-slate-200">
          <div className="font-bold text-lg">{tData?.title}</div>
          <div className="ml-4">{tData?.body}</div>
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
              style={{ marginRight: "10px" }}
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
                className="
              ml-16 my-4 p-2
              max-w-prose
              bg-slate-100 rounded-xl
              hover:bg-slate-200
              "
              >
                {comment.text}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Topic;
