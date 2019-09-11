import React, { Component }  from 'react';
import { moveOptions } from './constants';

class BookshelfChanger extends Component {
    state = {
        value: this.props.curShelf
    };
    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            value
        }, () => {
            this.props.onMove(this.props.book, value);
        })
    };
    render() {
        const { book } = this.props;
        const { value } = this.state;
        return (
            <div className="book-shelf-changer">
                <select
                    value={value}
                    onChange={this.handleChange}>
                    <option key={book.id.concat("_move")} value="move" disabled>
                        Move to...
                    </option>
                    {moveOptions.map(moveOption => (
                        <option key={book.id.concat("_", moveOption.value)} value={moveOption.value}>{moveOption.label}</option>
                    ))}
                </select>
            </div>
        );
    }
}

export default BookshelfChanger;