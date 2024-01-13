import React, { useState, useEffect } from 'react';
import { Typography, Container, Badge } from '@mui/material'
import { Button, TextField, TextareaAutosize, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import DataTable from './views/gridList.tsx';
import mqtt from 'mqtt';

const Mqtt = () => {

  // we need a client outside of useEffect for the publish callback
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [pubTopic, setPubTopic] = useState('');
  const [pubMsg, setPubMsg] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [subTopics, setSubTopics] = useState(['data', 'messages'])

  const handleToggle = () => {
    setFormVisible(!isFormVisible);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPubTopic(null)
    setPubTopic(event.target.value)
  };
  const handleTopicChange = (event) => {
    setPubTopic(event.target.value)
  }
  const handleMsgChange = (event) => {
    setPubMsg(event.target.value)
  }
  const handlePublishClick = () => {
    console.log('Publishing: ', pubTopic, pubMsg)
    client.publish(pubTopic, pubMsg)
  }
  const handleSubTopicsChange = (e) => {
    const subs = e.target.value.replace(/\s/g, '').split(',')
    setSubTopics(subs)
  }

  const handleDeleteMessages = () => {
    setMessages([])
  }

  // useEffect acts a bit like a didMount hook 
  useEffect(() => {
    // Connect to the MQTT broker using correct websocket port at fecking last! 9001 not 1883
    const mqttConfig = { hostname: '192.168.0.20', port: 9001, clientId: 'W520Laptop' }
    const client = mqtt.connect(mqttConfig);
    setClient(client) // update the global client

    // on connect subscribe to a topic
    client.on('connect', () => {
      client.subscribe(subTopics);
      console.log('connectded and subscribed to: ', subTopics)
    });

    // Handle incoming subscription messages
    client.on('message', (topic, message) => {
      console.log('incoming: ', topic, message.toString())
      const msg = { topic: topic.toString(), body: message.toString(), id: client.getLastMessageId() }
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    //Disconnect when the component unmounts
    return () => client.end();
  }, [subTopics, messages]);

  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom className="main">
        Mqtt
      </Typography>

      <Button onClick={handleToggle}>
        {isFormVisible ? 'Hide form' : 'Create message'}
      </Button>
      {isFormVisible && (
        <div>
          <p>Select a pre defined Publish Topic or manually enter one below</p>
          <RadioGroup
            name="option"
            value={selectedOption}
            onChange={handleOptionChange}
            label="Select a Topic"
          >
            <FormControlLabel value="messages" control={<Radio />} label="Messages" />
            <FormControlLabel value="data" control={<Radio />} label="Data" />
            <FormControlLabel value="commands" control={<Radio />} label="Commands" />
          </RadioGroup>
          <br></br>

          <TextField onChange={handleTopicChange} value={pubTopic} label="Mqtt Topic" variant="outlined" />
          &nbsp;
          <TextareaAutosize
            id="message"
            label="a label "
            onChange={handleMsgChange}
            minRows={3}
            maxRows={10}
            placeholder={"Message or JSON..."}
            variant="outlined"
            aria-label="Message or JSON"
          />
          &nbsp;
          <Button aria-label="Publish message" variant="contained" color="primary" onClick={handlePublishClick} >
            Publish
          </Button>
        </div>)}
      <div>
        <TextField onChange={handleSubTopicsChange} value={subTopics.join(',')} label="Subsription Topics (csv)" variant="outlined" />
      </div>

      <Button onClick={handleDeleteMessages} aria-label="Delete messages" variant="contained" color="primary">
        Delete ALL messages
      </Button> &nbsp;
      <Badge showZero badgeContent={messages.length} color="success">
        <MailIcon color="action" />
      </Badge>
      <br /><br />
      {messages.length > 0 && (
        <DataTable tableData={messages} />
      )}
      <br />

      <Typography>Raw data</Typography>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </Container>
  );
};

export default Mqtt;
