// App.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import fetchData from './httpServices.ts';
import './App.css'; 

function App() {
  const [uidQuery, setUidQuery] = useState('');
  const [displayValues, setDisplayValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUidQuery(e.target.value);
  };

const handleSearchUsersClick = async () => {
  setIsLoading(true); // Set isLoading to true when starting the API request
  setDisplayValues({ users: [], msg: '' });
  
  try {
    const users = await fetchData(uidQuery);
    setDisplayValues({ users: users, msg: 'Found ' + users.length + ' users' });
  } catch (error) {
    setDisplayValues({ msg: 'Error: Api fetch = ' + error });
    console.log('catch err: ', error);
  } finally {
    setIsLoading(false); // Set isLoading back to false after the request is complete (whether it was successful or not)
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
      <Button className='searchUsers' variant="contained" color="primary" onClick={handleSearchUsersClick} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Search Users'}
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
