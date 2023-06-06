import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import { useGetCompaniesQuery, useGetTopicsQuery } from "./services/api";
import commentdot from "./img/commentdot.svg";
import thumbsup from "./img/thumbsup.svg";
import TopicForm from "./components/TopicForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsOpen } from "./slices/topicFormSlice";
import {
  useGetTopicLikesQuery,
  useCreateTopicLikesMutation,
  useDeleteTopicLikesMutation,
} from "./services/api";

function ForumPage() {
  const { data: cData } = useGetCompaniesQuery();
  const { data: tData } = useGetTopicsQuery();
  const { data: tlData } = useGetTopicLikesQuery();
  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.topicFormToggler.isOpen);
  const [text, setText] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [createTopicLike] = useCreateTopicLikesMutation();
  const [deleteTopicLike] = useDeleteTopicLikesMutation();

  const currentAccount = async () => {
    const url = `http://localhost:8000/token`;
    const response = await fetch(url, {
      credentials: "include",
      method: "get",
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

  const handleTextChange = (event) => {
    const value = event.target.value.toLowerCase();
    setText(value);
  };
  const getFilteredTopics = (text, tData) => {
    if (!text) {
      return tData;
    } else {
      return tData?.filter((t) => {
        for (const [key, value] of Object.entries([t])) {
          if (t.body.toLowerCase().includes(text)) {
            return t.body.toLowerCase().includes(text);
          }
        }
      });
    }
  };
  const filteredTopics = getFilteredTopics(text, tData);

  const getFilteredTopicLikes = (topic_id, tlData) => {
    return tlData?.filter((t) => {
      return t?.topic_id === topic_id;
    });
  };

  const handleNewClick = () => {
    dispatch(toggleIsOpen());
  };

  const checkLike = (topic_id) => {
    let isLiked = false;
    const filteredTopicLikes = getFilteredTopicLikes(topic_id, tlData);
    for (let like of filteredTopicLikes) {
      if (like.account_id === account_id) {
        isLiked = true;
      }
    }
    return isLiked;
  };

  const handleLike = (topic_id) => {
    createTopicLike({ account_id, topic_id });
  };

  const handleUnlike = (topic_like_id) => {
    deleteTopicLike({ topic_like_id });
  };

  const navigate = useNavigate();
  const handleTopicClick = (id) => {
    navigate(`/ForumPage/${id}`);
  };

  return (
    <div>
      <div
        className="
      flex flex-row
      justify-between
      m-4 h-full
      "
      >
        <div
          className="
        flex flex-col
        m-4 p-4 h-max w-64 shadow-xl
        bg-slate-200 rounded
        justify-center items-center
        "
        >
          <Dropdown options={cData} />
        </div>
        <div
          className="
        flex flex-col flex-none h-max
        m-8 p-4 w-[720px] shadow-xl
        bg-slate-200 rounded
        "
        >
          <div className="flex flex-row items-center justify-between">
            <div
              className="
            flex
            mx-4 my-2 p-2 
            items-center 
            justify-between
            w-max shadow-lg
            text-2xl font-bold
            bg-wageblue rounded
            dark:text-darktext
            "
            >
              <div className="m-2">Topics List</div>
              <img
                alt="newtopic"
                src={commentdot}
                className="w-[30px] opacity-50 m-2"
              />
            </div>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(event) => handleTextChange(event)}
              placeholder="Search here"
              className="
              placeholder:text-slate-700 
              p-2 m-2 h-max justify-center
              outline-none rounded
              "
            />
            <button
              className="m-2 p-2 font-semibold bg-wageblue rounded"
              onClick={() => handleNewClick()}
            >
              {toggled ? "Nevermind!" : "New Topic"}
            </button>
          </div>
          <div>
            {toggled ? (
              <div>
                <TopicForm />
              </div>
            ) : null}
          </div>

          {filteredTopics?.map((topic) => {
            let likes = getFilteredTopicLikes(topic.id, tlData);
            return (
              <div
                className="
                ml-16 my-2 p-2
                text-left shadow-lg
                max-w-prose
                bg-slate-100 rounded
                "
                key={topic.id}
              >
                <button
                  type="button"
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <div className="font-bold text-xl hover:text-wageblue">
                    {topic.title}
                  </div>
                </button>
                <div className="ml-4">
                  <div className="flex flex-row justify-between">
                    {topic.body}
                    <div className="flex flex-row justify-between">
                      {checkLike(topic.id) ? (
                        // <img
                        //   src={thumbsup}
                        //   className="w-[25px] justify-right"
                        // />
                        <button
                          onClick={() =>
                            handleUnlike(
                              likes.filter(
                                (like) => like.account_id === account_id
                              )[0]?.id
                            )
                          }
                        >
                          <img
                            alt="unlike"
                            src={thumbsup}
                            className="w-[25px] justify-right"
                          />
                        </button>
                      ) : (
                        // <img
                        //   alt="like"
                        //   src={thumbsup}
                        //   className="w-[25px] justify-right opacity-25 hover:opacity-100"
                        // />
                        <button onClick={() => handleLike(topic.id)}>
                          <img
                            alt="like"
                            src={thumbsup}
                            className="w-[25px] justify-right opacity-25 hover:opacity-100"
                          />
                        </button>
                      )}

                      <div className="mx-2">{topic?.likes}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="
        flex flex-col
        m-4 p-4 h-max w-64 shadow-xl
        bg-slate-200 rounded
        justify-center items-center
        "
        ></div>
      </div>
    </div>
  );
}
export default ForumPage;
