import * as ShelfType from './ShelfType'
import * as BooksAPI from './BooksAPI'

const Books = ({ books, setBooks, searchBooks, setSearchBooks, shelfType }) => {
    let booksFilter = searchBooks !== undefined ? searchBooks : books;
    let bookshelfTitle = '';

    if (shelfType === ShelfType.CurrentlyReading) {
        bookshelfTitle = 'Currently Reading';
    }
    else if (shelfType === ShelfType.WantToRead) {
        bookshelfTitle = 'Want to Read';
    }
    else if (shelfType === ShelfType.Read) {
        bookshelfTitle = 'Read';
    }

    if (shelfType && booksFilter) {
        booksFilter = booksFilter.filter((book) => { return book.shelf === shelfType; });
    }

    const bookShelfChange = (book, shelfTypeSelected) => {
        (async () => {
            await BooksAPI.update(book, shelfTypeSelected);
        })();

        if (shelfTypeSelected === ShelfType.None) {
            delete book.shelf;
        }
        else {
            book.shelf = shelfTypeSelected;
        }

        if (searchBooks !== undefined) {
            var currentBook = books.find((item) => {
                return item.id === book.id;
            });

            if (currentBook) {
                currentBook.shelf = shelfTypeSelected;
                setBooks([...books]);
            }

            setSearchBooks([...searchBooks]);
        }
        else {
            setBooks([...books]);
        }
    };

    return (
        <div className="box-container">
            {bookshelfTitle ? <h2 className="bookshelf-title">{bookshelfTitle}</h2> : ''}
            {
                booksFilter && booksFilter.length === 0 ? 'No data found.' :
                    <ul className="book-list-container">
                        {
                            booksFilter?.map((book) => (
                                <li key={book.id}>
                                    <div className="book-image">
                                        <img src={book.imageLinks.smallThumbnail} alt="Book Cover" />
                                        <div className="book-shelf-change">
                                            {book.shelf === undefined ?
                                                (
                                                    <select value={''} onChange={(event) => bookShelfChange(book, event.target.value)} className="book-select">
                                                        <option value="" disabled>
                                                            Add to...
                                                        </option>
                                                        <option value={ShelfType.CurrentlyReading}>
                                                            Currently Reading
                                                        </option>
                                                        <option value={ShelfType.WantToRead}>Want to Read</option>
                                                        <option value={ShelfType.Read}>Read</option>
                                                    </select>
                                                )
                                                :
                                                (
                                                    <select value={book.shelf} onChange={(event) => bookShelfChange(book, event.target.value)} className="book-select">
                                                        <option value={ShelfType.None} disabled>
                                                            Move to...
                                                        </option>
                                                        <option value={ShelfType.CurrentlyReading}>
                                                            Currently Reading
                                                        </option>
                                                        <option value={ShelfType.WantToRead}>Want to Read</option>
                                                        <option value={ShelfType.Read}>Read</option>
                                                        <option value={ShelfType.None}>None</option>
                                                    </select>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-author">{book.authors?.join(', ')}</div>
                                </li>
                            ))
                        }
                    </ul>
            }
        </div>
    );
}

export default Books