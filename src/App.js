import React, { useState } from "react";
import "./App.scss";
import Button from "./Button";
import ReactFCCTest from "react-fcctest";

function App() {
  const [display, setDisplay] = useState("0");

  const handleClick = text => {
    switch (text) {
      case "AC":
        setDisplay("0");
        break;
      default:
        setDisplay(display + text);
    }
  };

  return (
    <div className="app-container">
      <ReactFCCTest />
      <div className="calculator">
        <div id="display">{display}</div>
        <Button id="clear" text="AC" clickHandler={handleClick} />
        <Button id="divide" text="/" clickHandler={handleClick} />
        <Button id="multiply" text="x" clickHandler={handleClick} />
        <Button id="seven" text="7" clickHandler={handleClick} />
        <Button id="eight" text="8" clickHandler={handleClick} />
        <Button id="nine" text="9" clickHandler={handleClick} />
        <Button id="subtract" text="-" clickHandler={handleClick} />
        <Button id="four" text="4" clickHandler={handleClick} />
        <Button id="five" text="5" clickHandler={handleClick} />
        <Button id="six" text="6" clickHandler={handleClick} />
        <Button id="add" text="+" clickHandler={handleClick} />
        <Button id="one" text="1" clickHandler={handleClick} />
        <Button id="two" text="2" clickHandler={handleClick} />
        <Button id="three" text="3" clickHandler={handleClick} />
        <Button id="equals" text="=" clickHandler={handleClick} />
        <Button id="zero" text="0" clickHandler={handleClick} />
        <Button id="decimal" text="." clickHandler={handleClick} />
      </div>
    </div>
  );
}

export default App;
