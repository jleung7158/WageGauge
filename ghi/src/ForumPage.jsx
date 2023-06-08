import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import {
  useGetCompaniesQuery,
  useGetTopicsQuery,
  useUpdateTopicMutation,
  useGetTopicLikesQuery,
  useCreateTopicLikesMutation,
  useDeleteTopicLikesMutation,
} from "./services/api";
import commentdot from "./img/commentdot.svg";
import thumbsup from "./img/thumbsup.svg";
import TopicForm from "./components/TopicForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsOpen } from "./slices/topicFormSlice";
import PokemonGrabber from "./features/pokemon/Pokemon";
import useToken from "@galvanize-inc/jwtdown-for-react";

function ForumPage() {
  const { data: tlData, isLoading } = useGetTopicLikesQuery();
  const { data: cData } = useGetCompaniesQuery();
  const { data: tData } = useGetTopicsQuery();
  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.topicFormToggler.isOpen);
  const [text, setText] = useState("");
  const [account_id, setAccount_id] = useState("");
  const [editing, setEditing] = useState(null);
  const [createTopicLike] = useCreateTopicLikesMutation();
  const [deleteTopicLike] = useDeleteTopicLikesMutation();
  const company = useSelector((state) => state.companyFilter.company);
  const { token } = useToken();
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [updateTopic] = useUpdateTopicMutation();

  const currentAccount = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
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

  /* eslint-disable */
  const getCompanyTopics = (company, tData) => {
    if (!company) {
      return tData;
    } else {
      return tData?.filter((topic) => {
        for (const [key, value] of Object.entries([topic])) {
          if (topic.company.includes(company)) {
            return topic.company.includes(company);
          }
        }
      });
    }
  };

  const companyTopics = getCompanyTopics(company, tData);

  const handleTextChange = (event) => {
    const value = event.target.value.toLowerCase();
    setText(value);
  };

  const getFilteredTopics = (text, companyTopics) => {
    if (!text) {
      return companyTopics;
    } else {
      return companyTopics?.filter((t) => {
        for (const [key, value] of Object.entries([t])) {
          if (t.body.toLowerCase().includes(text)) {
            return t.body.toLowerCase().includes(text);
          } else if (t.title.toLowerCase().includes(text)) {
            return t.title.toLowerCase().includes(text);
          }
        }
      });
    }
  };
  const filteredTopics = getFilteredTopics(text, companyTopics);

  const getFilteredTopicLikes = (topic_id, tlData) => {
    if (tlData !== "undefined" && !isLoading) {
      return tlData?.filter((t) => {
        return t.topic_id === topic_id;
      });
    }
  };

  const handleNewClick = () => {
    dispatch(toggleIsOpen());
  };

  const handleEditClick = (topic_id, topic_title, topic_body) => {
    setEditing(topic_id);
    setEditTitle(topic_title);
    setEditBody(topic_body);
  };

  function handleEditSubmit(
    event,
    topic_id,
    title,
    body,
    account_id,
    company_id
  ) {
    event.preventDefault();
    updateTopic({ topic_id, title, body, account_id, company_id });
    setEditing(null);
  }

  const checkLike = (topic_id) => {
    let isLiked = false;
    const filteredTopicLikes = getFilteredTopicLikes(topic_id, tlData);
    for (let like of filteredTopicLikes) {
      if (like?.account_id === account_id) {
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
  /* eslint-enable */
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

          {tlData &&
            filteredTopics?.map((topic) => {
              let likes = [];
              {
                tlData
                  ? (likes = getFilteredTopicLikes(topic.id, tlData))
                  : (likes = []);
              }
              return (
                <div
                  className="
                ml-16 my-2 p-2
                text-left shadow-lg
                max-w-prose max-h-48
                bg-slate-100 rounded
                "
                  key={topic.id}
                >
                  <div className="flex flex-row justify-between right-0 mt-2">
                    {token ? (
                      <>
                        {editing === topic.id ? (
                          <form
                            onSubmit={(event) =>
                              handleEditSubmit(
                                event,
                                topic.id,
                                editTitle,
                                editBody,
                                account_id,
                                topic.company_id
                              )
                            }
                            id="updatetopic"
                          >
                            <div className="flex flex-col">
                              <input
                                className="font-bold text-xl w-[240px] rounded"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                              ></input>
                              <textarea
                                className="m-2 w-[540px] h-[80px] pl-4 pt-2 max-w-prose rounded justify-center items-center"
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                              ></textarea>
                            </div>
                            <button
                              className="px-2 font-semibold bg-wageblue rounded"
                              onClick={() => handleEditClick(null)}
                            >
                              Nevermind
                            </button>
                            <button className="px-2 mx-2 font-semibold bg-wageblue rounded">
                              Finish edits
                            </button>
                          </form>
                        ) : (
                          <div className="w-full">
                            <div className="flex flex-row justify-between mb-2">
                              <button
                                type="button"
                                onClick={() => handleTopicClick(topic.id)}
                              >
                                <div className="font-bold text-xl hover:text-wageblue">
                                  {topic.title}
                                </div>
                              </button>
                              <div className="text-sm text-slate-400">
                                {topic.company}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex flex-row justify-between max-h-[80px] overflow-y-auto">
                                <div className="p-2 max-w-prose">
                                  {topic.body}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row mt-2 justify-between">
                              <button
                                disabled={account_id === ""}
                                className="px-2 font-semibold bg-wageblue rounded"
                                onClick={() =>
                                  handleEditClick(
                                    topic.id,
                                    topic.title,
                                    topic.body
                                  )
                                }
                              >
                                Edit
                              </button>
                              <div className="flex flex-row items-center">
                                {checkLike(topic.id) ? (
                                  <button
                                    onClick={() =>
                                      handleUnlike(
                                        likes.filter(
                                          (like) =>
                                            like.account_id === account_id
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
                        )}
                      </>
                    ) : (
                      ""
                    )}
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
      <div>
        <PokemonGrabber />
      </div>
    </div>
  );
}
export default ForumPage;
