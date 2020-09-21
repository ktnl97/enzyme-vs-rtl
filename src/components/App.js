import React from "react";
import RangeCounter from "./RangeCounter";
import "./styles.css";

export const App = () => {
  return (
    <div className="App">
        <RangeCounter
          min={4}
          max={10}
        />
    </div>
    );
  }