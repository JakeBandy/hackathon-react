import React, { useEffect, useState } from "react";
import List from "./components/list";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  async function getList() {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=&hitsPerPage=100`
    );
    console.log("response +", response);
    const data = await response.json();
    console.log("data +", data);

    setList(data.hits);
  }

  async function inputSearch() {
    const data = list;
    const results = [];

    for (let i = 0; i < data.length; i++) {
      console.log("DATA LOWER ", data[i])
      if (data[i].url === null) {
        console.log("FIRST ", data[i].url);
        data[i].url = "";
        console.log("SECOND ", data[i].url);
      }
      if (data[i].title === null) {
        console.log("FIRST ", data[i].title);
        data[i].title = "";
        console.log("SECOND ", data[i].title);
      }
      if (data[i].author === null) {
        console.log("FIRST ", data[i].author);
        data[i].author = "";
        console.log("SECOND ", data[i].author);
      }
      // // if the data.url contains search input or data.title or data.author
      // // push it into an array
      const url = data[i].url.toLowerCase().includes(input);
      const title = data[i].title.toLowerCase().includes(input);
      const author = data[i].author.toLowerCase().includes(input);

      if (url || title || author) {
        
        results.push(data[i]);
      }
      console.log("RESULTS ", results);
      setFilteredList(results);
    
    }
  }

  const handleChange = (e) => {
    console.log("Handle Change");
    console.log(e.target.value);
    setInput(e.target.value.toLowerCase());
  };

  useEffect(() => {
    console.log("Mounted");
    getList();
  }, []);

  useEffect(() => {
    console.log("Updated");
    console.log(input);
    inputSearch();
  }, [input]);

  return (
    <>
      <div className="root">
        <div className="main-container">
          <div className="header">
            <h2 className="icon-title">
              Search <br /> Hacker News
            </h2>
            <form className="search-box">
            <input
              className="search"
              type="text"
              id="search"
              placeholder="Search stories by title, url or author"
              onChange={handleChange}
            ></input>
            </form>
          </div>

          {/* <h2>filter dropdown</h2> */}

          <div className="results">
            {filteredList.length === 0 ? (
              <ul className="list">
                {list.slice(0,20).map((item, index) => (
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
            ) : (
              <ul className="list">
                {filteredList.slice(0,20).map((item, index) => (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default App;