// src/App.js
import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        console.log('Fetched Data:', data); 
        
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Could not fetch countries.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCountries();
  }, []);
  

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchBar"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="countryContainer">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => {
            console.log('Rendering country:', country); 
            return (
              <CountryCard 
                key={country.cca3} 
                name={country.common || 'Unknown'} 
                flag={country.png || ''}
              />
            );
          })
        ) : (
          <p>No matching countries found.</p>
        )}
      </div>

    </div>
  );
};

export default App;
