import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import token from "./data/token.json";

const BASE_URL = "https://api.spotify.com/v1/";
// const GENRE_END = "recommendations/available-genre-seeds";
const rec_End = "recommendations";
const search_End = "search";

function App() {
  // const [genre, setGenre] = useState();
  const [searchItem, setSearchItem] = useState("photograph");
  const [choices, setChoices] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchData();
  }, [formSubmitted]);

  function fetchData() {
    //below pulls list of potential genres
    // axios
    //   .get(`${BASE_URL}${GENRE_END}`, {
    //     headers: { Authorization: `Bearer  ${token.access_token}` },
    //   })
    //   .then((res) => {
    //     setGenre(res.data.genres);
    //   });

    axios
      .get(`${BASE_URL}${search_End}?q=${searchItem}&type=track`, {
        headers: { Authorization: `Bearer  ${token.access_token}` },
      })
      .then((res) => {
        fetchRec(res.data.tracks.items[0].id);
      });
  }

  function fetchRec(songID) {
    axios
      .get(`${BASE_URL}${rec_End}?seed_tracks=${songID}`, {
        headers: { Authorization: `Bearer  ${token.access_token}` },
      })
      .then((res) => {
        console.log(res.data.tracks);
        setChoices(res.data.tracks);
      });
  }

  function formHandler(event) {
    event.preventDefault();
    console.log(searchItem);
    setFormSubmitted(!formSubmitted);
    console.log(formSubmitted);
  }

  const handleSearchBar = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <div className="App">
      <header className="nav">
        <h1 className="nav__title">SongFinder</h1>
      </header>

      <div className="main">
        <p>Find similar songs to your favourite song</p>
        <form className="main__form" onSubmit={formHandler}>
          <div className="main__searchbar">
            <input
              className="main__search-input"
              type="text"
              placeholder="Search"
              onChange={handleSearchBar}
            />
          </div>
          <button className="main__button" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="choices">
        <ol className="choices__list">
          {choices.map((choice, i) => {
            if (i < 10) {
              return (
                <>
                  <li key={choice.id} className="choices__item">
                    <p id={choice.id} className="choices__song">
                      <b>Song:</b> {choice.name},
                    </p>
                    <p id={choice.artists[0].id} className="choices__artist">
                      <b>Artist:</b> {choice.artists[0].name}
                    </p>
                  </li>
                </>
              );
            }
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;
