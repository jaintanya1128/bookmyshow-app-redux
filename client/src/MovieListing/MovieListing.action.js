import config from "../config.json";

//Redux thunk will handle this
export function fetchAllMovies() {
  return dispatch => {
    fetch(`${config.apiUrl}/api/movies`)
      .then(
        response => response.json(),
        error => console.error("An error occurred.", error) //catch is not used as will result in causing a loop of 'Unexpected batch number' errors
      )
      .then(result => {
        //console.log(result.data);
        //this.setState({ movieList: result.data.details.movies });
        dispatch({
          type: "SET_MOVIE_LIST",
          payload: result.data.details.movies
        });
      });
  };
}
