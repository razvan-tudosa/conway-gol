import React from "react";

import { Controls } from "./controls.styled";

interface ControlsProps {
  handleStart: () => any;
  handleStop: () => any;
  handleReset: () => any;
  handleRandomize: () => any;
}

export const ControlsComponent: React.FC<ControlsProps> = ({
  handleStart,
  handleStop,
  handleReset,
  handleRandomize,
}) => (
  <Controls>
    <button onClick={handleStart}>Start</button>
    <button onClick={handleStop}>Stop</button>
    <button onClick={handleReset}>Reset</button>
    <button onClick={handleRandomize}>Randomize</button>
  </Controls>
);
