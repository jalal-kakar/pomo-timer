import "./App.scss";

import React, { useState } from "react";
import timerTypes from "../src/dict/timerTypes";
import Timer from "../src/components/Timer/Timer";
import Dots from "./components/Dots/Dots";

function App() {
  const [currentMode, setCurrentMode] = useState(timerTypes.sessionTime);
  const [checkmarkCount, setCheckmarkCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header"></header>

      <Timer
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        checkmarkCount={checkmarkCount}
        setCheckmarkCount={setCheckmarkCount}
      ></Timer>

      <Dots checkmarkCount={checkmarkCount}></Dots>
    </div>
  );
}

export default App;
