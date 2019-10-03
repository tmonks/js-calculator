import React from "react";
import "./Display.scss";

export default function Display(props) {
  return (
    <div id="display-container">
      <div id="history">{props.history}</div>
      <div id="display">{props.expression}</div>
      <div id="live-calc">{props.answer} </div>
    </div>
  );
}
