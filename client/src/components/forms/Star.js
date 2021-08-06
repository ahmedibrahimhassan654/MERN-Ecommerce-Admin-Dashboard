import React from 'react'
import StarRating from "react-star-ratings";

const Star = ({ numberOfStars, starClick }) => {
    return (
        <>
            <StarRating
                changeRating={() => { starClick(numberOfStars) }}
                numberOfStars={numberOfStars}
                starDimention='5px'
                starSpacing='0.5px'
                starHoverColer='red'
                starEmptyColor='red'
            />
            <h7> ({numberOfStars})</h7>
            <br />
        </>
    )
}

export default Star
