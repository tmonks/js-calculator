import React, { useState } from "react";
import "./App.scss";
import Button from "./Button";
import ReactFCCTest from "react-fcctest";

function App() {
  const [expression, setExpression] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(0);
  const [currentMode, setCurrentMode] = useState("number");

  const currentTermtingNumber = () => {
    const isNumber = /^[0-9.]*$/.test(currentTerm);
    return isNumber;
  };

  // move currentTerm to the expression, and toggle the currentMode between "number" and "operator"
  const commitInput = () => {
    setExpression([...expression, currentTerm]);
    if (currentMode == "number") {
      setCurrentMode("operator");
    } else {
      setCurrentMode("number");
    }
  };

  const handleClick2 = input => {
    let newTerm = currentTerm;

    if (input === "AC") {
      setExpression([]);
      setCurrentTerm("0");
      setCurrentMode("number");
      return;
    }

    if (input === "=") {
      setExpression([]);
      setCurrentTerm(solve([...expression, currentTerm]));
      return;
    }
    // equation was just solved and input is entered, we'll replace the current currentTerm
    // if (currentMode == "solved" && /^-?[0-9.]*$/.test(input)) {
    //   console.log("Switching from solved to number and blanking currentTerm");
    //   setCurrentTerm("");
    //   setCurrentMode("number");
    // }

    if (currentMode === "number") {
      // NUMBER MODE
      if (/[+\-x/]/.test(input)) {
        // switching from number to operator mode
        // TODO: remove any trailing decimal
        setExpression([...expression, currentTerm]);
        setCurrentTerm(input);
        setCurrentMode("operator");
      } else if (/[0-9]/.test(input)) {
        // number input - append it
        if (currentTerm == "0") {
          // replace 0 with the current input
          setCurrentTerm(input);
        } else {
          setCurrentTerm(currentTerm + input);
        }
      } else if (!/\./.test(currentTerm)) {
        // input decimal AND currentTerm doesn't already contain a decimal
        setCurrentTerm(currentTerm + input);
      }
    } else {
      // OPERATOR MODE
      if (/[+\-x/]/.test(input)) {
        // operator input, append it to currentTerm
        setCurrentTerm(currentTerm + input);
      } else {
        // number input, switching from operator to number mode
        const operators = currentTerm.split("");
        if (currentTerm.length > 1) {
          if (operators[operators.length - 1] == "-") {
            // if the last operator is '-', move it to the input as a negative sign
            input = operators.pop() + input;
          }
        }
        // commit the last (non '-') operator to the expression
        setExpression([...expression, operators[operators.length - 1]]);
        setCurrentMode("number");
        setCurrentTerm(input);

        if (input === ".") {
          // if a decimal input as the first character, preface it with a '0'
          setCurrentTerm("0.");
        } else {
          setCurrentTerm(input);
        }
      }
    }
  };

  const handleClick = input => {
    switch (input) {
      case "=":
        setExpression([]);
        setCurrentTerm(solve([...expression, currentTerm]));
        break;
      case "AC":
        setExpression([]);
        setCurrentTerm("0");
        break;
      case ".":
        if (!currentTermtingNumber()) {
          setExpression([...expression, currentTerm]);
          setCurrentTerm("0.");
        } else if (!/\./.test(currentTerm)) {
          setCurrentTerm(currentTerm + ".");
        }
        break;
      case "-":
        if (
          currentTermtingNumber() ||
          currentTerm === "+" ||
          currentTerm === "*" ||
          currentTerm === "/"
        ) {
          setExpression([...expression, currentTerm]);
        }
        setCurrentTerm(input);
        break;
      case "+":
      case "x":
      case "/":
        if (currentTermtingNumber()) {
          setExpression([...expression, currentTerm]);
        }
        setCurrentTerm(input);
        break;
      default:
        // currentTermting a number
        if (currentTerm === "0") {
          setCurrentTerm(input);
        } else if (!currentTermtingNumber()) {
          setExpression([...expression, currentTerm]);
          setCurrentTerm(input);
        } else {
          setCurrentTerm(currentTerm + input);
        }
    }
  };

  const solve = stmt => {
    // base case
    if (stmt.length == 1) {
      return parseFloat(stmt[0]);
    }

    const num = parseFloat(stmt.pop());
    const op = stmt.pop();

    switch (op) {
      case "+":
        return solve(stmt) + num;
      case "-":
        return solve(stmt) - num;
      case "x":
        stmt[stmt.length - 1] = parseFloat(stmt[stmt.length - 1]) * num;
        return solve(stmt);
      case "/":
        stmt[stmt.length - 1] = parseFloat(stmt[stmt.length - 1]) / num;
        return solve(stmt);
    }
  };

  return (
    <div className="app-container">
      <ReactFCCTest />
      <div className="calculator">
        <div id="display">{expression.join(" ") + " " + currentTerm}</div>
        <Button id="clear" text="AC" clickHandler={handleClick2} />
        <Button id="divide" text="/" clickHandler={handleClick2} />
        <Button id="multiply" text="x" clickHandler={handleClick2} />
        <Button id="seven" text="7" clickHandler={handleClick2} />
        <Button id="eight" text="8" clickHandler={handleClick2} />
        <Button id="nine" text="9" clickHandler={handleClick2} />
        <Button id="subtract" text="-" clickHandler={handleClick2} />
        <Button id="four" text="4" clickHandler={handleClick2} />
        <Button id="five" text="5" clickHandler={handleClick2} />
        <Button id="six" text="6" clickHandler={handleClick2} />
        <Button id="add" text="+" clickHandler={handleClick2} />
        <Button id="one" text="1" clickHandler={handleClick2} />
        <Button id="two" text="2" clickHandler={handleClick2} />
        <Button id="three" text="3" clickHandler={handleClick2} />
        <Button id="equals" text="=" clickHandler={handleClick2} />
        <Button id="zero" text="0" clickHandler={handleClick2} />
        <Button id="decimal" text="." clickHandler={handleClick2} />
      </div>
    </div>
  );
}

export default App;
