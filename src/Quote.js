import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quote.css';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  const fallbackQuotes = [
    "Life is what happens when you're busy making other plans.",
    "The only way to do great work is to love what you do.",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    "You miss 100% of the shots you don’t take.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
  ];

  // Choose a random fallback quote to display initially
  const getRandomFallbackQuote = () => {
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  };

  // Fetch quote from the API
  const fetchQuote = async () => {
    setError('');
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      setQuote(response.data.slip.advice);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setError('Failed to fetch quote. Showing fallback quote.');
    }
  };

  // Set the initial fallback quote and fetch a new quote in the background
  useEffect(() => {
    setQuote(getRandomFallbackQuote()); // Show fallback quote immediately
    fetchQuote(); // Fetch a new quote in the background
  }, []);

  return (
    <div className="quote-container">
      {error && <p className="error">{error}</p>}
      <p className="quote">"{quote}"</p>
      <button onClick={fetchQuote}>Get New Quote</button>
    </div>
  );
};

export default Quote;
