import axios from 'axios';
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  ADD_LEAVE,
  GET_LEAVE
} from './types';

// Add Post
export const addLeave = (leaveData, history) => dispatch => {
  dispatch(clearErrors());
  //console.log("leaveData",leaveData)
  axios
    .post('/api/leaves', leaveData)
    
    .then(res =>
      dispatch({
        type: ADD_LEAVE,
        payload: res.data
      },window.location = "/dashboard")
      
      
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getLeaves= userId => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/leaves/getLeaves/' + userId)
    .then(res =>
      {
        console.log(res)
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const getAllLeaves = (userType) => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/leaves/' + userType)
    .then(res =>
      {
        console.log(res)
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      }
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const approveLeave = id => dispatch => {
  axios
    .put(`/api/posts/approve/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const disapproveLeave = id => dispatch => {
  axios
    .put(`/api/posts/disapprove/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Post
export const getLeave = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/leaves/getOne/${id}`)
    .then(res =>
      {
        console.log( "get Leave method" ,res.data)
        dispatch({
          type: GET_POST,
          payload: res.data,
        })

      }      
      
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );

    
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
