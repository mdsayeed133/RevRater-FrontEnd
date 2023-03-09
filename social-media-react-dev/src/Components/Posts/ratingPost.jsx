import React from "react";
import './ratingPost.css'

const RatingPost = ({ ratingPost }) => {
  const { message, imageId, author, rating, createdDate } = ratingPost;
  const { firstName, lastName } = author;
  const { score, tag1, tag2, tag3 } = rating;
  const { tagName: tag1Name } = tag1;
  const { tagName: tag2Name } = tag2;
  const { tagName: tag3Name } = tag3;
  const {
    firstName: empFirstName,
    lastName: empLastName,
    department,
  } = rating.employee;
  const { title: departmentTitle } = department;

  return (
    <div className="ratingPost">
      <div className="ratingPost-header">
        <img
          className="ratingPost-avatar"
          src={`../../Images/instructional-slide-mystery-lady.bf022e31.svg`}
          alt="Avatar"
        />
        <div className="ratingPost-user-info">
          <p className="ratingPost-username">
            By: {firstName} {lastName}
          </p>
          <p className="ratingPost-created-date">on {createdDate}</p>
        </div>
      </div>
      <div className="ratingPost-body">
        <p className="ratingPost-text">{message}</p>
        <p className="ratingPost-rating-score">Rating Score: {score}/10</p>
        <p className="ratingPost-rating-tags">
          Rating Tags: {tag1Name}, {tag2Name}, {tag3Name}
        </p>
        <div className="ratingPost-emp-info">
          <p className="ratingPost-employee">
            About: {empFirstName} {empLastName}
          </p>
          <p className="ratingPost-department">From: {departmentTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingPost;