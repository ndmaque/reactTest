// App.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import fetchData from './httpServices.ts';

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
    //let responseData = null
    setDisplayValues({ A: inputA, B: inputB, responseData: null })
    try {
      // Make a GET request using the fetchData function
      const responseData = await fetchData(inputA, inputB);
      
      // Set the display values
      setDisplayValues({ A: inputA, B: inputB, responseData });
    } catch (error) {
      // Error handling is already done in the fetchData function
      console.log('catch err: ', error)
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" gutterBottom style={{ marginTop: '100px' }}>
        Users
      </Typography>
      <Typography variant="body1" paragraph>
        Enter values for A and B, then click the "Search Users by ID" button to fetch data.
        The information you enter will be added to the API URL. For example, if you
        enter "valueA" for A and "valueB" for B, the API request URL will be:
        <code>http://localhost:3600/api/users/valueA/valueB</code>.
      </Typography>
      <div>
        <TextField
          label="A"
          variant="outlined"
          fullWidth
          margin="normal"
          value={inputA}
          onChange={(e) => handleInputChange(e, 'A')}
        />
      </div>
      <div>
        <TextField
          label="B"
          variant="outlined"
          fullWidth
          margin="normal"
          value={inputB}
          onChange={(e) => handleInputChange(e, 'B')}
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleSendClick}>
        Search Users by ID
      </Button>

      {displayValues && (
        <div>
          <div>
            <Typography variant="h6" className="Values">
              Input Values: A: {displayValues.A} B: {displayValues.B}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" paragraph>
                API URL: <code>http://localhost:3600/api/users/{displayValues.A}/{displayValues.B}</code>
          </Typography>
          {displayValues.responseData && (
            <div>

              <Typography>ID: {displayValues.responseData.id}</Typography>
              <Typography>First Name: {displayValues.responseData.first_name}</Typography>
              <Typography>Last Name: {displayValues.responseData.last_name}</Typography>
              <Typography>Email: {displayValues.responseData.email}</Typography>
              <Typography>Phone: {displayValues.responseData.phone}</Typography>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default App;
