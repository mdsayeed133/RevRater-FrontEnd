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
                <option value={1}>Aggravating</option>
                <option value={2}>Amusing</option>
                <option value={3}>Anxious</option>
                <option value={4}>Bad</option>
                <option value={5}>Boring</option>
                <option value={6}>Challenging</option>
                <option value={7}>Childish</option>
                <option value={8}>Confusing</option>
                <option value={9}>Discouraging</option>
                <option value={10}>Disliked</option>
                <option value={11}>Engaging</option>
                <option value={12}>Friendly</option>
                <option value={13}>Frustrating</option>
                <option value={14}>Fulfilling</option>
                <option value={15}>GLHF</option>
                <option value={16}>Good</option>
                <option value={17}>Inconsiderate</option>
                <option value={18}>Infuriating</option>
                <option value={19}>Musical</option>
                <option value={20}>Nerd</option>
                <option value={21}>Offputting</option>
                <option value={22}>Rage-inducing</option>
                <option value={23}>Respected</option>
                <option value={24}>Respectful</option>
                <option value={25}>Stressful</option>
                <option value={26}>Understanding</option>
              </select>
            </div>
            <div className="search-emp-department">
              <span>Department: </span>
              <select
                value={searchDepartment}
                onChange={handleSearchDepartmentChange}
              >
                <option value={0}>All</option>
                <option value={1}>Accounting Team</option>
                <option value={2}>Center of Excellence</option>
                <option value={3}>HR Team</option>
                <option value={4}>IT Support</option>
                <option value={5}>Legal Team</option>
                <option value={6}>Management</option>
                <option value={7}>Marketing Team</option>
                <option value={8}>PDP Team</option>
                <option value={9}>QC Team</option>
                <option value={10}>Recruitment Department</option>
                <option value={11}>Sales Department</option>
                <option value={12}>Training Department</option>
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
          <h1>There are no employees here</h1>
        </div>
      )}
      {!UserResult && !searchType && (
        <div className="search-fail">
          <h1>There are no users here</h1>
        </div>
      )}
    </div>
  );
}

export default Search;
