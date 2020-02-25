import React, { Component } from "react";
import PropTypes from "prop-types";

import CardComponent from "../common/Card.component";

import textConfig from "../static-content/staticText.json";
import config from "../config.json";
import history from "../history";

class MovieListingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: []
    };
    // console.log(props);
  }
  componentDidMount() {
    // console.log("Movie Listing- component");
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

    this.props.getAllMovies();
  }
  render() {
    console.log("movie listing: render");
    const movieList = this.props.movieList.map((movie, index) => {
      console.log(index, movie);
      return (
        <CardComponent
          key={movie.id}
          title={movie.name}
          imageSrc={movie.poster_path}
          imageAtlTxt={`${textConfig.posterForTxt} ${movie.name}`}
          subtitle={`${textConfig.releaseDate} ${movie.release_date}`}
          desc={movie.desc}
          lovetitle={movie.avg_rating}
          ctaTxt={textConfig.bookNow}
          ctaAction={() => {
            this.props.setSelectedMovieDetail(movie);
            history.push(`/movie/${movie.id}`);
          }}
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
MovieListingComponent.defaultProps = {
  movieList: []
};

MovieListingComponent.propTypes = {
  selectedMovieDetail: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    name: PropTypes.string,
    releaseDate: PropTypes.string,
    avg_rating: PropTypes.number,
    desc: PropTypes.string
  })
};

export default MovieListingComponent;
