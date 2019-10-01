import React, { useState } from "react";
import "./App.scss";
import Button from "./Button";
import ReactFCCTest from "react-fcctest";
// import { statement } from "@babel/template";

function App() {
  const [expression, setExpression] = useState([]);
  const [currentTerm, setCurrentTerm] = useState("0");
  const [numberMode, setNumberMode] = useState(true);
  const [history, setHistory] = useState([]);

  const handleClick = input => {
    if (input === "AC") {
      setExpression([]);
      setCurrentTerm("0");
      setHistory([]);
      setNumberMode(true);
      return;
    }

    if (input === "=") {
      const solution = solve([...expression, currentTerm]);
      setHistory([expression.join(" ") + " " + currentTerm + " = " + solution]);
      setCurrentTerm(solution);
      setExpression([]);
      return;
    }
    // equation was just solved and input is entered, we'll replace the current currentTerm
    // if (numberMode == "solved" && /^-?[0-9.]*$/.test(input)) {
    //   console.log("Switching from solved to number and blanking currentTerm");
    //   setCurrentTerm("");
    //   setNumberMode("number");
    // }

    if (numberMode) {
      // NUMBER MODE
      if (/[+\-×÷]/.test(input)) {
        // switching from number to operator mode
        // remove any trailing decimal
        let cleanedTerm = currentTerm;
        if (currentTerm.charAt(currentTerm.length - 1) === ".") {
          cleanedTerm = currentTerm.slice(0, currentTerm.length - 1);
        }
        setExpression([...expression, cleanedTerm]);
        setCurrentTerm(input);
        setNumberMode(false);
      } else if (/[0-9]/.test(input)) {
        // number input - append it
        if (currentTerm === "0") {
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
      if (/[+\-×÷]/.test(input)) {
        // operator input, append it to currentTerm
        setCurrentTerm(currentTerm + input);
      } else {
        // number input, switching from operator to number mode
        const operators = currentTerm.split("");
        if (currentTerm.length > 1) {
          if (operators[operators.length - 1] === "-") {
            // if the last operator is '-', move it to the input as a negative sign
            input = operators.pop() + input;
          }
        }
        // commit the last (non '-') operator to the expression
        setExpression([...expression, operators[operators.length - 1]]);
        setNumberMode(true);
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

  /*
  const currentlyInputtingNumber = () => {
    const isNumber = /^[0-9.]*$/.test(currentTerm);
    return isNumber;
  };

  const handleClickOrig = input => {
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
        if (!currentlyInputtingNumber()) {
          setExpression([...expression, currentTerm]);
          setCurrentTerm("0.");
        } else if (!/\./.test(currentTerm)) {
          setCurrentTerm(currentTerm + ".");
        }
        break;
      case "-":
        if (
          currentlyInputtingNumber() ||
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
        if (currentlyInputtingNumber()) {
          setExpression([...expression, currentTerm]);
        }
        setCurrentTerm(input);
        break;
      default:
        // currentTermting a number
        if (currentTerm === "0") {
          setCurrentTerm(input);
        } else if (!currentlyInputtingNumber()) {
          setExpression([...expression, currentTerm]);
          setCurrentTerm(input);
        } else {
          setCurrentTerm(currentTerm + input);
        }
    }
  };
  */

  const solve = statementToSolve => {
    // base case
    const stmt = [...statementToSolve];
    if (stmt.length === 1) {
      return parseFloat(stmt[0]);
    }

    const num = parseFloat(stmt.pop());
    const op = stmt.pop();

    switch (op) {
      case "+":
        return solve(stmt) + num;
      case "-":
        return solve(stmt) - num;
      case "×":
        stmt[stmt.length - 1] = parseFloat(stmt[stmt.length - 1]) * num;
        return solve(stmt);
      case "÷":
        stmt[stmt.length - 1] = parseFloat(stmt[stmt.length - 1]) / num;
        return solve(stmt);
      default:
        return 0;
    }
  };

  return (
    <div className="app-container">
      <ReactFCCTest />
      <div className="calculator">
        <div id="display-container">
          <div id="history">{history[0]}</div>
          <div id="display">{expression.join(" ") + " " + currentTerm}</div>
          <div id="live-calc">
            {expression.length > 1
              ? numberMode
                ? solve([...expression, currentTerm])
                : solve(expression)
              : ""}
          </div>
        </div>
        <Button id="clear" text="AC" clickHandler={handleClick} />
        <Button id="divide" text="÷" clickHandler={handleClick} />
        <Button id="multiply" text="×" clickHandler={handleClick} />
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
