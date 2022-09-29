import { useState, useEffect } from "react";

import "./App.css";
import SearchIcon from "./Search.svg";
import MoviesCard from "./MoviesCard";

const URL = "http://www.omdbapi.com?apikey=c032e2d7";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <div className='app'>
      <h1>movieLand</h1>
      <div className='search'>
        <input
          placeholder='Search for movie'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MoviesCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>no movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
