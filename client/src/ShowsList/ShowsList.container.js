import React, { Component } from "react";
import PropTypes from "prop-types";
import config from "../config.json";
import ShowsListComponent from "./ShowsList.component.jsx";

class ShowsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
      movieID: 0
    };
    //console.log("ShowsList-container: constructor");
    //console.log(props);
  }
  componentDidMount() {
    let urlArray = window.location.pathname.split("/");

    const movieId = parseInt(urlArray[urlArray.length - 1]);
    console.log("ShowsList-container: componentDidMount");
    //console.log("movie id", movieId);
    this.setState({ movieID: movieId });

    fetch(`${config.apiUrl}/api/events/shows/movie/${movieId}`)
      .then(response => response.json())
      .then(result => {
        //console.log("result:", result);
        this.setState({ eventsList: result });
      });
  }
  render() {
    return (
      <ShowsListComponent
        eventsList={this.state.eventsList}
        selectedEventUpdater={this.props.selectedEventUpdater}
        movieId={this.state.movieID}
      />
    );
  }
}

ShowsList.defaultProps = {};

ShowsList.propTypes = {
  selectedEventUpdater: PropTypes.func
};

export default ShowsList;
