import React, { useState } from 'react'
import { Typography, Container } from '@mui/material'
import fetchData from '../services/httpServices.ts'
import '../App.css'
import SearchBar from './forms/SearchBar.js'
import DataTable from './views/gridList.tsx'

const Messages = () => {

  // inputText will be updated when the user clicks the button
  const [inputText, setInputText] = useState('');
  const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // config to pass to the searchbar
  const info = {
    buttonText: 'Search Messages',
    inputLabel: 'Leave empty for All Messages',
    displayMsg: 'a very helpful display message',
    apiUrl: 'http://localhost:3600/api/messages'
  }
  const [formInfo, setFormInfo] = useState(info)

  // callback func passed down to searchbar button returns input
  const handleSubmitClick = async (searchValue) => {
    setApiData([]); // empty the users display
    setInputText(searchValue) // update inputText state 
    setIsLoading(true) // should update SearchBar spinner/disabled
    const url = `${info.apiUrl}/${inputText}`
    try {
      const response = await fetchData(url);
      setApiData(response)
      info.displayMsg = `Search for "${searchValue}" found ${apiData.length} Users`
      setFormInfo(info)
    }
    catch (error) {
      info.displayMsg = `ApiError:  ${error}`
      setFormInfo(info)
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
        Messages
      </Typography>
      <SearchBar formInfo={formInfo} isLoading={isLoading} onClick={handleSubmitClick} onInput={handleInputChange} />
      <Typography variant="body2" gutterBottom>
        <code>{info.apiUrl}/<span style={{ color: 'red' }}>{inputText}</span></code>
      </Typography>
      <DataTable tableData={apiData}/>
    </Container>
  );
};

export default Messages;
