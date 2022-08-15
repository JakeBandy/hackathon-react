import React, { useState } from "react";
export default function Item(props) {
  // const [list, setList] = useState("");
  // const handleClick = () => {
  //   console.log("Clicked");
  //   list(!setList);
  // };
  return (
    <li className="list">
      <h2>{props.title}</h2>
      <h3>
        <a href={props.url}>{props.url}</a>
      </h3>
      <p>
        Author: {props.author}
        <br></br>Points: {props.points}
        <br></br>Comments: {props.num_comments}
        <br></br>Created at: {props.created_at}
      </p>
      {/* <img src={props.image} alt={props.name}></img>
      <button className="button" onClick={(e) => handleClick(e)}>
        {setList ? "Show details" : "Hide Details"}
      </button>
      {!setList && <p>{props.url}</p>} */}
    </li>
  );
}