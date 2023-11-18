import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import token from "./data/token.json";
// https://api.spotify.com/v1/recommendations/available-genre-seeds
const BASE_URL = "https://api.spotify.com/v1/";
const GENRE_END = "recommendations/available-genre-seeds";
const rec_End = "recommendations";
const search_End = "search";

function App() {
  const [genre, setGenre] = useState();
  const [searchItem, setSearchItem] = useState("photograph");
  // const [songId, setSongId] = useState("");
  const [choices, setChoices] = useState([]);

  function fetchData() {
    axios
      .get(`${BASE_URL}${GENRE_END}`, {
        headers: { Authorization: `Bearer  ${token.access_token}` },
      })
      .then((res) => {
        // console.log(res.data.genres);
        setGenre(res.data.genres);
      });

    axios
      .get(`${BASE_URL}${search_End}?q=${searchItem}&type=track`, {
        headers: { Authorization: `Bearer  ${token.access_token}` },
      })
      .then((res) => {
        console.log(res.data.tracks.items[0].id);

        fetchRec(res.data.tracks.items[0].id);
        // setGenre(res.data.tracks.items);
      });
  }

  function fetchRec(songNum) {
    axios
      .get(`${BASE_URL}${rec_End}?seed_tracks=${songNum}`, {
        headers: { Authorization: `Bearer  ${token.access_token}` },
      })
      .then((res) => {
        console.log(res.data.tracks);
        setChoices(res.data.tracks);
      });
  }

  useEffect(() => {
    fetchData();
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
      <ul>
        {choices.map((choice) => {
          return (
            <>
              <li>{choice.name}</li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
