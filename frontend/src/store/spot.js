import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spot/GET_SPOTS'
const GET_SPOTID = 'spot/GET_SPOTID'
const CREATE_SPOT = 'spot/CREATE_SPOT';


export const createSpot = (spotData) => async (dispatch) => {

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    })
    const data = await res.json()
    if(res.ok) {
        dispatch(createNewSpot(data))
    } else {throw res}
};


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
export const fetchSpotById = (id) => async(dispatch) => {
    const res = await fetch(`/api/spots/${id}`);
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(getSpotById(data))
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

export const getSpotById = (spot) => {
    return  {

            type: GET_SPOTID,
            spot
        };

    }
export const createNewSpot = (spot) => {
            return {
                type: CREATE_SPOT,
                spot
            }
        }

const initialState = {}



const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const newState = {}
            action.spots.forEach((spot) => (newState[spot.id] = spot));
            return newState;
        case GET_SPOTID:
            return {
                ...state,
                [action.spot.id]: action.spot
            };
        case CREATE_SPOT:
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        default:
            return state

    }

}

export default spotReducer;
