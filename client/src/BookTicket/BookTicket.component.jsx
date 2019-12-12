import React from "react";
import PropTypes from "prop-types";

import textConfig from "../static-content/labelText.json";
import messages from "../static-content/errorMessage.json";

function BookTicket(props) {
  console.log(props);
  let {
    showDate,
    showTime,
    seatLayout,
    showError,
    bookTicketClickHandler,
    singleSeatClickHandler,
    bookingSeatCountChangeHandler
  } = { ...props };
  return (
    <div className="container">
      <div className="row">
        <form className="select-seat-form col-md-4">
          <div className="form-group" id="no-of-seats">
            <div className="form-label d-inline">{textConfig.noOfSeats}</div>
            <select
              className="form-control"
              onChange={bookingSeatCountChangeHandler}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </form>

        <div className="col-md-4 text-mute">
          <div className="row">
            <div className="col-12">
              <span className="text-mute">{textConfig.showDate} </span>
              <span className="text-danger">{showDate}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <span className="text-mute">{textConfig.showTime} </span>
              <span className="text-danger">{showTime}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-success btn-book-ticket"
            onClick={bookTicketClickHandler}
          >
            {textConfig.bookTicket}
          </button>
        </div>
      </div>
      <div className="row">
        <p
          className="error"
          style={{ display: showError === false ? "none" : "block" }}
        >
          {messages.exceedSelectSeatCount}
        </p>
      </div>
      <div className="seat-layout-wrap">
        {seatLayout.map((seat, index) => {
          if (seat !== "") {
            return (
              <button
                key={index}
                className="single-seat"
                onClick={singleSeatClickHandler}
                disabled={seat.includes(":booked") ? true : false}
                value={
                  seat.includes(":booked") ? seat.replace(":booked", "") : seat
                }
              >
                {seat.includes(":booked") ? seat.replace(":booked", "") : seat}
              </button>
            );
          } else {
            return <br key={index} />;
          }
        })}

        <div className="screen">
          <span className="text-mute text-small">{textConfig.screenSide}</span>
        </div>
      </div>
    </div>
  );
}
BookTicket.defaultProps = {
  showDate: "",
  showTime: "",
  seatLayout: [],
  showError: false
};

BookTicket.propTypes = {
  showDate: PropTypes.string,
  showTime: PropTypes.string,
  showError: PropTypes.bool,
  seatLayout: PropTypes.arrayOf(PropTypes.string),
  bookTicketClickHandler: PropTypes.func,
  bookingSeatCountChangeHandler: PropTypes.func,
  singleSeatClickHandler: PropTypes.func
};

export default BookTicket;
