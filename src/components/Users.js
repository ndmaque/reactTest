import React, { useState } from 'react'
import { Typography, Container } from '@mui/material'
import fetchData from '../services/httpServices.ts'
import '../App.css'
import SearchBar from './forms/SearchBar.js'
import DataTable from './views/gridList.tsx'

const Users = () => {

  // inputText will be updated when the user clicks the button
  const [inputText, setInputText] = useState('');
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // config to pass to the searchbar
  const info = {
    buttonText: 'Search Users',
    inputLabel: 'Search users by ID or leave empty for All Users',
    displayMsg: 'a very helpful message',
    apiUrl: 'http://localhost:3600/api/users'
  }
  const [formInfo, setFormInfo] = useState(info)

  // callback func passed down to searchbar, called on button click with user input
  const handleSubmitClick = async (searchValue) => {
    setApiData([]); // empty the users display
    setInputText(searchValue) // update inputText state 
    setIsLoading(true) // should update SearchBar spinner/disabled
    const url = `${formInfo.apiUrl}/${inputText}`
    try {
      const response = await fetchData(url);
      setApiData(response)
      formInfo.displayMsg = `Search for "${searchValue}" found ${apiData.length} Users`
      setFormInfo(formInfo)
    }
    catch (error) {
      formInfo.displayMsg = `ApiError:  ${error}`
      setFormInfo(formInfo)
    }
    finally { setIsLoading(false); }
  };

  // callback func passed down to searchbar hence the async
  const handleInputChange = async (searchValue) => {
    setInputText(searchValue)
  }

  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom className="main">
        Users
      </Typography>
      <SearchBar formInfo={formInfo} isLoading={isLoading} onClick={handleSubmitClick} onInput={handleInputChange} />
      <Typography variant="body2" gutterBottom>
        <code>{formInfo.apiUrl}/<span style={{ color: 'red' }}>{inputText}</span></code>
      </Typography>
      {apiData && apiData.length > 0 && (
        <DataTable tableData={apiData} />)
      }

    </Container>
  );
};

export default Users;
