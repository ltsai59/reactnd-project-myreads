import React from 'react';
import BookshelfChanger from "./BookshelfChanger";
import Rating from "./Rating";
import bookHolderImage from './icons/placeholder-book-cover-default.png';

const Book = ({ book, curShelf, onMove }) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                     style={{ width: 128, height: 193,
                         backgroundImage: `url(${
                             book.imageLinks
                                 ? book.imageLinks.thumbnail
                                 : bookHolderImage
                             })`
                     }}
                ></div>

                <BookshelfChanger book={book} curShelf={curShelf} onMove={onMove}/>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Unknown Author'}</div>

            <div className="book-rating">{book.averageRating ?
                <Rating avgRating={book.averageRating} avgCount={book.ratingsCount} />: ''}
            </div>
        </div>
    </li>
)

export default Book;