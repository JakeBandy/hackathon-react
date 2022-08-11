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

  // const searchBar = ({ posts, setSearchResults }) => {
  //   const handleSubmit = (e) => e.preventDefault()

  // const handleChange = (e) => {
  //   if (!e.target.value) return setSearchResults(posts)

  //   const resultsArray = posts.filter(posts => posts.title.includes(e.target.value) || posts.body.includes(e.target.value))
  //     setSearchResults(resultsArray)
  // }

  // }

  return (
  <>
    <div className="root">
      <div className="main-container">
        <div className="header">
          <h2 className="icon-title">Search <br/> Hacker News</h2>
          <input className="search" type="text" id="search" placeholder="Search stories by title, url or author" onChange={handleChange}></input>
          <button onClick={handleSubmit}>Submit</button>
        </div>

          <h2>filter dropdown</h2>
        
          <div className="results">
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
      </div>
    </div>
  </>
        );
}
export default App;
