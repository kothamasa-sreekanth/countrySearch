// src/components/CountryCard.js
import React from 'react';
import './CountryCard.css';

const CountryCard = ({ name, flag }) => (
  <div className="countryCard">
    <img src={flag} alt={`Flag of ${name}`} />
    <p>{name}</p>
  </div>
);

export default CountryCard;