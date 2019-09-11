import React, { Component } from 'react'
import ReactHtmlParser from "react-html-parser";
import * as ReviewRatingAPI from './ReviewRatingAPI';

class Rating extends Component {
    render() {
        const { avgRating, avgCount } = this.props;
        const stars = avgRating ? ReviewRatingAPI.getStars(avgRating) : "";
        const reactStars = ReactHtmlParser(stars);
        return (
            <div className="book-rating">
                <span className='stars'>{reactStars}</span>
                <span className="avg-rating">{avgCount} rating{(avgCount > 1?"s":"")}</span>
            </div>
        )
    }
}

export default Rating;