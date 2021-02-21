import React from "react";
import "./BtnController.scss";

function BtnController({
  isPaused,
  pausePlayClick,
  skipForwardClick,
  skipBackwardClick,
}) {
  return (
    <div className="BtnController__wrapper">
      <button
        aria-label="Backward"
        className="Timer__btn backward"
        onClick={skipBackwardClick}
      >
        <i className="fas fa-step-backward"></i>
      </button>

      <button
        aria-label={isPaused ? "Play" : "Pause"}
        className="Timer__btn playPause"
        onClick={pausePlayClick}
      >
        {isPaused ? (
          <i className="far fa-play-circle"></i>
        ) : (
          <i className="far fa-pause-circle"></i>
        )}
      </button>

      <button
        aria-label="Forward"
        className="Timer__btn forward"
        onClick={skipForwardClick}
      >
        <i className="fas fa-step-forward"></i>
      </button>
    </div>
  );
}

export default BtnController;
