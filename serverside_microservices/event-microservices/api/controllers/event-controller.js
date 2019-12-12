const mongoose = require("../../database/dbconnection");
const theaterModel = require("../../database/models/theater-model");
const showsModel = require("../../database/models/shows-model");
const config = require("../../config.json");
const axios = require("axios");

//save a theater's complete detail
exports.theaters_create_theater = (req, res, next) => {
  const theater = new theaterModel({
    _id: new mongoose.Types.ObjectId(),
    brand: req.body.brand,
    name: req.body.name,
    location: req.body.location.toLowerCase(),
    address: req.body.address,
    halls: req.body.halls.map(h => {
      return {
        _id: new mongoose.Types.ObjectId(),
        hall_name: h.name,
        total_rows: h.total_rows,
        total_columns: h.total_columns,
        screen_size: h.screen_size
      };
    }),
    totalhallcount: req.body.halls.length
  });
  theater
    .save()
    .then(result => {
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "saved a theater's detail",
        details: {
          description: "details of added theater",
          brand: result.brand,
          name: result.name,
          location: result.location,
          address: result.address,
          contains_halls: result.halls,
          totalhallcount: result.totalhallcount,
          request: {
            description: "get the details of a theater",
            type: "GET",
            url: `http://${config.domainName}:${process.env.PORT}/api/theaters/${result._id}`
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

//update a theater
exports.theaters_update_theater = (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    if (ops.propName !== "location") {
      updateOps[ops.propName] = ops.value;
    } else {
      updateOps[ops.propName] = ops.value.toLowerCase();
    }
  }

  theaterModel
    .update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      if (result.nModified === 0) {
        res.status(500).json({
          status_code: 500,
          status_type: "error",
          message:
            "theater details could not be updated due to some server error, please try again later"
        });
      }
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "Theater details updated successfully",
        request: {
          description: "get the details of the theater",
          type: "GET",
          url: `http://${config.domainName}:${process.env.PORT}/api/theaters/${id}`
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

//delete a theater
exports.theaters_delete_theater = (req, res, next) => {
  const id = req.params.id;

  theaterModel
    .deleteOne({ _id: id })
    .exec()
    .then(result => {
      if (result.deletedCount === 0) {
        res.status(500).json({
          status_code: 500,
          status_type: "error",
          message:
            "theater not deleted due to some server error, please try again later"
        });
      }

      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "theater deleted successfully",
        request: {
          description: "to add a new theater",
          type: "POST",
          url: `http://${config.domainName}:${process.env.PORT}/api/theaters/`,
          body: {
            brand: "String",
            name: "String",
            location: "String",
            address: "String",
            contains_halls: "Array of String",
            totalhallcount: "Number"
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

//get a theater complete detail
exports.theaters_get_theater = (req, res, next) => {
  const id = req.params.id;

  theaterModel
    .findById(id)
    .select("brand name location address halls totalhallcount")
    .exec()
    .then(result => {
      if (!result) {
        res.status(404).json({
          status_code: 404,
          status_type: "error",
          message: "No valid entry found for provided ID"
        });
      }
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "the details of a theater",
        details: {
          brand: result.brand,
          name: result.name,
          location: result.location,
          address: result.address,
          hall: result.halls,
          total_halls_count: result.totalhallcount
        },
        request: {
          description: "get all the theaters list",
          type: "GET",
          url: `http://${config.domainName}:${process.env.PORT}/api/theaters/`
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

//get all theaters
exports.theaters_get_all = (req, res, next) => {
  theaterModel
    .find()
    .select("brand name location address halls totalhallcount")
    .exec()
    .then(result => {
      const data = {
        status_code: 200,
        status_type: "success",
        message: "complete list of theaters",
        details: {
          count: result.length,
          theaters: result.map(r => {
            return {
              brand: r.brand,
              name: r.name,
              address: r.address,
              location: r.location,
              hall: r.halls,
              total_halls_count: r.totalhallcount,
              request: {
                description: "get theater's detail",
                type: "GET",
                url: `http://${config.domainName}:${process.env.PORT}/api/theaters/${r._id}`
              }
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

//get all theaters based on location
exports.theaters_get_all_bylocation = (req, res, next) => {
  theaterModel
    .find({
      location: { $regex: req.params.loc, $options: "i" }
    })
    .select("brand name location address halls totalhallcount")
    .exec()
    .then(result => {
      const data = {
        status_code: 200,
        status_type: "success",
        message: `list of theaters in ${req.params.loc}`,
        details: {
          count: result.length,
          theaters: result.map(r => {
            return {
              brand: r.brand,
              name: r.name,
              address: r.address,
              location: r.location,
              halls: r.halls,
              total_halls_count: r.totalhallcount,
              request: {
                description: "get theater's detail",
                type: "GET",
                url: `http://${config.domainName}:${process.env.PORT}/api/theaters/${r._id}`
              }
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

//get all theaters based on brand
exports.theaters_get_all_bybrand = (req, res, next) => {
  theaterModel
    .find({
      brand: { $regex: req.params.brand, $options: "i" }
    })
    .select("brand name location address halls totalhallcount")
    .exec()
    .then(result => {
      const data = {
        status_code: 200,
        status_type: "success",
        message: `list of ${req.params.brand} theaters`,
        details: {
          count: result.length,
          theaters: result.map(r => {
            return {
              brand: r.brand,
              name: r.name,
              address: r.address,
              location: r.location,
              halls: r.halls,
              total_halls_count: r.totalhallcount,
              request: {
                description: "get theater's detail",
                type: "GET",
                url: `http://${config.domainName}:${process.env.PORT}/api/theaters/${r._id}`
              }
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

//save a show complete detail
exports.shows_create_show = (req, res, next) => {
  const show = new showsModel({
    _id: new mongoose.Types.ObjectId(),
    movie_id: req.body.movie_id,
    theater: req.body.theater,
    hall: req.body.hall,
    show_date_time: req.body.show_date_time,
    status: req.body.status,
    booked_seat: req.body.booked_seat
  });

  show
    .save()
    .then(result => {
      //console.log(result);
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "saved show details"
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

//update booked seat of a show
exports.shows_update_show = (req, res, next) => {
  const id = req.params.id;

  showsModel
    .findOneAndUpdate(
      { _id: id },
      { $push: { booked_seat: req.body.booked_seat } }
    )
    .exec()
    .then(result => {
      console.log(result);
      if (result.nModified === 0) {
        res.status(500).json({
          status_code: 500,
          status_type: "error",
          message:
            "details could not be updated due to some server error, please try again later"
        });
      }
      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "Details updated successfully"
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

//delete a show
exports.shows_delete_show = (req, res, next) => {
  const id = req.params.id;

  showsModel
    .deleteOne({ _id: id })
    .exec()
    .then(result => {
      if (result.deletedCount === 0) {
        res.status(500).json({
          status_code: 500,
          status_type: "error",
          message:
            "Not deleted due to some server error, please try again later"
        });
      }

      res.status(200).json({
        status_code: 200,
        status_type: "success",
        message: "Deleted successfully"
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

//get a show complete detail
exports.shows_get_show = (req, res, next) => {
  const id = req.params.id;

  showsModel
    .findById(id)
    .populate("theater")
    .exec()
    .then(result => {
      //console.log(`shows result: ${result}`);

      if (!result) {
        res.status(404).json({
          status_code: 404,
          status_type: "error",
          message: "No valid entry found for provided ID"
        });
      }

      result.actualHall = result.theater.halls.filter(h =>
        result.hall.equals(h._id)
      );
      let total_seat_count =
        result.actualHall[0].total_rows * result.actualHall[0].total_columns;

      total_seat_count = total_seat_count > 0 ? total_seat_count : 0;

      axios({
        method: "get",
        url: `http://${config.domainName}:${config.gatewayPort}/api/movies/${result.movie_id}`
      })
        .then(response => {
          //console.log("movie result");

          //console.log(response.data.details);
          result.movie = response.data.details ? response.data.details : {};
          //console.log(result);
        })
        .catch(error => {
          console.log(`error: ${error.message}`);
        });

      setTimeout(function() {
        res.status(200).json({
          status_code: 200,
          status_type: "success",
          message: "the show details are",
          details: {
            theater: result.theater.name,
            theater_address: result.theater.address,
            hall: result.actualHall[0],
            total_seat_count: total_seat_count,
            booked_seat: result.booked_seat,
            show_date_time: new Date(
              result.show_date_time
            ).toLocaleDateString(),
            status: result.status,
            movie: result.movie.name,
            movie_desc: result.movie.desc,
            movie_type: result.movie.category,
            movie_rating: result.movie.avg_rating,
            movie_release_date: result.movie.release_date,
            movie_poster_path: result.movie.poster_path
          }
        });
      }, 1500);
    })
    .catch(err => {
      res.status(err.response.status).json({
        status_code: err.response.status,
        status_type: "error",
        message: err.message
      });
    });
};

//get all shows based on movie
exports.shows_get_all_bymovie = (req, res, next) => {
  const id = req.params.id;

  showsModel
    // .aggregate(
    //   [
    //     { $match: { movie_id: id } },
    //     {
    //       $group: { _id: "$theater", movie_id: "$movie_id" }
    //     },
    //     {
    //       $project: {
    //         movie_id: 1,
    //         booked_seat: 1,
    //         theater: 1,
    //         hall: 1,
    //         show_date_time: 1,
    //         status: 1
    //       }
    //     }
    //   ],
    //   function(err, result) {
    //     if (err) {
    //       res.status(500).json({
    //         status_code: 500,
    //         status_type: "error",
    //         message: err.message
    //       });
    //     } else {
    //       console.log(result);
    //       res.json(result);
    //     }
    //   }
    // );
    .find({ movie_id: id })
    .populate("theater")
    .exec()
    .then(results => {
      console.log(results.length);
      const resultList = results.map(result => {
        result.actualHall = result.theater.halls.filter(h =>
          result.hall.equals(h._id)
        );
        let total_seat_count =
          result.actualHall[0].total_rows * result.actualHall[0].total_columns;

        total_seat_count = total_seat_count > 0 ? total_seat_count : 0;

        return {
          show_id: result._id,
          theater: result.theater.name,
          theater_address: result.theater.address,
          hall: result.actualHall[0],
          total_seat_count: total_seat_count,
          booked_seat: result.booked_seat,
          show_date: new Date(result.show_date_time).toLocaleDateString(),
          show_time: new Date(result.show_date_time).toLocaleTimeString(),
          status: result.status
        };
      });

      res.status(200).json(resultList);
    })
    .catch(err => {
      res.status(err.response.status).json({
        status_code: err.response.status,
        status_type: "error",
        message: err.message
      });
    });
};
