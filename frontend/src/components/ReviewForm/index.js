import { useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { createReview, fetchReviews } from "../../store/review";



const AddReviewForm = ({spotId}) => {
    const dispatch = useDispatch()
    const[review, setReview] = useState('')
    const [stars, setStars] = useState(0);

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            body: JSON.stringify({ review, stars })
    })
        const data = await res.json();
        dispatch(fetchReviews(spotId))
        }

    return (
        <div>
            <h1>How was your Stay</h1>

        <form onSubmit={handleReviewSubmit}>
              <label>
                Review:
                <input type="text" value={review} onChange={(e) => setReview(e.target.value)} />
              </label>
              <label>
                Stars:
                <input type="number" min="0" max="5" value={stars} onChange={(e) => setStars(e.target.value)} />
              </label>
              <button type="submit">Submit Review</button>
            </form>
        </div>
          );

}

export default AddReviewForm
