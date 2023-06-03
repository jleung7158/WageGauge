import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import { useGetCompaniesQuery, useGetTopicsQuery } from "./services/api";
import commentdot from "./img/commentdot.svg";
import TopicForm from "./components/TopicForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleIsOpen } from "./slices/topicFormSlice";

function ForumPage() {
  const { data: cData } = useGetCompaniesQuery();
  const { data: tData } = useGetTopicsQuery();
  const dispatch = useDispatch();
  const toggled = useSelector((state) => state.topicFormToggler.isOpen);

  const [text, setText] = useState("");

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
          if (t.text.toLowerCase().includes(text)) {
            return t.text.toLowerCase().includes(text);
          }
        }
      });
    }
  };
  const filteredTopics = getFilteredTopics(text, tData);

  const handleNewClick = () => {
    dispatch(toggleIsOpen());
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
          <div className="flex flex-row items-center">
            <div
              className="
            mx-4 my-2 p-2 
            flex items-center
            w-max shadow-lg
            text-2xl font-bold
            bg-gradient-to-r bg-slate-500 rounded
            dark:text-darktext
            "
            >
              Topics List
              <img src={commentdot} className="w-[30px] opacity-50 m-2" />
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
            return (
              <button
                type="button"
                onClick={() => handleTopicClick(topic.id)}
                key={topic.id}
                className="
              ml-16 my-2 p-2
              text-left shadow-lg
              max-w-prose
              bg-slate-100 rounded
              hover:bg-slate-200
              "
              >
                <div className="font-bold text-lg">{topic.title}</div>
                <div className="ml-4">{topic.body}</div>
              </button>
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
