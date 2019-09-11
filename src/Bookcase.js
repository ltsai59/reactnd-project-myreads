import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { moveOptions } from './constants';

class Bookcase extends Component {
    render() {
        const { myBooks, onMove } = this.props;
        // Do not display 'none' shelf value
        const myBookshelves = moveOptions.slice(0,3);
        return (
            <div className="list-books-content">
                <div>
                    {myBookshelves.map(shelf => (
                        <Bookshelf
                            key={shelf.value}
                            curShelf={shelf}
                            myBooks={myBooks}
                            onMove={onMove}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Bookcase;