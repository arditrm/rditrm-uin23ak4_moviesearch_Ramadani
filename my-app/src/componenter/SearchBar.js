  import React, { useState } from "react";

  export default function SearchBar({ setMovies }) {
    const API_KEY = "4692388b";
    const [searchString, setSearchString] = useState("");

    const searchMovies = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchString}`
        );
        const data = await response.json();
        setMovies(data.Search);
      } catch (error) {
        console.error(error);
      }
    };

    const handleSearch = (event) => {
      event.preventDefault();
      searchMovies();
    };

    return (
      <form onSubmit={handleSearch}>
        
      
      </form>
    );
  }
