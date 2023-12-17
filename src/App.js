// App.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import fetchData from './httpServices.ts';
import './App.css'; 

function App() {
  const [uidQuery, setUidQuery] = useState('');
  const [displayValues, setDisplayValues] = useState(null);

  const handleInputChange = (e) => {
    setUidQuery(e.target.value);
  };

  const handleSearchUsersClick = async () => {
    // Reset the users list while http is resolved 
    setDisplayValues({ users: [], msg: '' })
    try {
      // Make a GET request using the fetchData function
      const users = await fetchData(uidQuery);
      // Set the display values
      setDisplayValues({ users: users, msg:  'Found ' + users.length + ' users'});

    } catch (error) {
      // Error handling is already done in the fetchData function
      setDisplayValues({ msg: 'Error: Api fetch = ' + error });
      console.log('catch err: ', error)
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" gutterBottom className="main">
        messageMonster UI
      </Typography>
      <div>
        <TextField
          label="Search users by ID or leave empty for All Users"
          variant="outlined"
          fullWidth
          margin="normal"
          value={uidQuery}
          onChange={(e) => handleInputChange(e)}  
        />
      </div>
      <div>
        <code>http://localhost:3600/api/users/<span style={{color:'red'}}>{uidQuery}</span></code>
      </div>
      <Button className='searchUsers' variant="contained" color="primary" onClick={handleSearchUsersClick}>
        Search Users
      </Button>

      {displayValues && (
        <div>
          <Typography variant="h2" className='msgBox'>{displayValues.msg}</Typography>
          {displayValues.users && displayValues.users[0] && (
            <div className="card-container">
            {displayValues.users.map((user) => (
              <div className="card" key={user.id}>
                <Typography>ID: {user.id}</Typography>
                <Typography>First Name: {user.first_name}</Typography>
                <Typography>Last Name: {user.last_name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Phone: {user.phone}</Typography>
              </div>
            ))}
          </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default App;
