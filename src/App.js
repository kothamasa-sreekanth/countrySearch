import React, { useState, useEffect } from 'react';
import CountryCard from './CountryCard';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Could not fetch countries.');
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

      {error && <p className="error">{error}</p>}

      <div className="countryContainer">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <CountryCard 
              key={country.cca3} 
              name={country.common || 'Unknown'} 
              flag={country.png || ''}
            />
          ))
        ) : (
          <p>No matching countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;