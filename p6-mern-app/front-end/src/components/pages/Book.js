import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Book.css";

const Book = ({ imgURL, imgAlt, title, author, summary, id, layout }) => {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <>
      <div className={layout}>
        <div className="img">
          <Link to={`/book/${id}`}>
            <img src={imgURL} alt={imgAlt} />
          </Link>
        </div>
        <div className="bookInfo">
          <div className="title">{title}</div>
          <div className="author">
            {author?.map((a) => {
              return <p>{a}</p>;
            })}
          </div>
          {summary ? (
            <div className="summary">
              <p className="shortSummary">
                {seeMore ? summary : `${summary?.slice(0, 300)}`}
                {summary?.slice(300) != "" && (
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
          <div className="reviewsButton">
            <Link to={`/book/${id}`}>
              <button className="reviews">Reviews</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
