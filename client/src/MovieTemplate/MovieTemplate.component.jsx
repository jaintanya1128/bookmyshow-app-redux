import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { FaFilm } from "react-icons/fa";

import BookTicket from "../BookTicket/BookTicket.container";
import ShowsList from "../ShowsList/ShowsList.container";

function MovieTemplate(props) {
  //console.log("Movie template");
  //console.log(props);
  const [selectedEventState, setSelectedEventState] = useState({});
  const { name, desc, releaseDate, avg_rating, poster_path } = {
    ...props.currentMovieDetails
  };
  return (
    <div className="container movie-shows-list">
      <div className="row">
        <div className="col-md-4">
          <img src={poster_path} alt="movie banner" />
        </div>
        <div className="col-md-8">
          <h2 className="text-dark font-weight-bold">{name}</h2>
          <h5 className="font-italic font-weight-light text-dark">{desc}</h5>
          <br />
          <h5 className="text-mute">
            <span className="text-mute"> Release Date:</span>
            <span className="text-danger">{releaseDate}</span>
          </h5>
          <h5>
            <span className="text-mute">Average Rating : </span>
            <span className="text-danger">
              <FaFilm /> {avg_rating}
            </span>
          </h5>
        </div>
        <hr className="w-100" />
      </div>
      <Switch>
        <Route
          path="/shows/:id"
          render={() => (
            <ShowsList
              selectedEventUpdater={selectedEvent =>
                setSelectedEventState(selectedEvent)
              }
            />
          )}
        />
        <Route
          path="/booking/:id"
          render={() => (
            <BookTicket selectedEventDetails={selectedEventState} />
          )}
        />
      </Switch>
    </div>
  );
}
MovieTemplate.defaultProps = {};

MovieTemplate.propTypes = {
  currentMovieDetails: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    releaseDate: PropTypes.string,
    avg_rating: PropTypes.string,
    poster_path: PropTypes.string
  })
};

export default MovieTemplate;
