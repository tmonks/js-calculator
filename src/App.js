import React, { useState } from "react";
import "./App.scss";
import Button from "./Button";
import Display from "./Display";
import ReactFCCTest from "react-fcctest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
// import { statement } from "@babel/template";

function App() {
  const [expression, setExpression] = useState([]);
  const [currentTerm, setCurrentTerm] = useState("0");
  const [numberMode, setNumberMode] = useState(true);
  const [history, setHistory] = useState([]);

  const clickClear = () => {
    setExpression([]);
    setCurrentTerm("0");
    setHistory([]);
    setNumberMode(true);
  };

  const clickEquals = () => {
    const solution = solve([...expression, currentTerm]).toString();
    setHistory([expression.join(" ") + " " + currentTerm + " = " + solution]);
    setCurrentTerm(solution);
    setExpression([]);
  };

  const clickNumber = input => {
    if (numberMode) {
      // NUMBER MODE
      if (/\./.test(input)) {
        if (!/\./.test(currentTerm)) {
          // decimal input AND currentTerm doesn't already contain a decimal
          setCurrentTerm(currentTerm + input);
        }
      } else {
        // number input - append it
        if (currentTerm === "0") {
          // replace 0 with the current input
          setCurrentTerm(input);
        } else {
          setCurrentTerm(currentTerm + input);
        }
      }
    } else {
      // OPERATOR MODE
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
  };

  const clickOperator = input => {
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
      <ReactFCCTest />
      <div className="calculator">
        <Display
          history={history}
          expression={expression.join(" ") + " " + currentTerm}
          answer={
            expression.length > 1
              ? numberMode
                ? solve([...expression, currentTerm])
                : solve(expression)
              : ""
          }
        />
        {/* <div id="display-container">
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
            */}
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
