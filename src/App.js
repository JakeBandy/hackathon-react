import React, { useEffect, useState } from "react";
import List from "./components/list";
import "./App.css";

import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

import { Select } from "@mui/material";
import FormControl from '@mui/material/FormControl';
// import { BsSearch } from "react-icons/bs";

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
          <div className="header">
            <img src="https://hn.algolia.com/packs/media/images/logo-hn-search-a822432b.png"></img>
            <h2 className="icon-title">
              Search <br /> Hacker News
            </h2>
            <form className="search-box"> 
            <i className="SearchIcon"> 
            <SearchIcon
            fontSize="large"
            /> </i>
            <input
              className="search"
              type="text"
              id="search"
              placeholder="           Search stories by title, url or author"
              onChange={handleChange}
            ></input>
            </form>
            <span className="settings">
            <i className="gear-icon"> <SettingsIcon /> </i>
            <h4>Settings</h4>
            </span>
          </div>

        <div className="main-container">

          <span className="filter-box">
          <FormControl sx={{ m: 0, minWidth: 5 }} size="small"></FormControl>
            Search
            <Select
                className="first"
                id="demo-simple-select"
                value=""
                placeholder="All"
                onChange={handleChange}
                // autoWidth
              > </Select>
              by
              <Select
                className="second"
                id="demo-simple-select"
                value=""
                placeholder="Date"
                onChange={handleChange}
              > </Select>
              for
              <Select
                className="last"
                id="demo-simple-select"
                value=""
                placeholder="All time"
                onChange={handleChange}
              > </Select>


              </span>
              
          <div className="results">
            {filteredList.length === 0 ? (
              <ul className="list">
                {list.slice(0,30).map((item, index) => (
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
                {filteredList.slice(0,30).map((item, index) => (
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