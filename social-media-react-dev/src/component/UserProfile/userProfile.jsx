import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../Store/userSlice";

const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
