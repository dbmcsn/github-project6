import React, { useState } from "react";
import "./HomeBooks.css";
import { useEffect } from "react";
import axios from "axios";
import Book from "./Book";

const HomeBooks = () => {
  const options = {
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=art",
  };

  const [bookCollection, setBookCollection] = useState([]);

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setBookCollection(response.data.items);
        console.log(response.data.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="homeBooks">
        {bookCollection.map((book) => {
          return (
            <Book
              imgURL={book?.volumeInfo?.imageLinks?.thumbnail}
              imgAlt={book.volumeInfo.title}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors}
              summary={book.volumeInfo.description}
              id={book.id}
            />
          );
        })}
      </div>
    </>
  );
};

export default HomeBooks;
