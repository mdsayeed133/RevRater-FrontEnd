import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchEmployees } from "../../Stores/searchSlice";
import {searchUsers} from '../../Stores/userSlice'
import EmployeeCard from "../Cards/employeeCard";
import UserCard from "../Cards/userCard";
import SearchRequest from "../../Classes/SearchRequest";
import "./search.css";

function Search() {
  const dispatch = useDispatch();
  const EmployeeResult = useSelector((state) => state.search.searchResults);
  const UserResult = useSelector((state) => state.users.searchResults);
  const [searchType, setSearchType] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState(0);
  const [searchDepartment, setSearchDepartment] = useState(0);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value === "true");
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTagChange = (event) => {
    setSearchTag(event.target.value);
  };
  const handleSearchDepartmentChange = (event) => {
    setSearchDepartment(event.target.value);
  };

  const handleClick = () => {
    if(searchType){
    dispatch(
      searchEmployees(
        new SearchRequest(searchTerm, searchDepartment, searchTag)
      )
    );} else{
        dispatch(searchUsers(searchTerm));
    }

  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <div className="search-row-1">
          <div className="search-type">
            <select value={searchType} onChange={handleSearchTypeChange}>
              <option value={true}>Employee</option>
              <option value={false}>User</option>
            </select>
          </div>
          <div className="search-name">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="search-btn">
            <button onClick={handleClick}>search</button>
          </div>
        </div>
        {searchType && (
          <div className="search-row-2">
            <div className="search-emp-tag">
              <span>Tag: </span>
              <select value={searchTag} onChange={handleSearchTagChange}>
                <option value={0}>All</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            <div className="search-emp-department">
              <span>Department: </span>
              <select
                value={searchDepartment}
                onChange={handleSearchDepartmentChange}
              >
                <option value={0}>All</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
          </div>
        )}
      </div>
      {EmployeeResult && searchType && (
        <div className="search-result">
          {EmployeeResult.map((employee, index) => (
            <EmployeeCard key={index} employee={employee} />
          ))}
        </div>
      )}
      {UserResult && !searchType && (
        <div className="search-result">
          {UserResult.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      )}
      {!EmployeeResult && searchType && (
        <div className="search-fail">
          <h1>There is no employee here</h1>
        </div>
      )}
      {!UserResult && !searchType && (
        <div className="search-fail">
          <h1>There is no user here</h1>
        </div>
      )}
    </div>
  );
}

export default Search;
