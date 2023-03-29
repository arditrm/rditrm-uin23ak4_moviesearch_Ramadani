import React, { useState, useEffect } from 'react';

export default function Search() {
  const API_KEY = '4692388b';
  const [searchString, setSearchString] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchString}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    searchMovies();
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
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </div>
  );
}
