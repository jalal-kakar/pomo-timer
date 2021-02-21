import React, { useRef, useEffect, useState } from "react";
import convertSecondsToMinutes from "../../helper/convertSecondsToMinutes";
import timerTypes from "../../dict/timerTypes";
import "./Timer.scss";
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import Sound from "../Sound/Sound";
import BtnController from "../BtnController/BtnController";

function Timer({
  currentMode,
  setCurrentMode,
  checkmarkCount,
  setCheckmarkCount,
}) {
  // Variables below control the time. The time value is in seconds
  // 30 minutes = 1800 seconds
  // 25 minutes = 1500 seconds
  // 15 minutes = 900 seconds
  // 5 minutes = 300 seconds
  // 3 minutes = 180 seconds
  const sessionTime = 1500;
  const shortBreak = 300;
  const longBreak = 900;

  let [time, setTime] = useState(sessionTime);
  const [isPaused, setisPaused] = useState(true);
  let intervalRef = useRef();
  const timerWrapperEle = useRef();

  const decreaseNum = () => setTime((prev) => prev - 0.5);

  const pausePlayClick = () => {
    if (!isPaused) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseNum, 500);
    }
    setisPaused((prev) => !prev);
  };

  const skipForwardClick = () => {
    setTime(0);
  };

  const skipBackwardClick = () => {
    if (currentMode === timerTypes.sessionTime) {
      if (checkmarkCount === 0) {
        setTime(sessionTime);
        setCurrentMode(timerTypes.sessionTime);
        setCheckmarkCount(0);
      } else {
        setTime(shortBreak);
        setCurrentMode(timerTypes.shortBreak);
      }
    }
    if (currentMode === timerTypes.shortBreak && checkmarkCount >= 1) {
      setTime(sessionTime);
      setCurrentMode(timerTypes.sessionTime);
      setCheckmarkCount(checkmarkCount - 1);
    }
    if (currentMode === timerTypes.longBreak) {
      setTime(sessionTime);
      setCurrentMode(timerTypes.sessionTime);
      setCheckmarkCount(checkmarkCount - 1);
    }
  };

  const timerTap = () => {
    pausePlayClick();
    timerWrapperEle.current.classList.add("tap");
    setTimeout(() => {
      timerWrapperEle.current.classList.remove("tap");
    }, 110);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (time < 0 && currentMode === timerTypes.sessionTime) {
      setCurrentMode(timerTypes.shortBreak);
      setTime(shortBreak);
      setCheckmarkCount(checkmarkCount + 1);

      if (checkmarkCount === 4) {
        setCurrentMode(timerTypes.longBreak);
        setTime(longBreak);
      }
    }
    if (time < 0 && currentMode === timerTypes.shortBreak) {
      setCurrentMode(timerTypes.sessionTime);
      setTime(sessionTime);
    }
    if (time <= 0 && currentMode === timerTypes.longBreak) {
      pausePlayClick();
    }
  }, [time, currentMode, setCurrentMode, checkmarkCount, setCheckmarkCount]);

  return (
    <>
      <div className="Timer" ref={timerWrapperEle} onClick={timerTap}>
        <ProgressCircle
          time={time}
          isPaused={isPaused}
          currentMode={currentMode}
          sessionTime={sessionTime}
          shortBreak={shortBreak}
          longBreak={longBreak}
        ></ProgressCircle>

        <div className="Timer__wrapper">
          <p
            className={`Timer__time
            ${
              currentMode === timerTypes.sessionTime
                ? "session"
                : currentMode === timerTypes.shortBreak
                ? "shortBreak"
                : currentMode === timerTypes.longBreak
                ? "longBreak"
                : "default"
            }`}
          >
            {convertSecondsToMinutes(time)}
          </p>

          <p
            className={` Timer__mode 
              ${
                currentMode === timerTypes.sessionTime
                  ? "session"
                  : currentMode === timerTypes.shortBreak
                  ? "shortBreak"
                  : currentMode === timerTypes.longBreak
                  ? "longBreak"
                  : "default"
              }`}
          >
            {currentMode === timerTypes.sessionTime
              ? "WORK"
              : currentMode === timerTypes.shortBreak
              ? "SHORT BREAK"
              : currentMode === timerTypes.longBreak
              ? "LONG BREAK"
              : "DONE"}
          </p>
        </div>
      </div>

      {time <= 0 && currentMode === timerTypes.longBreak ? (
        <>
          <div className="overlay">
            <h2>VICTORY!</h2>
            <button onClick={refreshPage}>
              <i className="fas fa-redo"></i>
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      <BtnController
        isPaused={isPaused}
        pausePlayClick={pausePlayClick}
        skipForwardClick={skipForwardClick}
        skipBackwardClick={skipBackwardClick}
      ></BtnController>

      {time < 0 ? <Sound></Sound> : <></>}
    </>
  );
}

export default Timer;
