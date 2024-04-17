import { useState } from "react"
import Books from "./Books";
import * as BooksAPI from './BooksAPI'
import { Link } from "react-router-dom";

const SearchBooks = ({ books, setBooks, getBooks }) => {
  const [searchBooks, setSearchBooks] = useState(null);

  const updateQuery = (query) => {
    if (query === '') {
      setSearchBooks(null);
    }
    else {
      (async () => {
        let res = await BooksAPI.search(query);

        if (res.error === 'empty query') {
          res = [];
        }
        else if (books) {
          res.forEach(book => {
            var bookShelf = books.find((currentBook) => {
              return book.id === currentBook.id;
            });

            if (bookShelf) {
              book.shelf = bookShelf.shelf;
            }
          });
        }

        setSearchBooks(res);
      })();
    }
  }

  return (
    <div>
      <div className="search-container">
        <Link
          to="/"
          className="close-search"
          onClick={getBooks}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, author, or ISBN"
          onChange={(event) => updateQuery(event.target.value)}
          autoFocus
        />
      </div>
      <div className="search-book-result">
        <Books books={books} setBooks={setBooks} searchBooks={searchBooks} setSearchBooks={setSearchBooks} />
      </div>
    </div>
  )
}

export default SearchBooks