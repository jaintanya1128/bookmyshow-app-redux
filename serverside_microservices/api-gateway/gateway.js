"use strict";

const express = require("express");
const httpProxy = require("express-http-proxy");
const request = require("request-promise-native");
const xml = require("xml");

const app = express();
const port = process.env.PORT || 5000;

// Dummmy service discovery
const bookingServiceUrl = "http://localhost:5001";
const moviesServiceUrl = "http://localhost:5002";
const eventsServiceUrl = "http://localhost:5003";

const eventProxy = httpProxy(eventsServiceUrl);
const moviesProxy = httpProxy(moviesServiceUrl);
const bookingsProxy = httpProxy(bookingServiceUrl);

// Shared general logic: Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  console.log(`Authentication: ${req.path}`);
  next();
});

// Aggregate services after authentication
app.get("/", async (req, res) => {
  const services = await Promise.all([
    request({ uri: eventsServiceUrl, json: true }),
    request({ uri: moviesServiceUrl, json: true }),
    request({ uri: bookingServiceUrl, json: true })
  ]);

  const response = { services };

  // Serialization format transformation: XML or JSON
  if (req.get("Content-Type") === "application/xml") {
    const xmlResponse = xml(response);
    res.set("content-type", "text/xml");
    res.end(xmlResponse);
  } else {
    res.json(response);
  }
});

// Proxy request after authentication
app.use("/api/events/", (req, res, next) => {
  console.log("redirected to event service");
  eventProxy(req, res, next);
});

app.use("/api/movies/", (req, res, next) => {
  console.log("redirected to movies service");
  moviesProxy(req, res, next);
});

app.use("/api/booking/", (req, res, next) => {
  console.log("redirected to booking service");
  bookingsProxy(req, res, next);
});

app.listen(port, () => {
  console.info(`API Gateway is listening on port ${port}!`);
});
