import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCompany, clearCompany } from "../slices/companySlice";
import { useGetCompanyQuery } from "../services/api";
import building from "../img/building.svg";

const CompanyDropdown = ({ options }) => {
  const location = useLocation();
  const { companyId } = location.state;
  const companyData = useGetCompanyQuery(companyId);
  const companyName = companyData?.data?.name;

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const option = useSelector((state) => state.companyFilter.option);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selected) {
      setSelected(companyName);
      dispatch(setCompany(companyName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName]);

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
    <div
      className="
    flex flex-col
    w-72 font-medium 
    items-center justify-center
    content-center
    text-center
    "
    >
      <div
        className="
      w-max p-2 my-4
      flex rounded shadow-lg
      text-xl font-bold text-black
      bg-gradient-to-r items-center
      dark:text-darktext
      "
      >
        Companies
        <img src={building} className="w-[25px] opacity-50 mx-2" />
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-slate-100
      w-3/5 p-2 text-lg font-bold
      flex rounded shadow-lg
      items-center justify-center
      ${!selected && "text-slate-700"}
      `}
      >
        {selected ? selected : "Select an option"}
      </div>
      <div className="flex flex-col justify-center items-center">
        <ul
          className={`
        my-2 bg-slate-100 rounded
        overflow-y-auto shadow-lg
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
        w-1/4 p-2 rounded shadow-lg
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
