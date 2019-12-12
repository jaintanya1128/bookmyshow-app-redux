import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieListingComponent from "./MovieListing.component.jsx";
import config from "../config.json";

class MovieListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: []
    };
  }
  componentDidMount() {
    document.addEventListener("searched", e => {
      fetch(`${config.apiUrl}/api/movies/query/${e.detail}`)
        .then(response => response.json())
        .then(result => {
          //console.log(result.data);
          this.setState({ movieList: result.data.details.movies });
        })
        .catch(err => {
          console.log(err.message);
        });
    });

    fetch(`${config.apiUrl}/api/movies`)
      .then(response => response.json())
      .then(result => {
        //console.log(result.data);
        this.setState({ movieList: result.data.details.movies });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    const movieList = this.state.movieList.map(movie => {
      return (
        <MovieListingComponent
          key={movie.id}
          id={movie.id}
          name={movie.name}
          lang={movie.lang}
          poster_path={movie.poster_path}
          releaseDate={movie.release_date}
          desc={movie.desc}
          avg_rating={movie.avg_rating}
          onClick={this.props.onClick}
        />
      );
    });

    return (
      <div className="container">
        <div className="card-group">{movieList}</div>
      </div>
    );
  }
}

MovieListing.defaultProps = {};

MovieListing.propTypes = {
  onClick: PropTypes.func
};

export default MovieListing;
