import React from "react";

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

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={MovieListing} />
            <Route path="/movie/:id" component={MovieDetails} />
            <Route path="/shows/:id" component={MovieTemplate} />
            <Route path="/booking/:id" component={MovieTemplate} />
            <Route path="/checkout" component={Cart} />
            <Route path="/thanks" component={Thanks} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
