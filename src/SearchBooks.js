import React, { Component } from 'react';
import * as BooksAPI from "./BooksAPI";
import {Link} from "react-router-dom";
import Book from './Book';

class SearchBooks extends Component {
    state = {
        query: '',
        searchBooksResult: [],
        error: false
    };
    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        }, () => { this.searchForBooks(query)})
    }
    searchForBooks = (query) => {
        if (query.length <= 0) {
            this.setState(() => ({
                searchBooksResult: []
            }))
        } else {
            BooksAPI.search(query).then(books => {
                if (books.error) {
                    this.setState(() => ({
                        searchBooksResult: []
                    }))
                } else {
                    // update the shelf status of the search results to my books shelf status
                    // if they are also in my book shelves.
                    this.setState(() => ({
                        searchBooksResult: books.map(book => {
                            this.props.myBooks.map(myBook => {
                                if (myBook.id === book.id) {
                                    book.shelf = myBook.shelf;
                                }
                                return myBook;
                            });
                            return book;
                        })
                    }))
                }
            }).catch(err => {
                console.log(err);
                this.setState({ error: true });
            });
        }
    }

    render() {
        const { onMove } = this.props;
        const { query, searchBooksResult, error } = this.state;
        const bookCount = searchBooksResult.length;
        const searchResultMessage =
            (bookCount <= 0 ? "" : `This search returns ${bookCount} book`).concat(bookCount > 1 ? "s" : "");
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text"
                               placeholder="Search by title or author"
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}
                               autoFocus
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <h2 className="search-results-message">{searchResultMessage}</h2>
                    <ol className="books-grid">
                        {error?
                            <div>Network/Server error. Please try again later.</div>
                            :
                            searchBooksResult.map(book => (
                                <Book
                                    key={book.id}
                                    book={book}
                                    curShelf={book.shelf ? book.shelf : 'none'}
                                    onMove={onMove}
                                />
                            ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;
