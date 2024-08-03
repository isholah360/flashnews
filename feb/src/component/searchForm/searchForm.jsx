import React, { useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

function SearchForm() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
  
    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`http://localhost:5000/api/post/all?search=${query}`);
        if (response.data) {
          navigate('/results', { state: { searchResults: response.data, query } });
          console.log(response.data)
        } else {
          console.warn('No results found');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  return (
    <div>
      <div className="search-form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Here"
          />
          <button className="search-sym">
            <img src="assets/sa.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
