import React, { useState } from "react";
import "./App.scss";
import Button from "./Button";
import Display from "./Display";
// import ReactFCCTest from "react-fcctest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [expression, setExpression] = useState([]);
  const [currentTerm, setCurrentTerm] = useState("0");
  const [numberMode, setNumberMode] = useState(true);
  const [history, setHistory] = useState("");
  const [justSolved, setJustSolved] = useState(true);

  const clickClear = () => {
    setExpression([]);
    setCurrentTerm("0");
    setHistory("");
    setNumberMode(true);
  };

  const clickEquals = () => {
    const solution = solveRounded([...expression, currentTerm]).toString();
    setHistory(expression.join(" ") + " " + currentTerm + " = " + solution);
    setCurrentTerm(solution);
    setExpression([]);
    setJustSolved(true);
  };

  const clickNumber = input => {
    if (numberMode) {
      if (justSolved || currentTerm === "0") {
        // if we just solved an expression, we want numbers to overwrite the solution
        setCurrentTerm(input === "." ? "0." : input);
        setJustSolved(false);
      } else if (!(/\./.test(input) && /\./.test(currentTerm))) {
        // as long as we aren't inputting a 2nd decimal, append the input to the currentTerm
        setCurrentTerm(currentTerm + input);
      }
    } else {
      // OPERATOR MODE - number input, so switch from operator to number mode
      const operators = currentTerm.split("");
      if (currentTerm.length > 1 && operators[operators.length - 1] === "-") {
        // if multiple operators were input and the last operator is '-', move it to the input as a negative sign
        input = operators.pop() + input;
      }
      // commit the last (non '-') operator to the expression
      setExpression([...expression, operators[operators.length - 1]]);
      setNumberMode(true);
      // put input as the currentTerm, prefixing with a '0' if a decimal was input
      setCurrentTerm(input === "." ? "0." : input);
    }
  };

  const clickOperator = input => {
    if (justSolved) {
      // if an operator is input right after solving, we'll continue working on it and keep the solution as the first term in the expression
      setJustSolved(false);
    }
    if (numberMode) {
      // switching from number to operator mode
      // remove any trailing decimal
      if (currentTerm.charAt(currentTerm.length - 1) === ".") {
        setExpression([...expression, currentTerm.slice(0, currentTerm.length - 1)]);
      } else {
        setExpression([...expression, currentTerm]);
      }
      setCurrentTerm(input);
      setNumberMode(false);
    } else {
      // OPERATOR MODE - append input to currentTerm
      setCurrentTerm(currentTerm + input);
    }
  };

  const solveRounded = statement => {
    const places = 10;
    const factor = Math.pow(10, places);
    return Math.round(solve(statement) * factor) / factor;
  };

  // takes an array of at least 3 terms, consisting of operators between numbers
  const solve = statement => {
    // base case
    const stmt = [...statement];
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

  const clickBackspace = () => {
    if (currentTerm.length === 1) {
      if (expression.length === 0) {
        setExpression([]);
        setCurrentTerm("0");
      } else {
        setCurrentTerm(expression[expression.length - 1]);
        setExpression(expression.slice(0, expression.length - 1));
        setNumberMode(!numberMode);
      }
    } else {
      setCurrentTerm(currentTerm.slice(0, currentTerm.length - 1));
    }
  };

  return (
    <div className="app-container">
      {/* <ReactFCCTest /> */}
      <div className="calculator">
        <Display
          history={history}
          expression={expression.join(" ") + " " + currentTerm}
          answer={
            expression.length > 1
              ? numberMode
                ? solveRounded([...expression, currentTerm])
                : solveRounded(expression)
              : ""
          }
        />
        <Button id="clear" text="AC" clickHandler={clickClear} />
        <Button id="divide" text="÷" clickHandler={clickOperator} />
        <Button
          id="backspace"
          text={<FontAwesomeIcon icon={faBackspace} />}
          clickHandler={clickBackspace}
        />
        <Button id="seven" text="7" clickHandler={clickNumber} />
        <Button id="eight" text="8" clickHandler={clickNumber} />
        <Button id="nine" text="9" clickHandler={clickNumber} />
        <Button id="multiply" text="×" clickHandler={clickOperator} />
        <Button id="four" text="4" clickHandler={clickNumber} />
        <Button id="five" text="5" clickHandler={clickNumber} />
        <Button id="six" text="6" clickHandler={clickNumber} />
        <Button id="subtract" text="-" clickHandler={clickOperator} />
        <Button id="one" text="1" clickHandler={clickNumber} />
        <Button id="two" text="2" clickHandler={clickNumber} />
        <Button id="three" text="3" clickHandler={clickNumber} />
        <Button id="add" text="+" clickHandler={clickOperator} />
        <Button id="zero" text="0" clickHandler={clickNumber} />
        <Button id="decimal" text="." clickHandler={clickNumber} />
        <Button id="equals" text="=" clickHandler={clickEquals} />
      </div>
    </div>
  );
}

export default App;
