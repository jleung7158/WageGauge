import React from "react";
import { useState, useEffect } from "react";

const Dropdown = ({
  companies,
  getCompanySelected,
  fetchPositionData,
  reCompany,
  setReCompany,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const [companySelect, setCompanySelect] = useState("");

  const handleValueChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  const handleDropdownClick = (company) => {
    if (company?.name?.toLowerCase() !== selected.toLowerCase()) {
      setSelected(company.name);
      // console.log(selected);
      setInputValue("");
    }
    setCompanySelect(company?.name);
    getCompanySelected(companySelect);
    setReCompany(company?.name);
    setOpen(false);
  };

  const [company, setCompany] = useState("");

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="w-72 font-medium items-center">
      {companySelect}
      <div
        className="
      w-72 p-2 my-4
      flex rounded 
      text-xl font-bold text-gray-700
      items-center justify-center
      bg-gradient-to-r slate-500
      "
      >
        Companies
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-slate-100
      w-full p-2
      flex rounded 
      items-center justify-center
      ${!selected && "text-slate-700"}
      `}
      >
        {selected ? selected : "Select a company"}
      </div>
      <div>
        <ul
          className={`
        mt-2 bg-slate-100 rounded
        overflow-y-auto
        ${open ? "max-h-52" : "max-h-0"}`}
        >
          <div className="px-2 sticky top-0 bg-white">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleValueChange(e)}
              placeholder="Enter company name"
              className="placeholder:text-slate-700 p-2 outline-none"
            />
          </div>
          {companies?.map((company) => {
            return (
              <option
                key={company.id}
                value={company.id}
                className={`
              p-2 text-sm 
              hover:bg-sky-600
              hover:text-white
              ${
                company?.name?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                company?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }
              `}
                onClick={() => {
                  handleDropdownClick(company);
                }}
              >
                {company.name}
              </option>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
