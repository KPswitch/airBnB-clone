import { useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { createReview, fetchReviews } from "../../store/review";




const AddReviewForm = ({spotId, closeModal}) => {
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
        closeModal()
        }
        const isSubmitDisabled = review.length < 10 || stars === 0;
    return (
        <div>
            <h1>How was your Stay</h1>

        <form onSubmit={handleReviewSubmit}>
              <label>
                Review:
                <textarea value={review} onChange={(e) => setReview(e.target.value)} />
              </label>
              <label>
                <input type="number" min="0" max="5" value={stars} onChange={(e) => setStars(e.target.value)} />
                Stars
              </label>
              <button type="submit" disabled={isSubmitDisabled}>Submit Review</button>
            </form>
        </div>
          );

}

export default AddReviewForm
