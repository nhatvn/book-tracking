import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from './BooksAPI'
import SearchBooks from "./SearchBooks";
import Books from './Books'
import * as ShelfType from './ShelfType'
import { Link, Routes, Route } from "react-router-dom";

function App() {
  const [books, setBooks] = useState(null);
  const getBooks = async () => {
    const res = await BooksAPI.getAll();
    setBooks(res);
  };

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <Routes>
      <Route exct path="/" element={
        <div className="app">
          <h1 className="my-reads">MyReads</h1>
          <div>
            <Books books={books} setBooks={setBooks} shelfType={ShelfType.CurrentlyReading} />
            <Books books={books} setBooks={setBooks} shelfType={ShelfType.WantToRead} />
            <Books books={books} setBooks={setBooks} shelfType={ShelfType.Read} />
          </div>
          <Link to="search" className="search-book"></Link>
        </div>
      }
      />
      <Route exct path="/search" element={<SearchBooks books={books} setBooks={setBooks} getBooks={getBooks} />} />
    </Routes>
  );
}

export default App;
