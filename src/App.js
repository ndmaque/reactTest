import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Users from './components/Users';
import Mqtt from './components/Mqtt'
import Home from './components/Home';
import Messages from './components/Messages';

const App = () => {
  return (
    <Router>
      <Container maxWidth="md">
        <Typography variant="body1" align="center" gutterBottom className="branding">
          messageMonster
        </Typography>
        <div className="navLinks"  align="center">
          <Button component={Link} to="/" variant="text" color="inherit">Home</Button>
          <Button component={Link} to="/users" variant="text" color="inherit">Users</Button>
          <Button component={Link} to="/mqtt" variant="text" color="inherit">Mqtt</Button>
          <Button component={Link} to="/messages" variant="text" color="inherit">Messages</Button>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/mqtt" element={<Mqtt />} />
          <Route exact path="/messages" element={<Messages />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
