import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCompany, clearCompany } from "../slices/companySlice";

const CompanyDropdown = ({ options }) => {
  const location = useLocation();
  // const { companyId } = location.state;

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const option = useSelector((state) => state.companyFilter.option);
  // console.log("this is redux option", option);
  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  const handleDropdownClick = (option) => {
    if (option?.name?.toLowerCase() !== selected.toLowerCase()) {
      setSelected(option.name);
      setInputValue("");
    }
    dispatch(setCompany(option.name));
    setOpen(false);
  };

  const handleClearClick = () => {
    dispatch(clearCompany());
    setSelected("");
  };

  return (
    <div className="w-72 font-medium items-center">
      <div
        className="
      w-full p-2 my-4
      flex rounded 
      items-center justify-center
      text-xl font-bold text-gray-700
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
        {selected ? selected : "Select an option"}
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
              id="companies"
              value={inputValue}
              onChange={(e) => handleValueChange(e)}
              placeholder="Search here"
              className="placeholder:text-slate-700 p-2 outline-none"
            />
          </div>
          {options?.map((option) => {
            return (
              <option
                key={option.id}
                value={option.id}
                className={`
              p-2 text-sm 
              hover:bg-sky-600
              hover:text-white
              ${
                option?.name?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                option?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }
              `}
                onClick={() => {
                  handleDropdownClick(option);
                }}
              >
                {option.name}
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

export default CompanyDropdown;
