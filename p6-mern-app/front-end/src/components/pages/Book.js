import React from "react";
import { Link } from "react-router-dom";

const Book = ({ imgURL, imgAlt, title, author, summary, id }) => {
  console.log(imgURL);
  return (
    <>
      <div>
        <div>
          <Link to={`/book/${id}`}>
            <img src={imgURL} alt={imgAlt} />
          </Link>
        </div>
        <div className="bookDetails">
          <div className="title">{title}</div>
          <div className="author">
            {author.map((a) => {
              return <p>{a}</p>;
            })}
          </div>
          <div className="Summary">{summary}</div>
          <div className="bookButtons">
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
