import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeeById } from '../../Stores/employeeSlice';
import {getTop3TagsOfEmployee, getEmployeeAvgRating} from '../../Stores/ratingSlice';
import {unfollowEmployee, followEmployee, checkIsFollowing} from '../../Stores/userSlice';
import FollowRequest from '../../Classes/FollowRequest';
import './employeeProfile.css';

const EmployeeProfile = () => {
  let {id} = useParams(); //path = '/employeeprofile/:id'
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);
  const employee = useSelector((state) => state.employees.employee);
  const score =useSelector((state) => state.rating.employeeAvgRating);
  const tags= useSelector((state) => state.rating.top3Tags);
  const isFollowing = useSelector((state) => state.users.isFollowing);
  const followMessage = useSelector((state) => state.users.followMessage);
  const [click, setClick]= useState(false);

  const Follow = () => {
    dispatch(followEmployee(new FollowRequest(user.id,id)));
    setClick(true);
  };

  const UnFollow= ()=>{
    dispatch(unfollowEmployee(new FollowRequest(user.id, id)));
    setClick(true);
  }

  useEffect(() => {
    dispatch(getEmployeeById(id));
    dispatch(getTop3TagsOfEmployee(id));
    dispatch(getEmployeeAvgRating(id));
    if(user){
      dispatch(checkIsFollowing(new FollowRequest(user.id,id)));
    }
  }, [dispatch, id, user]);

if (!employee ) {
    return <div className='not-found-message'>We can't found this person?</div>;
}

  return (
    <div className="page-container-emp">
      <div className="profile-container-emp">
        <div className="row-emp">
          <div className="colum-emp">
            <div className="infos-emp">
              <h2 className="emp-info">
                Name: {employee.firstName} {employee.lastName}
              </h2>
              <h4 className="emp-info">
                Department: {employee.department.title}
              </h4>
              <h5 className="emp-info">
                Author: {employee.author.firstName} {employee.author.lastName}
              </h5>
              <h5 className="emp-info">Added at: {employee.createdDate}</h5>
              {!tags && (
                <h4 className="emp-info">Most popular tags: loading...</h4>
              )}
              {tags && (
                <h4 className="emp-info">
                  Most popular tags: {tags[0].tagName}, {tags[1].tagName} and{" "}
                  {tags[2].tagName}
                </h4>
              )}
            </div>
            <div className="btn-box">
              <button className="comment-btn">Create post</button>
            </div>
          </div>
        </div>
        <div className="colum-emp">
          <div className="status-box-emp">
            <ul>
              <li>
                Rating: <em>{score}</em>
              </li>
              <li>
                About Posts: <em>21</em>
              </li>
            </ul>
          </div>
        </div>
        <div className="colum-emp">
          <div className="profile-pic-box-emp">
            <div className="pic-container-emp">
              <p id="profilePic-emp">
                {employee.firstName.charAt(0)}
                {employee.lastName.charAt(0)}
              </p>
              <div className="followBox-emp">
                {click && <p>{followMessage}</p>}
                {!user && (
                  <p>
                    <Link to="/login">Login</Link> Please
                  </p>
                )}
                {user && !isFollowing &&<button className="Follow-btn-emp" onClick={Follow}>Follow</button>}
                {user && isFollowing &&<button className="Follow-btn-emp" onClick={UnFollow}>UnFollow</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="posted-container-emp">
        <h2>
          <em>comments will populate below</em>
        </h2>
      </div>
    </div>
  );
}

export default EmployeeProfile;