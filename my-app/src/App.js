import React, { useState, useEffect } from 'react';
import './App.css';

export default function Search() {
  const API_KEY = '4692388b';
  const [searchString, setSearchString] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (query) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchMovies('james-bond'); // fetch James Bond movies when component first mounts
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchString) {
      searchMovies(searchString);
    } else {
      searchMovies('james-bond'); // fetch James Bond movies again if search string is empty
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies"
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {movies && movies.map((movie) => (
        <div key={movie.imdbID}>
          <h2>{movie.Title}</h2>
          <p><strong>Regissør:</strong> {movie.Director}</p>
          <p><strong>År publisert:</strong> {movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </div>
  );
}
