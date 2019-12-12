import React from "react";
import PropTypes from "prop-types";
import history from "../history";
import textConfig from "../static-content/labelText.json";

import { FaHeart } from "react-icons/fa";

function MovieListingComponent(props) {
  // console.log("Movie Llisting");
  // console.log(props);

  const selectedMovieDetail = { ...props };
  const { id, poster_path, name, releaseDate, avg_rating, desc } = { ...props };

  return (
    <div
      className="card"
      onClick={() => {
        console.log("Movie Listing: movie clicked");
        console.log(selectedMovieDetail);
        props.onClick(selectedMovieDetail);
        history.push(`/movie/${id}`);
      }}
    >
      <img className="card-img-top" src={poster_path} />
      <div className="card-body">
        <div className="card-title">{name}</div>
        <div className="mb-2 text-muted card-subtitle">
          {textConfig.releaseDate} {releaseDate}
        </div>
        <div className="mb-2 text-danger card-subtitle">
          <FaHeart /> {avg_rating}
        </div>
        <div className="card-text">{desc}</div>
        <button className="btn btn-primary">{textConfig.bookNow}</button>
      </div>
    </div>
  );
}

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
