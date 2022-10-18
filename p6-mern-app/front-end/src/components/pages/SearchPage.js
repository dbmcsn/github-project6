import React, { useEffect, useState } from "react";
import { Nav } from "../../components";
import axios from "axios";
import "./BooksPage.css";
import Book from "./Book";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { searchStr } = useParams();
  const [bookCollection, setBookCollection] = useState([]);
  const [readCategory, setReadCategory] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8888/api/categories/search", {
        search: searchStr,
      })
      .then((res) => {
        if (res.data.success) {
          setBookCollection(res.data.books);
        }
      });
  }, []);

  if (!bookCollection) {
    <h1>none</h1>;
  }

  return (
    <>
      <Nav />
      <div className="body">
        <div className="titlePage">
          <h1>Books</h1>
        </div>
        <div className="quote">
          <h2>
            "Good friends, good books, and a sleepy conscience: this is the
            ideal life."
          </h2>
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

export default SearchPage;
