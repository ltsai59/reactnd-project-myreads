import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {
    render() {
        const { curShelf, myBooks, onMove } = this.props;
        const booksOnShelf = myBooks.filter(book => book.shelf === curShelf.value);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{curShelf.label}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksOnShelf.map(book => (
                            <Book
                                key={book.id}
                                book={book}
                                curShelf={curShelf.value}
                                onMove={onMove}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;