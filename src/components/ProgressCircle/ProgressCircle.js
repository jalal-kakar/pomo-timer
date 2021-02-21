import React, { useRef, useEffect } from "react";
import "./ProgressCircle.scss";
import timerTypes from "../../dict/timerTypes";

function ProgressCircle({
  time,
  isPaused,
  currentMode,
  sessionTime,
  shortBreak,
  longBreak,
}) {
  let remainingPercentofTime = 0;
  let strokeDashoffsetCalc = 0;
  const circleRadius = 150;
  const circleCircumference = Math.PI * (circleRadius * 2);

  const circleEle = useRef(null);

  useEffect(() => {
    if (remainingPercentofTime < 1 && !isPaused) {
      if (currentMode === timerTypes.sessionTime && time >= 0) {
        remainingPercentofTime = time / sessionTime;
        strokeDashoffsetCalc =
          (1 - remainingPercentofTime) * circleCircumference;
        circleEle.current.style.strokeDashoffset = strokeDashoffsetCalc;
        circleEle.current.style.stroke = "#FA504F";
      }
      if (currentMode === timerTypes.shortBreak && time >= 0) {
        remainingPercentofTime = time / shortBreak;
        strokeDashoffsetCalc =
          (1 - remainingPercentofTime) * circleCircumference;
        circleEle.current.style.strokeDashoffset = strokeDashoffsetCalc;
        circleEle.current.style.stroke = "#09E689";
      }
      if (currentMode === timerTypes.longBreak && time >= 0) {
        remainingPercentofTime = time / longBreak;
        strokeDashoffsetCalc =
          (1 - remainingPercentofTime) * circleCircumference;
        circleEle.current.style.strokeDashoffset = strokeDashoffsetCalc;
        circleEle.current.style.stroke = "#73B9CE";
      }
    }
  }, [time, currentMode]);

  return (
    <div className="ProgressCircle__wrapper">
      <svg
        id="svg"
        width="350"
        height="350"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          id="skeleton"
          r="150"
          cx="50%"
          cy="50%"
          fill="transparent"
          strokeDasharray="942.47"
          strokeDashoffset="0"
        ></circle>

        <circle
          id="colored-meter"
          r="150"
          cx="50%"
          cy="50%"
          fill="transparent"
          strokeDasharray="942.47"
          strokeDashoffset="10"
          strokeLinecap="round"
          transform="rotate(-90 175 175)"
          ref={circleEle}
        ></circle>
      </svg>
    </div>
  );
}

export default ProgressCircle;
