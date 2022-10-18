import React from "react";
import axios from "axios";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  PrivateRoute,
  HomePage,
  BooksPage,
  RecomBooksPage,
  LogInPage,
  LogOut,
  SignUpPage,
  BookReviews,
  SearchPage,
} from "./components";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<HomePage />} />
            <Route path="book/:id" element={<BookReviews />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="recommended-books" element={<RecomBooksPage />} />
          </Route>
          <Route path="/login" element={<LogInPage />} />

          <Route path="/logout" element={<LogOut />} />

          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/search/:searchStr" element={<SearchPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
