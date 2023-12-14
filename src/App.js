// App.js

import React, { useState } from 'react';
import './App.css';
import fetchData from './httpServices.ts';  // Updated import statement

function App() {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [displayValues, setDisplayValues] = useState(null);

  const handleInputChange = (e, inputType) => {
    const value = e.target.value;
    if (inputType === 'A') {
      setInputA(value);
    } else if (inputType === 'B') {
      setInputB(value);
    }
  };

  const handleSendClick = async () => {
    try {
      // Make a GET request using the fetchData function
      const responseData = await fetchData(inputA, inputB);

      // Set the display values
      setDisplayValues({ A: inputA, B: inputB, responseData });
    } catch (error) {
      // Error handling is already done in the fetchData function
    }
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="inputA">A:</label>
        <input
          type="text"
          id="inputA"
          value={inputA}
          onChange={(e) => handleInputChange(e, 'A')}
        />
      </div>
      <div>
        <label htmlFor="inputB">B:</label>
        <input
          type="text"
          id="inputB"
          value={inputB}
          onChange={(e) => handleInputChange(e, 'B')}
        />
      </div>
      <button onClick={handleSendClick}>Send</button>

      {/* Display values of A, B, and response data */}
      {displayValues && (
        <div>
          <p>Values:</p>
          <p>A: {displayValues.A}</p>
          <p>B: {displayValues.B}</p>

          {/* Display response data */}
          {displayValues.responseData && (
            <div>
              <p>Response Data:</p>
              <p>ID: {displayValues.responseData.id}</p>
              <p>First Name: {displayValues.responseData.first_name}</p>
              <p>Last Name: {displayValues.responseData.last_name}</p>
              <p>Email: {displayValues.responseData.email}</p>
              <p>Phone: {displayValues.responseData.phone}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
