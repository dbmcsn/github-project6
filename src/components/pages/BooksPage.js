import React, { useEffect, useState } from "react";
import { Nav } from "../../components";
import axios from "axios";
import "./BooksPage.css";
import Book from "./Book";

const BooksPage = () => {
  const [bookCollection, setBookCollection] = useState([]);
  const [categories, setCategories] = useState(["Art", "History", "Travel"]);
  const [readCategory, setReadCategory] = useState("");

  useEffect(() => {
    let categoryid = "";
    axios
      .get(`http://localhost:8888/api/categories/`)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.categories);
          const catIndex = Math.floor(
            Math.random() * res.data.categories.length
          );
          categoryid = res.data.categories[catIndex]._id;
          setReadCategory(categoryid);
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

  const loadBooksByCategory = (category) => {
    axios
      .get(`http://localhost:8888/api/categories/${category}`)
      .then(function (response) {
        setBookCollection(response.data.books);
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
                onClick={() => loadBooksByCategory(category._id)}
              >
                {category.categoryName}
              </button>
            );
          })}
        </div>
        {bookCollection?.length > 0 && (
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
          </div>
        )}
      </div>
    </>
  );
};

export default BooksPage;
