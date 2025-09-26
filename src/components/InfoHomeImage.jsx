import React from "react";
import { Link } from "react-router-dom";

function InfoHomeImage() {
  return (
    <Link to="/info">
      <img
        src="../images/infoHome.png"
        alt="infoHome"
        className="absolute top-0 right-0"
      />
    </Link>
  );
}

export default InfoHomeImage;
