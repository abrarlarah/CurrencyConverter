import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]); // To store all available currencies
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_URL = `https://open.er-api.com/v6/latest/`;

  // Fetch all currencies on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_URL}USD`);
        const currencyList = Object.keys(response.data.rates); // Get all currency codes
        setCurrencies(currencyList);
      } catch (error) {
        console.error("Error fetching currency list:", error);
        alert("Failed to fetch the currency list. Please try again later.");
      }
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      const result = (amount * rate).toFixed(2);
      setConvertedAmount(result);
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      alert("Failed to fetch conversion rates. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(0);
  };

  return (
    
   
    <div className="converter-box">
       
  {/* From Amount and Currency */}
  <div className="input-group">
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Enter amount"
    />
    <select
      value={fromCurrency}
      onChange={(e) => setFromCurrency(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
    
 
  </div>

  <button onClick={handleSwap} className="swap-button">Swap</button>

  {/* To Amount and Currency */}
  <div className="input-group">
    <input type="text" value={convertedAmount} readOnly />
    <select
      value={toCurrency}
      onChange={(e) => setToCurrency(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>

  <button onClick={handleConvert} disabled={loading}>
    {loading ? "Converting..." : `Convert ${fromCurrency} to ${toCurrency}`}
  </button>
  </div>

  

  );
};

export default CurrencyConverter;
