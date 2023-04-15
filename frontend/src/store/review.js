import { csrfFetch } from "./csrf"
const GET_REVIEWS = 'reviews/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'

export const fetchReviews = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await res.json()
    res.data = data
    if(res.ok) {
        dispatch(getReviews(data))
    } else {
        throw res
    }
}

export const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}
export const addReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const createReview = (review) => async(dispatch) => {
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
    })
    const data = await res.json()
    res.data = data
    if (res.ok) {
        dispatch(addReview(data))
    } else {
        throw res
    }
}


const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            const newState = {}
            action.reviews.forEach((review) => (newState[review.id] = review))
            return newState;

        case CREATE_REVIEW:
            const newReviewState = {...state}
            newReviewState[action.review.id] = action.review
            return newReviewState

            default:
                return state
    }
}

export default reviewReducer
