const morgan = require("morgan");
const eventRoutes = require("./api/routes/event-routes");

module.exports = function(app) {
  //HTTP request logger middleware
  app.use(morgan("dev"));

  // Routes which should handle requests
  app.use("/", eventRoutes);

  //all other routes that can not be handelled by above routes
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
};
