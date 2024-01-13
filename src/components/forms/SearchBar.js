import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import '../../App.css';

const SearchBar = (props) => {
    let { formInfo, isLoading } = props;

    // the value of the user input
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        // call the callback function passed from the parent
        props.onInput(e.target.value);
    };

    const handleSearchButton = async () => {
        // the callback passed down in props
        props.onClick(inputValue);
     };

    return (
        <Container>
            <Typography variant="body2" align="center" gutterBottom className="main">
                Search Bar
            </Typography>
            <TextField
                label={formInfo.inputLabel}
                variant="outlined"
                fullWidth
                margin="normal"
                value={inputValue} 
                //onChange={(e) => handleInputChange(e)}
                onChange={handleInputChange} 
            />
            <Button className='searchUsers' variant="contained" color="primary" onClick={handleSearchButton} disabled={isLoading}>
                {formInfo.buttonText} {isLoading && (<CircularProgress size={24} />)}
            </Button>
            
        </Container>

    );
};

export default SearchBar;