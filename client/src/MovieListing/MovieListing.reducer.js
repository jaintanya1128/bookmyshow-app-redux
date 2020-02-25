const initialState = {};

const MovieListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MOVIE_LIST":
      state = {
        ...state,
        movieList: action.payload
      };
      break;
    default:
      return state;
  }

  return state;
};

export default MovieListingReducer;
