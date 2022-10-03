import React from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  BooksPage,
  RecomBooks,
  LogInPage,
  SignUpPage,
  // BookReviews,
  ErrorPage,
  CommentsPage,
} from "./components";

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/books" element={<BooksPage />} /> */}
        {/* <Route path="/recommended-books" element={<RecomBooks />} /> */}
        {/* <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} /> */}
        {/* <Route path="/book/:id/comments" element={<CommentsPage />} /> */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
