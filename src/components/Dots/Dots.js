import React from "react";
import "./Dots.scss";

function Dots({ checkmarkCount }) {
  return (
    <div className="dot__wrapper">
      <span
        className={`dot__item ${checkmarkCount >= 1 ? "completed" : "default"}`}
      ></span>
      <span
        className={`dot__item ${checkmarkCount >= 2 ? "completed" : "default"}`}
      ></span>
      <span
        className={`dot__item ${checkmarkCount >= 3 ? "completed" : "default"}`}
      ></span>
      <span
        className={`dot__item ${checkmarkCount >= 4 ? "completed" : "default"}`}
      ></span>
    </div>
  );
}

export default Dots;
