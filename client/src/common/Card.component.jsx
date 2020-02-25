import React, { Component } from "react";

import { FaHeart } from "react-icons/fa";

class Card extends Component {
  render() {
    const {
      key,
      imageSrc,
      imageAtlTxt,
      title,
      subtitle,
      lovetitle,
      desc,
      ctaTxt,
      ctaAction
    } = { ...this.props };

    return (
      <div key={key} className="card" onClick={ctaAction}>
        <img className="card-img-top" src={imageSrc} alt={imageAtlTxt} />
        <div className="card-body">
          <div className="card-title">{title}</div>
          <div className="mb-2 text-muted card-subtitle">{subtitle}</div>
          <div className="mb-2 text-danger card-subtitle">
            <FaHeart /> {lovetitle}
          </div>
          <div className="card-text">{desc}</div>
          <button className="btn btn-primary">{ctaTxt}</button>
        </div>
      </div>
    );
  }
}

export default Card;
