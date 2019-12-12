const movieModel = require("../../database/models/movie-model");
const mongoose = require("../../database/dbconnection");
const config = require("../../config.json");
const axios = require("axios");

//save 1 movie complete detail
exports.movies_create_movie = (req, res, next) => {
  const movie = new movieModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    desc: req.body.desc,
    category: req.body.category,
    lang: req.body.lang,
    duration: req.body.duration,
    avg_rating: req.body.avg_rating,
    voting_count: req.body.voting_count,
    release_date: req.body.release_date,
    cast: req.body.cast,
    status: req.body.status,
    poster_path: req.body.poster_path
  });

  movie
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "saved movie's detail",
        details: {
          description: "details of added movie",
          name: result.name,
          desc: result.desc,
          category: result.category,
          lang: result.lang,
          duration: result.duration,
          avg_rating: result.avg_rating,
          voting_count: result.voting_count,
          release_date: result.release_date,
          cast: result.cast,
          poster_path: result.poster_path,
          request: {
            description: "get the details of movie",
            type: "GET",
            url: `http://${config.domainName}:${process.env.PORT}/api/movies/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      res.status(err.response.status).json({
        status_code: err.response.status,
        status_type: "error",
        message: err.message
      });
    });
};

//update a movie
exports.movies_update_movie = (req, res, next) => {
  res.status(200).json({
    message: "movies_create_movie"
  });
};

//delete a movie
exports.movies_delete_movie = (req, res, next) => {
  res.status(200).json({
    message: "movies_create_movie"
  });
};

//get a movie detail
exports.movies_get_movie = (req, res, next) => {
  const id = req.params.id;

  axios({
    method: "get",
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${config.api_key}`
  })
    .then(result => {
      result = result.data;
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "details of movie",
        details: {
          id: result.id,
          name: result.title,
          tagline: result.tagline,
          desc: result.overview,
          lang: result.original_language,
          category: result.genres.map(c => c.name),
          avg_rating: result.vote_average,
          voting_count: result.vote_count,
          release_date: result.release_date,
          runtime: result.runtime,
          revenue: result.revenue,
          production_companies: result.production_companies,
          poster_path: `https://image.tmdb.org/t/p/w370_and_h556_face/${result.poster_path}`
        }
      });
    })
    .catch(err => {
      console.log(err.response.status);
      res.status(err.response.status).json({
        status_code: err.response.status,
        status_type: "error",
        message: err.message
      });
    });
};

//get all movies
exports.movies_get_all = (req, res, next) => {
  axios({
    method: "get",
    url: `https://api.themoviedb.org/3/list/1?api_key=${config.api_key}`
  })
    .then(response => {
      const results = response.data;
      const data = {
        status_code: 200,
        status_type: "success",
        message: "complete list of movies",
        details: {
          count: results.items.length,
          movies: results.items.map(r => {
            return {
              id: r.id,
              name: r.title,
              desc: r.overview,
              lang: r.original_language,
              avg_rating: r.vote_average,
              voting_count: r.vote_count,
              release_date: r.release_date,
              poster_path: `https://image.tmdb.org/t/p/w500_and_h282_face/${r.poster_path}`
            };
          })
        }
      };
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(err.response.status).json({
        status_code: err.response.status,
        status_type: "error",
        message: err.message
      });
    });
};

//search for a movie based on any keyword
exports.movies_search_movies = (req, res, next) => {
  console.log(req.params.query);

  axios({
    method: "get",
    url: `https://api.themoviedb.org/3/search/movie?api_key=${config.api_key}&language=en-US&include_adult=false&query=${req.params.query}`
  })
    .then(response => {
      const results = response.data.results;

      //console.log(results);
      const data = {
        status_code: 200,
        status_type: "success",
        message: "list of movies",
        details: {
          count: results.length,
          movies: results.map(r => {
            return {
              id: r.id,
              name: r.title,
              desc: r.overview,
              lang: r.original_language,
              avg_rating: r.vote_average,
              voting_count: r.vote_count,
              release_date: r.release_date,
              poster_path: `https://image.tmdb.org/t/p/w500_and_h282_face/${r.poster_path}`
            };
          })
        }
      };
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(err.response.status).json({
        status_code: err.response.status,
        status_type: "error",
        message: err.message
      });
    });
};
