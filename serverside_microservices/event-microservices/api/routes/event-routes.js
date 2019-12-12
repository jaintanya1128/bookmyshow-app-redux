const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event-controller");

//get all theaters
router.get("/theater/", eventController.theaters_get_all);

//get all theaters based on location
router.get(
  "/theater/bylocation/:loc",
  eventController.theaters_get_all_bylocation
);

//get all theaters based on location
router.get("/theater/bybrand/:brand", eventController.theaters_get_all_bybrand);

//save a theater's complete detail
router.post("/theater/", eventController.theaters_create_theater);

//get a theater complete detail
router.get("/theater/:id", eventController.theaters_get_theater);

//update a theater
router.patch("/theater/:id", eventController.theaters_update_theater);

//delete a theater
router.delete("/theater/:id", eventController.theaters_delete_theater);

//save a show complete detail
router.post("/shows/", eventController.shows_create_show);

//update a show
router.patch("/shows/:id", eventController.shows_update_show);

//delete a show
router.delete("/shows/:id", eventController.shows_delete_show);

//get a show complete detail
router.get("/shows/:id", eventController.shows_get_show);

//get all shows
//router.get('/shows/', eventController.shows_get_all);

//get all shows based on movie
router.get("/shows/movie/:id", eventController.shows_get_all_bymovie);

module.exports = router;
