import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import token from "./data/token.json"
// https://api.spotify.com/v1/recommendations/available-genre-seeds
const BASE_URL = "https://api.spotify.com/v1/"
const GENRE_END = 'recommendations/available-genre-seeds'



function App() {
  const [genre, setGenre] = useState();
console.log("token.access_token: ", token.access_token)
  function fetchData() {
    axios.get(`${BASE_URL}${GENRE_END}`, { headers: { Authorization: `Bearer  ${token.access_token}` } })
      .then((res) => {
        console.log(res)
        setGenre(res.data)
      });
    console.log("hello world");
  }


  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="App">
      <header className="nav">
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
      </header>
      <p>Hello Thar!</p>
    </div>
  );
}

export default App;
