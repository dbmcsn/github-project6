import React, { useState, useEffect } from "react";
import "./HomeBooks.css";
import axios from "axios";
import Book from "./Book";
import "./Book.css";

const HomeBooks = () => {
  const [bookCollection, setBookCollection] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let categoryid = "";
    axios
      .get("http://localhost:8888/api/categories")
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.categories);
          const catIndex = Math.floor(
            Math.random() * res.data.categories.length
          );
          categoryid = res.data.categories[catIndex]._id;
        }
      })
      .finally(() => {
        axios
          .get(`http://localhost:8888/api/categories/${categoryid}`)
          .then(function (response) {
            setBookCollection(response.data.books);
          })
          .catch(function (error) {});
      });
  }, []);

  return (
    <>
      {bookCollection?.length > 0 && (
        <div className="homeBooks">
          {bookCollection?.map((book, index) => {
            const layout = index % 2 == 0 ? "bookDetails" : "bookDetails left";
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
        </div>
      )}
    </>
  );
};

export default HomeBooks;
