import React, { useState, useEffect } from "react";
import { Nav } from "../../components";
import "./RecomBooksPage.css";
import "./HomeBooks.css";
import axios from "axios";
import Book from "./Book";

const RecomBooksPage = () => {
  const [bookCollection, setBookCollection] = useState([]);

  const [categories, setCategories] = useState(["Music"]);

  useEffect(() => {
    const catIndex = Math.floor(Math.random() * categories.length);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${categories[catIndex]}`
      )
      .then(function (response) {
        console.log(response);
        setBookCollection(response.data.items);
      })
      .catch(function (error) {});
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
                  imgURL={book?.volumeInfo?.imageLinks?.thumbnail}
                  imgAlt={book?.volumeInfo?.title}
                  title={book?.volumeInfo?.title}
                  author={book?.volumeInfo?.authors}
                  summary={book?.volumeInfo?.description}
                  id={book.id}
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
