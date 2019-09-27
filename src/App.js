import React, { useState } from "react";
import "./App.scss";
import Button from "./Button";
import ReactFCCTest from "react-fcctest";

function App() {
  const [statement, setStatement] = useState([]);
  const [input, setInput] = useState(0);

  const inputtingNumber = () => {
    const isNumber = /^[0-9.]*$/.test(input);
    return isNumber;
  };

  const handleClick = text => {
    switch (text) {
      case "=":
        setStatement([]);
        setInput(solve([...statement, input]));
        break;
      case "AC":
        setStatement([]);
        setInput("0");
        break;
      case ".":
        if (!inputtingNumber()) {
          setStatement([...statement, input]);
          setInput("0.");
        } else if (!/\./.test(input)) {
          setInput(input + ".");
        }
        break;
      case "+":
      case "-":
      case "x":
      case "/":
        if (inputtingNumber()) {
          setStatement([...statement, input]);
        }
        setInput(text);
        break;
      default:
        // inputting a number
        if (input === "0") {
          setInput(text);
        } else if (!inputtingNumber()) {
          setStatement([...statement, input]);
          setInput(text);
        } else {
          setInput(input + text);
        }
    }
  };

  const solve = stmt => {
    if (stmt.length == 1) {
      return parseFloat(stmt[0]);
    }

    const num = parseFloat(stmt.shift());
    const op = stmt.shift();

    switch (op) {
      case "+":
        // console.log(`${num} + solve(${stmt})`);
        return num + solve(stmt);
      case "-":
        // console.log(`${num} - solve(${stmt})`);
        return num - solve(stmt);
      case "x":
        stmt[0] = num * parseFloat(stmt[0]);
        return solve(stmt);
        // console.log(`solve(${stmt})`);
        break;
      case "/":
        stmt[0] = num / parseFloat(stmt[0]);
        return solve(stmt);
      // console.log(`solve(${stmt})`);
    }
  };

  return (
    <div className="app-container">
      <ReactFCCTest />
      <div className="calculator">
        <div id="display">{statement.join(" ") + " " + input}</div>
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
