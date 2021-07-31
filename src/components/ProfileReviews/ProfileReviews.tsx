import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Loading from "../Loading/Loading";
import axios from "axios";
import "./ProfileReviews.scss";
import ReviewCard from "../ReviewCard/ReviewCard";

interface Reviews {
  _id: string;
  bookID: string;
  content: string;
  userID: string;
  date: string;
}

const ProfileReviews: React.FC = () => {
  const location = useLocation();
  const defaultReview: Reviews[] = [];
  const [reviews, setReviews]: [Reviews[], (reviews: Reviews[]) => void] =
    useState(defaultReview);
  const [reviewErrorMessage, setReviewErrorMessage] = useState("");
  const userIdFromPath = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);

    const getBooks = async () => {
      try {
        await axios
          .get(`/api/bookreviewbyuser/${userIdFromPath}`, {
            cancelToken: source.token,
          })
          .then(({ data }) => {
            setLoading(false);
            setReviews(data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          setLoading(false);
          setReviewErrorMessage("Unable to find reviews for this user.");
          throw error;
        }
      }
    };

    getBooks();

    return () => {
      source.cancel();
    };
  }, [userIdFromPath]);

  const reviewsList = reviews.map((review) => {
    return (
      <div className="review-card">
        <ReviewCard
          width="400"
          _id={review._id}
          author={userIdFromPath}
          user={review.userID}
          content={review.content}
          date={review.date}
          updateReviews={() => {
            return null;
          }}
        />
      </div>
    );
  });

  console.log(reviewsList);
  return (
    <div className="profile-reviews-container">
      {loading ? (
        <Loading />
      ) : (
        <>{reviewsList.length > 0 ? reviewsList : reviewErrorMessage}</>
      )}
    </div>
  );
};

export default ProfileReviews;
