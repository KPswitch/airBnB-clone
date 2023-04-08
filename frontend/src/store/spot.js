//import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spot/GET_SPOTS'

export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    const data = await res.json();
    res.data = data;
    if (res.ok) {
        dispatch(getSpots(data))
    } else {
        throw res;
    }

}

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

const initialState = {}



const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const newState = {}
            action.spots.forEach((spot) => (newState[spot.id] = spot));
            return newState
        default:
            return state

    }

}

export default spotReducer;
