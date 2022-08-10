import React, { useEffect, useState } from "react";
import List from "./components/list";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  async function getList() {
    const response = await fetch(
      "http://hn.algolia.com/api/v1/search?tags=front_page"
    );
    console.log("response +", response);
    const data = await response.json();
    console.log("data +", data);

    setList(data.hits);
  }

  async function inputSearch() {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${input}&hitsPerPage=25`
    );
    console.log("response +", response);
    const data = await response.json();
    console.log("ALL OF DATA", data);
    const results = [];

    for (let i = 0; i < data.hits.length; i++) {
      // if the data.url contains search input or data.title or data.author
      // push it into an array
      if (data.hits[i].url !== null) {
        const url = data.hits[i].url.search(input);

        if (url !== -1) {
          console.log("urlIndex ", url);
          results.push(data.hits[i]);
        }
        console.log("RESULTS ", results);
        setList(results);
      }
    }
  }

  const handleChange = (e) => {
    console.log("Handle Change");
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("Handle Submit");
    console.log(e.target.value);
    inputSearch();
  };

  useEffect(() => {
    console.log("Mounted");
    getList();
  }, []);

  useEffect(() => {
    console.log("Updated");
    console.log(input);
  }, [input]);

  return (
    <div>
      <h2>List</h2>
      <input type="text" onChange={handleChange}></input>
      <button onClick={handleSubmit}>Submit</button>
      <ul className="list">
        {list.map((item, index) => (
          <List
            key={item.title + index}
            title={item.title}
            url={item.url}
            author={item.author}
            points={item.points}
            num_comments={item.num_comments}
            created_at={item.created_at}
          />
        ))}
      </ul>
    </div>
  );
}
export default App;
