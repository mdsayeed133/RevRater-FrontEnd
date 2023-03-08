import React from "react";
import {  useNavigate } from "react-router-dom";
import "./card.css";

const UserCard = ({ user }) => {
  const navigate =  useNavigate();

  const seeProfile = () => {
    navigate(`/public-profile/${user.id}`);
  };

  return (
    <div className="card">
      <div className="card-img">
        { user.firstName.charAt(0)}
        { user.lastName.charAt(0)}
      </div>
      <div className="card-body">
        <h5 className="card-title">{`${user.firstName} ${user.lastName}`}</h5>
        <p className="card-text">
          Email: <em>{ user.email}</em>
        </p>
        <div className="button-card">
          <button onClick={seeProfile}>See Profile</button>
        </div>
      </div>
    </div>
  );
};

export default  UserCard;
