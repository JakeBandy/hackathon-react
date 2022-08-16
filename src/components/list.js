import React, { useState } from "react";
export default function Item(props) {
  // const [list, setList] = useState("");
  // const handleClick = () => {
  //   console.log("Clicked");
  //   list(!setList);
  // };
  return (
    <li className="list">
      <div className="result-head">
      <h2 className="title">{props.title}</h2>
      <h3 className="res-url"><a href={props.url}>{props.url}</a></h3>
      </div>
      <div className="result-sub">
        <p>Author: {props.author}</p>
        <p>|</p>
        <p>Points: {props.points}</p>
        <p>|</p>
        <p>Comments: {props.num_comments}</p>
        <p>|</p>
        <p>Created at: {props.created_at}</p>
      </div>
      {/* <img src={props.image} alt={props.name}></img>
      <button className="button" onClick={(e) => handleClick(e)}>
        {setList ? "Show details" : "Hide Details"}
      </button>
      {!setList && <p>{props.url}</p>} */}
    </li>
  );
}