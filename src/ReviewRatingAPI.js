// This calculates number of review stars to generate and display them in html format

export const getStars = (avgRating) => {

    // Round to nearest half
    avgRating = Math.round(avgRating * 2) / 2;
    let output = [];

    // Append all the filled whole stars
    for (var i = avgRating; i >= 1; i--)
        output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // If there is a half a star, append it
    if (i === .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    // Fill the empty stars
    for (let i = (5 - avgRating); i >= 1; i--)
        output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

    return output.join('');

}
