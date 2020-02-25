const initialState = {};

const MovieDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_MOVIE_DETAILS":
      state = {
        ...state,
        selectedMovieDetails: action.payload
      };
      break;
    case "UPDATE_SELECTED_MOVIE_DETAILS":
      state = {
        ...state,
        selectedMovieDetails: action.payload
      };
      break;
    default:
      return state;
  }

  return state;
};

export default MovieDetailsReducer;
