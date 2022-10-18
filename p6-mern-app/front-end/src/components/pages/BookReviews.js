import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "../../components";
import "./Book.css";
import "./BookReviews.css";
import { formatDateTime, formatDateString } from "../../helper/functions";

import { useAuth } from "../../contexts/AuthContext";

const BookReviews = () => {
  const { id } = useParams();

  const [bookInfo, setBookInfo] = useState();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [seeMore, setSeeMore] = useState(false);

  const { token, logUser } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:8888/api/categories/book/${id}`).then((res) => {
      setBookInfo(res.data.bookDetails[0]);
      axios
        .post(`http://localhost:8888/api/reviews/${id}`, {
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          setReviews(res.data.reviews);
        });
    });
  }, []);

  const sendReview = () => {
    axios
      .post(`http://localhost:8888/api/reviews`, {
        review: newReview,
        bookId: id,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.success) {
          axios
            .post(`http://localhost:8888/api/reviews/${id}`, {
              token: localStorage.getItem("token"),
            })
            .then((res) => {
              setReviews(res.data.reviews);
            });
        } else {
          setErrorMessage(res.data.message);
        }
      });
  };

  // SEND COMMENT
  const sendComment = (reviewId) => {
    try {
      axios
        .post(`http://localhost:8888/api/reviews/comment/send`, {
          comment: newComment,
          bookId: id,
          username: logUser.username,
          name: logUser.name,
          token: localStorage.getItem("token"),
          reviewId: reviewId,
        })
        .then((res) => {
          if (res.data.success) {
            axios
              .post(`http://localhost:8888/api/reviews/${id}`, {
                token: localStorage.getItem("token"),
              })
              .then((res) => {
                setReviews(res.data.reviews);
              });
          } else {
          }
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Nav />
      <div className="bookReviewTitle">
        <h1>Reviews</h1>
      </div>
      {bookInfo ? (
        <div>
          <div className="reviewBookDetail">
            <div className="img">
              <img src={bookInfo.imagePath} alt={bookInfo.title} />
            </div>
            <div className="reviewBookInfo">
              <div className="reviewTitle">{bookInfo.title}</div>
              <div className="reviewAuthor">{bookInfo.author}</div>
              {bookInfo.summary ? (
                <div className="summary">
                  <p className="shortSummary">
                    {seeMore
                      ? bookInfo.summary
                      : `${bookInfo.summary?.slice(0, 300)}`}
                    {bookInfo.summary?.slice(300) != "" && (
                      <span
                        className="seeMore"
                        onClick={() => setSeeMore(!seeMore)}
                      >
                        {seeMore ? "...See Less" : "...See More"}
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className="reviewFieldContainer">
                <div>
                  <label for="reviewField">Write a Review:</label>
                  <p>{errorMessage}</p>
                </div>

                <textarea
                  name="reviewField"
                  rows="4"
                  cols="50"
                  className="reviewField"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                ></textarea>

                <button className="sendReview" onClick={() => sendReview()}>
                  Send Review
                </button>
              </div>
              {/*REVIEW*/}
              <div>
                {reviews?.map((review) => {
                  return (
                    <div>
                      <div className="reviewDetails">
                        <div className="revTime">
                          {formatDateTime(review.timestamp)}
                        </div>
                        <div className="reviewName">{review.name}:</div>
                        <div className="textReview">{review.review}</div>
                      </div>
                      {/*COMMENT*/}
                      <div className="commentsContainer">
                        <div className="commTitle">COMMENTS:</div>
                        <div className="commentsSection">
                          {review.comments?.map((comment) => {
                            return (
                              <div className="commentDetails">
                                <div className="commtime">
                                  {formatDateTime(comment?.timestamp)}
                                </div>
                                <div className="commName">{comment.name}:</div>
                                <div className="displayComment">
                                  {comment.comment}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <input
                          type="text"
                          className="commentText"
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div>
                          <button
                            className="commentsButton"
                            onClick={() => sendComment(review._id)}
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Book Not found</h2>
      )}
    </>
  );
};

export default BookReviews;
