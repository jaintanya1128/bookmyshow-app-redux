import React, { Component } from "react";
import PropTypes from "prop-types";
import config from "../config.json";
import history from "../history";

import MovieDetailsComponent from "./MovieDetails.component.jsx";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: props.currentMovieDetails
    };
    this.bookTicketClickHandler = this.bookTicketClickHandler.bind(this);
    this.timeConvert = this.timeConvert.bind(this);
  }
  componentDidMount() {
    //console.log("movie details: componentDidMount");
    let urlArray = window.location.pathname.split("/");

    const movieId = urlArray[urlArray.length - 1];
    console.log(movieId);

    fetch(`${config.apiUrl}/api/movies/${movieId}`)
      .then(response => response.json())
      .then(result => {
        console.log("movie api result:", result);
        if (result.details) {
          this.setState({ movieDetails: result.details });
        } else {
          console.log(
            "some error occurred to procress your request, Please try again"
          );
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  timeConvert(time) {
    const hours = time / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    return `${rhours} hour(s) and ${rminutes} minute(s).`;
  }

  bookTicketClickHandler() {
    history.push(`/shows/${this.state.movieDetails.id}`);
  }
  render() {
    //console.log("movie details: render");

    return (
      <MovieDetailsComponent
        id={this.state.movieDetails.id}
        name={this.state.movieDetails.name}
        tagline={this.state.movieDetails.tagline}
        lang={this.state.movieDetails.lang}
        poster_path={this.state.movieDetails.poster_path}
        releaseDate={this.state.movieDetails.release_date}
        desc={this.state.movieDetails.desc}
        avgRating={this.state.movieDetails.avg_rating}
        votingCount={this.state.movieDetails.voting_count}
        category={this.state.movieDetails.category}
        runtime={this.timeConvert(this.state.movieDetails.runtime)}
        revenue={this.state.movieDetails.revenue}
        productionComp={this.state.movieDetails.production_companies}
        onClick={this.bookTicketClickHandler}
      />
    );
  }
}
MovieDetails.defaultProps = {};

MovieDetails.propTypes = {
  currentMovieDetails: PropTypes.shape({
    id: PropTypes.number,
    avg_rating: PropTypes.number,
    desc: PropTypes.string,
    lang: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    poster_path: PropTypes.string,
    releaseDate: PropTypes.string
  })
};

export default MovieDetails;
