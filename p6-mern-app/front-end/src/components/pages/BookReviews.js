import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "../../components";
import "./Book.css";
import "./BookReviews.css";
import { formatDateTime, formatDateString } from "../../helper/functions";

const BookReviews = () => {
  const { id } = useParams();

  const [bookInfo, setBookInfo] = useState();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => {
        setBookInfo(res.data);
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

  return (
    <>
      <Nav />
      <div className="bookReviewTitle">
        <h1>Book Review</h1>
      </div>
      {bookInfo ? (
        <div>
          <div className="reviewBookDetail">
            <div className="img">
              <img
                src={bookInfo?.volumeInfo?.imageLinks?.thumbnail}
                alt={bookInfo.volumeInfo.title}
              />
            </div>
            <div className="reviewBookInfo">
              <div className="reviewTitle">{bookInfo.volumeInfo.title}</div>
              <div className="reviewAuthor">
                {bookInfo.volumeInfo.authors.map((a) => {
                  return <p>{a}</p>;
                })}
              </div>
              {/*Tags on site*/}
              {bookInfo.volumeInfo.description ? (
                <div className="summary">
                  <p className="shortSummary">
                    {seeMore
                      ? bookInfo.volumeInfo.description
                      : `${bookInfo.volumeInfo.description?.slice(0, 300)}`}
                    {bookInfo.volumeInfo.description?.slice(300) != "" && (
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
              <div>
                {reviews?.map((review) => {
                  return (
                    <div className="reviewDetails">
                      <p>{formatDateTime(review.timestamp)}</p>
                      <h4>{review.name}:</h4>
                      <p>{review.review}</p>
                    </div>
                  );
                })}
              </div>
              {/* <div className="commentsButton">
                  <button className="comment">Comment</button>
              </div> */}
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
