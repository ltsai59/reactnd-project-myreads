import React from 'react';
import Bookcase from './Bookcase';
import {Link} from "react-router-dom";

const BookList = ({ myBooks, onMove }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>

        <Bookcase myBooks={myBooks} onMove={onMove} />
        <div className="open-search">
            <Link to="search">
                <button>Add a Book</button>
            </Link>
        </div>
    </div>
)

export default BookList;

