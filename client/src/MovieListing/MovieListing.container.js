import { connect } from "react-redux";

import MovieListingComponent from "./MovieListing.component.jsx";

import { setSelectedMovieDetails } from "../MovieDetails/MovieDetails.action";
import { fetchAllMovies } from "../MovieListing/MovieListing.action";

const mapStateToProps = state => {
  return {
    selectedMovieDetail: state.selectedMovieDetail,
    movieList: state.movieList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedMovieDetail: selectedMovieDetail => {
      dispatch(setSelectedMovieDetails(selectedMovieDetail));
    },
    getAllMovies: () => {
      dispatch(fetchAllMovies());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieListingComponent);
