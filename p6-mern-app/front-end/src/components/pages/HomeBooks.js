import React, { useState, useEffect } from "react";
import "./HomeBooks.css";
import axios from "axios";
import Book from "./Book";

const HomeBooks = () => {
  const [bookCollection, setBookCollection] = useState([]);
  const [categories, setCategories] = useState([
    "Art",
    "Computers",
    "Cooking",
    "Drama",
    "History",
    "Psychology",
    "Science",
    "Travel",
  ]);

  useEffect(() => {
    const catIndex = Math.floor(Math.random() * categories.length);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${categories[catIndex]}`
      )
      .then(function (response) {
        setBookCollection(response.data.items);
      })
      .catch(function (error) {});
  }, []);

  return (
    <>
      {bookCollection.length > 0 && (
        <div className="homeBooks">
          {bookCollection.map((book, index) => {
            const layout = index % 2 == 0 ? "bookDetails" : "bookDetails left";
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
        </div>
      )}
    </>
  );
};

export default HomeBooks;
