import React, { Component } from "react";
import PropTypes from "prop-types";

import BookTicketComponent from "./BookTicket.component.jsx";

import config from "../config.json";

import history from "../history";

class BookTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxSeatBookingCount: 1,
      bookedSeats: [],
      seatLayout: [],
      showError: false
    };
    this.bookTicketClickHandler = this.bookTicketClickHandler.bind(this);
    this.singleSeatClickHandler = this.singleSeatClickHandler.bind(this);
    this.bookingSeatCountChangeHandler = this.bookingSeatCountChangeHandler.bind(
      this
    );
    console.log("BookTicket-container: constructor");
  }

  componentDidMount() {
    let seatLayouttemp = [];
    let rowName = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
    if (Object.keys(this.props.selectedEventDetails).length > 0) {
      const { selectedEventDetails } = this.props;
      for (let row = 0; row < selectedEventDetails.hall.total_rows; row++) {
        for (
          let column = 1;
          column < selectedEventDetails.hall.total_columns;
          column++
        ) {
          seatLayouttemp.push(`${rowName[row]}${column}`);
        }
        seatLayouttemp.push("");
      }

      selectedEventDetails.booked_seat.forEach(seat =>
        seatLayouttemp.forEach((teamSeat, index) => {
          if (seat === teamSeat) {
            seatLayouttemp[index] = `${teamSeat}:booked`;
          }
        })
      );

      this.setState({ seatLayout: seatLayouttemp });
    }
  }

  bookingSeatCountChangeHandler(event) {
    this.setState({
      maxSeatBookingCount: event.target.value
    });
  }

  bookTicketClickHandler() {
    //console.log(this.state.bookedSeats);
    try {
      fetch(
        `${config.apiUrl}/api/events/shows/${this.props.selectedEventDetails.show_id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ booked_seat: this.state.bookedSeats }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(response => {
          //console.log(response);
          if (response.status_code === 200) {
            history.push("/thanks");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  singleSeatClickHandler(event) {
    const seat = event.target.value;
    if (this.state.bookedSeats.length < this.state.maxSeatBookingCount) {
      event.currentTarget.classList.add("selected");

      let tempArry = this.state.seatLayout;

      tempArry[
        tempArry.map((x, i) => [i, x]).filter(x => x[1] === seat)[0][0]
      ] = `${seat}:booked`;

      this.setState({
        seatLayout: [...tempArry]
      });

      this.setState(previousState => ({
        bookedSeats: [...previousState.bookedSeats, seat]
      }));
    } else if (
      this.state.bookedSeats.length === this.state.maxSeatBookingCount
    ) {
      this.setState({
        showError: true
      });
    }
  }

  render() {
    console.log("bookTicket:render");
    let selectedEventDetailsDefaultValue = {
      show_date: "",
      show_time: "",
      booked_seat: [],
      hall: { total_rows: 0, total_columns: 0 }
    };

    let { selectedEventDetails } = this.props;
    //console.log(selectedEventDetails);

    selectedEventDetails = {
      ...selectedEventDetailsDefaultValue,
      ...selectedEventDetails,
      hall: {
        ...selectedEventDetailsDefaultValue.hall,
        ...selectedEventDetails.hall
      }
    };

    return (
      <BookTicketComponent
        showDate={selectedEventDetails.show_date}
        showTime={selectedEventDetails.show_time}
        seatLayout={this.state.seatLayout}
        bookingSeatCountChangeHandler={this.bookingSeatCountChangeHandler}
        bookTicketClickHandler={this.bookTicketClickHandler}
        singleSeatClickHandler={this.singleSeatClickHandler}
        showError={this.state.showError}
      />
    );
  }
}

BookTicket.defaultProps = {};

BookTicket.propTypes = {
  selectedEventDetails: PropTypes.shape({
    show_date: PropTypes.string,
    show_time: PropTypes.string,
    booked_seat: PropTypes.arrayOf(PropTypes.string),
    hall: PropTypes.shape({
      total_rows: PropTypes.number,
      total_columns: PropTypes.number
    })
  })
};
export default BookTicket;
