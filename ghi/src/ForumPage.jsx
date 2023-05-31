import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyDropdown from "./components/CompanyDropdown";
import { useGetCompaniesQuery, useGetTopicsQuery } from "./services/api";

function ForumPage() {
  const { data: cData } = useGetCompaniesQuery();
  const { data: tData } = useGetTopicsQuery();

  const getFilteredTopics = (company, tData) => {
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
  // const filteredTopics = getFilteredTopics(company, tData);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/ForumPage/${id}`);
  };

  return (
    <div>
      <div
        className="
      flex flex-row
      m-4
      "
      >
        <div
          className="
        m-4 p-4 h-max
        bg-slate-200 rounded-xl
        "
        >
          <CompanyDropdown options={cData} />
        </div>
        <div
          className="
        flex flex-col 
        w-full flex-none h-max
        m-8 p-4 w-2/3
        bg-slate-200 rounded-xl
        "
        >
          <div
            className="
          mx-4 my-2 p-2
          w-max
          max-w-prose
          text-2xl font-semibold
          bg-slate-100 rounded-xl
          hover:bg-slate-200
          "
          >
            Topics List
          </div>
          {tData?.map((topic) => {
            return (
              <button
                type="button"
                onClick={() => handleClick(topic.id)}
                key={topic.id}
                className="
              ml-16 my-2 p-2
              text-left
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
