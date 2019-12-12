import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";

import "./App.scss";

import Header from "./common/Header.component.jsx";
import Footer from "./common/Footer.component.jsx";
import Thanks from "./ThankYou/ThankYou.component.jsx";

import MovieListing from "./MovieListing/MovieListing.container";
import MovieDetails from "./MovieDetails/MovieDetails.container";

import Cart from "./Checkout/Checkout.container";
import history from "./history";
import MovieTemplate from "./MovieTemplate/MovieTemplate.component.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovieDetail: {}
    };
  }
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <MovieListing
                    onClick={selectedMovie => {
                      //console.log("state set in App.js");
                      this.setState({ selectedMovieDetail: selectedMovie });
                      //console.log(selectedMovie);
                    }}
                  />
                )}
              />
              <Route
                path="/movie/:id"
                render={() => {
                  //console.log("navigating to movie details from App.js");
                  //console.log(this.state.selectedMovieDetail);
                  return (
                    <MovieDetails
                      currentMovieDetails={this.state.selectedMovieDetail}
                    />
                  );
                }}
              />
              <Route
                path="/shows/:id"
                render={() => (
                  <MovieTemplate
                    currentMovieDetails={this.state.selectedMovieDetail}
                  />
                )}
              />
              <Route
                path="/booking/:id"
                render={() => (
                  <MovieTemplate
                    currentMovieDetails={this.state.selectedMovieDetail}
                  />
                )}
              />
              <Route path="/checkout" component={Cart} />
              <Route path="/thanks" component={Thanks} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
