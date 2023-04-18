import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'
const SET_USERS = 'session/setUsers'

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }
};

const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

const removeUser = () => {
    return {
      type: REMOVE_USER,
    };
  };

  export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  const initialState = { user: null, users: null};

  export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const loadUsers = () => async (dispatch) => {
    const response = await csrfFetch("/api/users");
    const users = await response.json();
    dispatch(setUsers(users));
  };


  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
  export const getAllUsers = () => async (dispatch) => {
    const res = await fetch('/api/users');
    const data = await res.json();

    if(res.ok){

      dispatch(setUsers(data));
    } else
    throw res
  };




  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };


  const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      case SET_USERS:
        newState = Object.assign({}, state);
        newState.users = action.payload;
        return newState;
      case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      default:
        return state;
    }
  };

  export default sessionReducer;
