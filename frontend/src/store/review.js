import { csrfFetch } from "./csrf"
const GET_REVIEWS = 'reviews/GET_REVIEWS'

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

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            const newState = {}
            action.reviews.forEach((review) => (newState[review.id] = review))
            return newState;

            default:
                return state
    }
}

export default reviewReducer
