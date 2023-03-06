import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './userProfile.css';

const UserProfile = () => {
  const user = useSelector((state) => state.auth.login);

  

  if (!user) {
    return <div className="not-login-message"><Link to="/login">Login</Link> Please</div>;
  }
  return (
    <div className="page-container">
        <div className="title">{user.firstName}'s Profile</div>
        <div className="profile-container">
            <div className="row">
                <div className="colum">
                    <div className="user-stats">
                        <ul>
                            <li>Join Date: <em>{user.date}</em></li>
                            <li>Number of Posts: <em>21</em></li>
                            <li>Average Rating Given: <em>6.58</em></li>
                            <li>Favorite Tag: <em>Hard Grader</em></li>
                        </ul>
                    </div>
                </div>
                <div className="colum">
                    <div className="user-info">
                        <div className="deets">
                            <p className="details">First Name: <em id="dispPic">{user.firstName}</em></p>
                            <p className="details">Last Name: <em>{user.lastName}</em></p>
                            <p className="details">Email: <em>{user.email}</em></p>
                            <button className="btn">Reset Password</button>
                        </div>
                    </div>
                </div>
                <div className="colum">
                    <div className="user-pic">
                        <p id="profilePic">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</p>
                        <button className="btn">View Public</button>
                    </div>
                </div>
            </div>
            {/* this should hold the posted comments upon a click */}
        </div>
        <div className="posted-container">
            <h2><em>comments will populate below</em></h2>
        </div>
    </div>            
  );
};

export default UserProfile;