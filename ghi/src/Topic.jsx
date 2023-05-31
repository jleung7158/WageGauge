import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTopicQuery, useGetCommentsQuery } from "./services/api";

const Topic = () => {
  const { topic_id } = useParams();
  const { data: tData } = useGetTopicQuery(topic_id);
  const { data: commentData } = useGetCommentsQuery();
  const navigate = useNavigate();

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

  return (
    <div>
      <div>
        <div
          className="
        text-2xl font-semibold 
        m-4 p-2 max-w-prose
        bg-slate-100 rounded-xl
        hover:bg-slate-200
        "
        >
          {tData?.text}
        </div>
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
      <button
        onClick={() => handleForumClick()}
        className="mx-8 p-2 bg-slate-300 rounded-lg"
      >
        Back to Forum
      </button>
    </div>
  );
};

export default Topic;
