import "./styles/App.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import token from "./data/token.json";
import access from "./data/access.json";
import qs from "qs";
import SongFound from "./components/SongFound/SongFound";
import SongQuery from "./components/SongQuery/SongQuery";

const BASE_URL = "https://api.spotify.com/v1/";
// const GENRE_END = "recommendations/available-genre-seeds";
const rec_End = "recommendations";
const search_End = "search";

function App() {
  // const [genre, setGenre] = useState();
  const [searchItem, setSearchItem] = useState("photograph");
  const [choices, setChoices] = useState([]);
  const [queryList, setQueryList] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [songsSubmitted, setSongsSubmitted] = useState(false);
  const [completeToken, setCompleteToken] = useState("");

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    fetchData();
  }, [formSubmitted]);

  useEffect(() => {
    fetchRec();
  }, [songsSubmitted]);

  // fetches new bearer token
  const login = async () => {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: access.client_id,
        password: access.client_secret,
      },
    };
    const data = {
      grant_type: "client_credentials",
    };

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(data),
        headers
      );
      // console.log(response.data.access_token);
      setCompleteToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.log(error);
    }
  };

  function fetchData() {
    //below pulls list of potential genres
    // axios
    //   .get(`${BASE_URL}${GENRE_END}`, {
    //     headers: { Authorization: `Bearer  ${token.access_token}` },
    //   })
    //   .then((res) => {
    //     setGenre(res.data.genres);
    //   });
    if (completeToken) {
      axios
        .get(`${BASE_URL}${search_End}?q=${searchItem}&type=track`, {
          headers: { Authorization: `Bearer  ${completeToken}` },
        })
        .then((res) => {
          // fetchRec(res.data.tracks.items[0].id);
          if (queryList.length < 5) {
            setQueryList([...queryList, res.data.tracks.items[0]]);
          } else {
            alert("You can only select 5 songs, refresh the page");
          }
        });
    }
  }

  function songIdString() {
    const songQueryList = queryList.map((song) => {
      return song.id;
    });
    return songQueryList.join(",");
  }

  function fetchRec() {
    const songQueryItem = songIdString();
    console.log(songQueryItem);
    const songId = "1HNkqx9Ahdgi1Ixy2xkKkL";

    if (completeToken) {
      axios
        .get(`${BASE_URL}${rec_End}?seed_tracks=${songId}`, {
          headers: { Authorization: `Bearer  ${completeToken}` },
        })
        .then((res) => {
          // console.log(res.data.tracks);
          setChoices(res.data.tracks);
        });
    }
  }

  function queryHandler(event) {
    event.preventDefault();
    if (queryList.length === 0) {
      alert("please search some songs first come on");
      return;
    } else {
      setSongsSubmitted(!songsSubmitted);
      console.log(songsSubmitted);
    }
  }

  function formHandler(event) {
    event.preventDefault();

    if (event.target[0].value === "") {
      alert("please input a song in the search bar");
      return;
    } else {
      console.log(searchItem);
      setFormSubmitted(!formSubmitted);
      console.log(formSubmitted);
    }
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
            +
          </button>
        </form>
      </div>

      <section className="track-list">
        <form onSubmit={queryHandler}>
          <h1>Song Query</h1>
          {queryList && (
            <ol>
              {queryList.map((songQuery, i) => {
                return (
                  <SongQuery
                    key={i}
                    index={i}
                    trackId={songQuery.id}
                    trackName={songQuery.name}
                    artistId={songQuery.artists[0].id}
                    artistName={songQuery.artists[0].name}
                  />
                );
              })}
            </ol>
          )}
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="choices">
        <h1>Song Recommendations</h1>
        <ol className="choices__list">
          {choices.map((choice, i) => {
            if (i < 5) {
              return (
                <SongFound
                  key={i}
                  index={i}
                  trackId={choice.id}
                  trackName={choice.name}
                  artistId={choice.artists[0].id}
                  artistName={choice.artists[0].name}
                />
              );
            }
          })}
        </ol>
      </section>
    </div>
  );
}

export default App;
