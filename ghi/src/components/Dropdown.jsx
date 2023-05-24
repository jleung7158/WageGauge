import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompany, clearCompany } from "../slices/filterSlice";

const Dropdown = ({ companies }) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const company = useSelector((state) => state.positionFilter.company);
  // console.log("this is redux company", company);
  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  const handleDropdownClick = (company) => {
    if (company?.name?.toLowerCase() !== selected.toLowerCase()) {
      setSelected(company.name);
      setInputValue("");
    }
    dispatch(setCompany(company.name));
    setOpen(false);
  };

  const handleClearClick = () => {
    dispatch(clearCompany());
    setSelected("");
  };

  return (
    <div className="w-72 font-medium items-center">
      Redux: {company}
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
        <button
          className={`bg-slate-100
        w-half p-2
        flex rounded 
        items-center justify-center
        ${selected ? "block" : "hidden"}
        `}
          onClick={() => {
            handleClearClick();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
