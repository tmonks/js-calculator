import React from "react";

export default function Button(props) {
  return (
    <div className="button" id={props.id} onClick={() => props.clickHandler(props.text)}>
      {props.text}
    </div>
  );
}
