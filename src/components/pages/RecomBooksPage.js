import React, { useState, useEffect } from "react";
import { Nav } from "../../components";
import "./RecomBooksPage.css";
import "./HomeBooks.css";
import axios from "axios";
import Book from "./Book";

const RecomBooksPage = () => {
  const [bookCollection, setBookCollection] = useState([]);

  useEffect(() => {
    let categoryid = "";
    axios
      .get("http://localhost:8888/api/categories/recommended-books")
      .then((res) => {
        const data = res.data.data;
        setBookCollection(data);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="body">
        <div className="recomTitle">Recommended Books</div>
        <div className="quote">
          <h2>
            "If you don’t like to read, you haven’t found the right book."
          </h2>
        </div>

        {bookCollection.length > 0 && (
          <div className="homeBooks">
            {bookCollection.map((book, index) => {
              const layout =
                index % 2 == 0 ? "bookDetails" : "bookDetails left";
              return (
                <Book
                  layout={layout}
                  imgURL={book.imagePath}
                  imgAlt={book.title}
                  title={book.title}
                  author={book.author}
                  summary={book.summary}
                  id={book.bookId}
                />
              );
            })}
            ;
          </div>
        )}
      </div>
    </>
  );
};

export default RecomBooksPage;
