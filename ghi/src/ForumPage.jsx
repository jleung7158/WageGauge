import React from "react";
import Dropdown from "./components/CompanyDropdown";
import { useGetCompaniesQuery, useGetTopicsQuery } from "./services/api";

function ForumPage() {
  const { data: cData } = useGetCompaniesQuery();
  const { data: tData } = useGetTopicsQuery();
  console.log(tData);
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
  // const getFilteredTopics = (company, tData) => {
  //   if (!company) {
  //     return tData;
  //   } else {
  //     return tData?.filter((topic) => {
  //       for (const [key, value] of Object.entries([topic])) {
  //         if (topic.company.includes(company)) {
  //           return topic.company.includes(company);
  //         }
  //       }
  //     });
  //   }
  // };

  return (
    <div>
      <div
        className="
      flex flex-row
      m-4
      "
      >
        <div>
          Sidebar
          <Dropdown options={cData} />
        </div>
        <div className="m-4">
          Topics List
          {tData?.map((topic) => {
            return <div key={topic.id}>{topic.text}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
export default ForumPage;
