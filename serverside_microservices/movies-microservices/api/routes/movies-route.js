const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie-controller");

//save a movie's detail
//router.post('/', movieController.movies_create_movie);

//update a movie
//router.patch('/:id', movieController.movies_update_movie);

//delete a movie
//router.delete('/:id', movieController.movies_delete_movie);

//get a movie detail
router.get("/:id", movieController.movies_get_movie);

//get all movies
router.get("/", movieController.movies_get_all);

//search for a movie
router.get("/query/:query", movieController.movies_search_movies);

module.exports = router;
