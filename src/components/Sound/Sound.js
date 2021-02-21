import React, { useEffect } from "react";
import soundfile from "../../Assets/sounds/alert.mp3";

function Sound() {
  const audio = new Audio(soundfile);

  useEffect(() => {
    audio.play();
  }, [audio]);

  return (
    <div className="sound__wrapper">
      <audio>
        <source src={soundfile} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Sound;
