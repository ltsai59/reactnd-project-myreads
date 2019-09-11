import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import SearchBooks from './SearchBooks'

// npm install --save react-html-parser

class BooksApp extends React.Component {
    state = {
        myBooks: [],
        error: false
    };
    componentDidMount() {
        BooksAPI.getAll()
            .then(myBooks => {
                this.setState(() => ({
                    myBooks
                }))
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true });
            });
    }
    moveBook = (book, shelf) => {
        // update db
        BooksAPI.update(book, shelf).catch(err => {
            console.log(err);
            this.setState({ error: true });
        });
        if (shelf !== 'none') {
            book.shelf = shelf;
            this.setState(prevState => ({
                myBooks: prevState.myBooks.filter(myBook => myBook.id !== book.id).concat(book)
            }))
        } else {
            this.setState(prevState => ({
                myBooks: prevState.myBooks.filter(myBook => myBook.id !== book.id)
            }))
        }
    };
    render() {
        const { myBooks, error } = this.state;
        if (error) {
            return <div>Unknown server/network error. Please try again later.</div>;
        }
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookList
                        myBooks={myBooks}
                        onMove={this.moveBook}
                    />
                )}/>
                <Route path="/search" render={() => (
                    <SearchBooks
                        myBooks={myBooks}
                        onMove={this.moveBook}
                    />
                )} />
            </div>
        );
    }
}

export default BooksApp
