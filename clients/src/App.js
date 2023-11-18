import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  function fetchData() {
    axios.get();
    console.log("hello world");
  }
  return (
    <div className="App">
      <navbar className="nav">
        <h1>SongFinder</h1>
        <p>Find similar songs to your favourite song</p>
        <div className="nav__searchbar">
          <input
            className="nav__search-input"
            type="text"
            placeholder="Search"
          />
        </div>
        <button className="nav__button">Submit</button>
      </navbar>
    </div>
  );
}

export default App;
