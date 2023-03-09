import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeById } from "../../Stores/employeeSlice";
import {
  getTop3TagsOfEmployee,
  getEmployeeAvgRating,
} from "../../Stores/ratingSlice";
import {
  unfollowEmployee,
  followEmployee,
  checkIsFollowing,
} from "../../Stores/userSlice";
import { getPostsAboutEmployee } from "../../Stores/postSlice";
import FollowRequest from "../../Classes/FollowRequest";
import "./employeeProfile.css";
import RatingPost from "../Posts/ratingPost";

const EmployeeProfile = () => {
  let { id } = useParams(); //path = '/employee=profile/:id'
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);
  const employee = useSelector((state) => state.employees.employee);
  const score = useSelector((state) => state.rating.employeeAvgRating);
  const tags = useSelector((state) => state.rating.top3Tags);
  const isFollowing = useSelector((state) => state.users.isFollowing);
  const followMessage = useSelector((state) => state.users.followMessage);
  const posts = useSelector((state) => state.post.postsAboutEmployee);
  const [click, setClick] = useState(false);
  const [followCheck, setFollow] = useState(isFollowing);

  const Follow = () => {
    dispatch(followEmployee(new FollowRequest(user.id, id)));
    setFollow(true);
    setClick(true);
  };

  const UnFollow = () => {
    dispatch(unfollowEmployee(new FollowRequest(user.id, id)));
    setFollow(false);
    setClick(true);
  };

  useEffect(() => {
    dispatch(getEmployeeById(id));
    dispatch(getTop3TagsOfEmployee(id));
    dispatch(getEmployeeAvgRating(id));
    dispatch(getPostsAboutEmployee(id));
    if (user) {
      dispatch(checkIsFollowing(new FollowRequest(user.id, id)));
      setFollow(isFollowing);
    }
  }, [dispatch, id, user, isFollowing]);

  if (!employee) {
    return <div className="not-found-message">We can't find this person?</div>;
  }

  return (
    <div className="page-container-emp">
      <div className="profile-container-emp">
        <div className="row-emp">
          <div className="colum-emp">
            <div className="infos-emp">
              <h2 className="emp-info-name">
                Name: {employee.firstName} {employee.lastName}
              </h2>
              <h3 className="emp-info">
                Department: {employee.department.title}
              </h3>
              <p className="emp-info">
                Author: {employee.author.firstName} {employee.author.lastName}
              </p>
              <p className="emp-info">Added at: {employee.createdDate}</p>
              {!tags && (
                <p className="emp-info">Most popular tags: loading...</p>
              )}
              {tags && (
                <p className="emp-info">
                  Most popular tags: {tags[0].tagName}, {tags[1].tagName} and{" "}
                  {tags[2].tagName}
                </p>
              )}
            </div>
            <div className="btn-box">
              <button className="comment-btn">Create post</button>
            </div>
          </div>
          <div className="colum-emp">
            <div className="status-box-emp">
              <ul>
                <li>
                  Rating: <em>{score}</em>
                </li>
                <li>
                  About Posts: <em>{posts.length}</em>
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
                  {!click && <p>|</p>}
                  {!user && (
                    <p>
                      <Link to="/login">Login</Link> to follow
                    </p>
                  )}
                  {user && !followCheck && (
                    <button className="Follow-btn-emp" onClick={Follow}>
                      Follow
                    </button>
                  )}
                  {user && followCheck && (
                    <button className="Follow-btn-emp" onClick={UnFollow}>
                      UnFollow
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="posted-container-emp">
        <h2>
          {posts.map((post, index) => (
            <RatingPost key={index} ratingPost={post} />
          ))}
        </h2>
      </div>
    </div>
  );
};

export default EmployeeProfile;
