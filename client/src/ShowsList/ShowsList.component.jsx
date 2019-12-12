import React from "react";
import PropTypes from "prop-types";
import { FaHeart } from "react-icons/fa";
import history from "../history";

function ShowsList(props) {
  const { eventsList, selectedEventUpdater, movieId } = { ...props };
  return (
    <div className="container movie-shows-list">
      {eventsList.length > 0 &&
        eventsList.map((event, index) => {
          return (
            <div className="row" key={index}>
              <FaHeart className="text-danger mt-1" />
              <div className="col-md-4">
                <h4>{event.theater}</h4>
                <h6>{event.theater_address}</h6>
              </div>
              <div className="col-md-7">
                <button
                  type="button"
                  className="btn btn-info btn-pill mb-3"
                  onClick={() => {
                    selectedEventUpdater(event);
                    history.push(`/booking/${movieId}`);
                  }}
                >
                  {event.show_date} - {event.show_time}
                </button>
              </div>
              <hr className="w-100" />
            </div>
          );
        })}
    </div>
  );
}

ShowsList.defaultProps = {
  eventsList: [],
  movieId: 0
};

ShowsList.propTypes = {
  eventsList: PropTypes.arrayOf(PropTypes.object),
  selectedEventUpdater: PropTypes.func,
  movieId: PropTypes.number
};

export default ShowsList;
