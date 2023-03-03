import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, checkIsFollowing } from "../../Stores/userSlice";
import FollowRequest from "../../Classes/FollowRequest";

const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const isFollowing= useSelector((state)=> state.users.isFollowing);

  useEffect(() => {
    dispatch(fetchUserById(userId));
    dispatch(checkIsFollowing(new FollowRequest(userId,21)));
  }, [dispatch, userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      {isFollowing && <p>Follow is ture</p>}
      {!isFollowing &&<p>Follow is false</p>}
    </div>
  );
};

export default UserProfile;
