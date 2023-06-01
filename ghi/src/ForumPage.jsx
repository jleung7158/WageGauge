import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import { useGetCompaniesQuery, useGetTopicsQuery } from "./services/api";

function ForumPage() {
  const { data: cData } = useGetCompaniesQuery();
  const { data: tData } = useGetTopicsQuery();

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

  const navigate = useNavigate();
  const handleClick = (id) => {
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
        bg-slate-200 rounded-xl
        justify-center items-center
        "
        >
          <Dropdown options={cData} />
        </div>
        <div
          className="
        flex flex-col flex-none h-max
        m-8 p-4 w-[720px] shadow-xl
        bg-slate-200 rounded-xl
        "
        >
          <div className="flex flex-row items-center">
            <div
              className="
            mx-4 my-2 p-2
            w-max shadow-lg
            text-2xl font-bold
            bg-gradient-to-r bg-slate-500 rounded-xl
            "
            >
              Topics List
            </div>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(event) => handleTextChange(event)}
              placeholder="Search here"
              className="
              placeholder:text-slate-700 
              p-2 h-max justify-center
              outline-none rounded-xl
              "
            />
          </div>
          {filteredTopics?.map((topic) => {
            return (
              <button
                type="button"
                onClick={() => handleClick(topic.id)}
                key={topic.id}
                className="
              ml-16 my-2 p-2
              text-left shadow-lg
              max-w-prose
              bg-slate-100 rounded
              hover:bg-slate-200
              "
              >
                {topic.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ForumPage;
