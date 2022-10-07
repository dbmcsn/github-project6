import React, { useEffect, useState } from "react";
import { Nav } from "../../components";
import axios from "axios";
import "./BooksPage.css";
import Book from "./Book";

const BooksPage = () => {
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
        console.log(response);
        setBookCollection(response.data.items);
      })
      .catch(function (error) {});
  }, []);

  const loadBooksByCategory = (category) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${category}`)
      .then(function (response) {
        setBookCollection(response.data.items);
      })
      .catch(function (error) {});
  };

  return (
    <>
      <Nav />
      <div className="body">
        <div className="titlePage">
          <h1>Books</h1>
        </div>
        <div className="quote">
          <h2>"A room without books is like a body without a soul."</h2>
        </div>
        <div className="categories">
          {categories.map((category) => {
            return (
              <button
                className="bookCategory"
                onClick={() => loadBooksByCategory(category)}
              >
                {category}
              </button>
            );
          })}
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
          </div>
        )}
      </div>
    </>
  );
};

export default BooksPage;
