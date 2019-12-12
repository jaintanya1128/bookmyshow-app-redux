import React from "react";
import PropType from "prop-types";
import textConfig from "../static-content/labelText.json";

import { FaHeart, FaClock } from "react-icons/fa";

function MovieDetails(props) {
  let {
    category,
    productionComp,
    poster_path,
    name,
    tagline,
    releaseDate,
    lang,
    revenue,
    avgRating,
    runtime,
    votingCount,
    onClick,
    desc
  } = { ...props };

  let categoryList = [];
  let productionCompList = [];
  if (category) {
    categoryList = (
      <div className="btn-pill-list">
        {category.map((cat, index) => {
          return (
            <button key={index} type="button" className="btn btn-info btn-pill">
              {cat}
            </button>
          );
        })}
      </div>
    );
  }

  if (productionComp) {
    productionCompList = (
      <div className="btn-pill-list">
        {productionComp.map((company, index) => {
          return (
            <button key={index} type="button" className="btn btn-info btn-pill">
              {company.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="container movie-details-wrap">
      <div className="row">
        <div className="col-md-4">
          <img src={poster_path} alt="movie banner" />
        </div>
        <div className="col-md-8">
          <h2 className="text-dark font-weight-bold">{name}</h2>
          <h5 className="font-italic font-weight-light text-dark">{tagline}</h5>
          <br />
          <h5 className="text-mute">
            {textConfig.releaseDate} {releaseDate}
          </h5>
          <h5 className="text-mute">
            {textConfig.language}{" "}
            {lang === textConfig.langEngCode
              ? textConfig.langEngText
              : textConfig.langEmptyDisplayText}
          </h5>
          <h6 className="text-mute">
            {textConfig.revenue} {textConfig.currencyCodeDolar}
            {revenue}
          </h6>
          <hr />
          {categoryList}
          <br />
          <hr />
          <div>
            <span className="text-mute">{textConfig.duration} </span>
            <span className="text-danger">
              <FaClock /> {runtime}
            </span>
          </div>
          <div>
            <span className="text-mute">{textConfig.avgRating} </span>
            <span className="text-danger">
              <FaHeart /> {avgRating}
            </span>
          </div>
          <div>
            <span className="text-mute">{textConfig.totalCount} </span>
            <span className="text-danger">{votingCount}</span>
          </div>
          <hr />
          <button type="button" className="btn btn-success" onClick={onClick}>
            {textConfig.bookTicket}
          </button>
        </div>
      </div>
      <div className="row">
        <hr className="w-100" />
        <div className="col-12">
          <h3> {textConfig.summary}</h3>
          <p>{desc}</p>
        </div>
        <hr className="w-100" />
        <div className="col-12">
          <h3>{textConfig.productionComp}</h3>
          <br />
          {productionCompList}
          <br />
        </div>
        <br />
        <hr className="w-100" />
      </div>
    </div>
  );
}

MovieDetails.defaultProps = {
  id: 0,
  name: "",
  tagline: "",
  lang: "",
  poster_path: "",
  avgRating: 0,
  releaseDate: "",
  desc: "",
  votingCount: 0,
  category: [],
  runtime: "",
  revenue: 0,
  productionComp: [],
  onClick: ""
};

MovieDetails.propTypes = {
  id: PropType.number,
  name: PropType.string,
  tagline: PropType.string,
  lang: PropType.string,
  poster_path: PropType.string,
  avgRating: PropType.number,
  releaseDate: PropType.string,
  desc: PropType.string,
  votingCount: PropType.number,
  category: PropType.arrayOf(PropType.string),
  runtime: PropType.string,
  revenue: PropType.number,
  productionComp: PropType.arrayOf(PropType.object),
  onClick: PropType.func
};

export default MovieDetails;
