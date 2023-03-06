import React , {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getRatingPostsOfUser,getCommentPostsOfUser,getReplyPostsOfUser } from '../../Stores/postSlice';
import './userProfile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login);
    const [averageRating ,setAverageRating] = useState(0);
    const RatingPosts= useSelector((state)=> state.post.ratingPostsOfUser);
    const CommmentPosts= useSelector((state)=> state.post.commentPostsOfUser);
    const ReplyPosts= useSelector((state)=> state.post.replyPostsOfUser);

    

    const updateAverageRating= () => {
        let currentTotal = 0;
        for (let i = 0; i < RatingPosts.length; i++) {
            currentTotal += RatingPosts[i].rating.score;
        }
        if(RatingPosts.length !==0)currentTotal = currentTotal/RatingPosts.length;
        console.log("Displayed Average: "+currentTotal);
        setAverageRating(currentTotal);
    }

    useEffect(()=>{
        if(user){
            dispatch(getRatingPostsOfUser(user.id));
            dispatch(getCommentPostsOfUser(user.id));
            dispatch(getReplyPostsOfUser(user.id));
            updateAverageRating();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, user])

    if (!user) {return <div className="not-login-message"><Link to="/login">Login</Link> Please</div>;} 
    
    return (
    <div className="page-container-user">
        <div className="title-user">{user.firstName}'s User Profile</div>
        <div className="profile-container-user">
            <div className="row-user">
                <div className="colum-user">
                    <div className="user-stats">
                        <ul>
                            <li>Join Date: <em>{user.date}</em></li>
                            <li>Number of Ratings Made: <em>{RatingPosts.length}</em></li>
                            <li>Number of Comments Made: <em>{ CommmentPosts.length}</em></li>
                            <li>Number of Replies Made: <em>{ ReplyPosts.length}</em></li>
                            <li>Average Rating Given: <em>{averageRating}</em></li>
                        </ul>
                    </div>
                </div>
                <div className="colum-user">
                    <div className="user-info">
                        <div className="deets">
                            <p className="details">First Name: <em id="dispPic">{user.firstName}</em></p>
                            <p className="details">Last Name: <em>{user.lastName}</em></p>
                            <p className="details">Email: <em>{user.email}</em></p>
                            <button className="btn-user">Reset Password</button>
                        </div>
                    </div>
                </div>
                <div className="colum-user">
                    <div className="user-pic">
                        <p id="profilePic-user">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</p>
                        <button className="btn-user">View Public</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="posted-container-user">
            <h2><em>comments will populate below</em></h2>
        </div>
    </div>            
    );
};

export default UserProfile;