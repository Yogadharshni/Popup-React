import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import './App.css'

const Popup = ({ handleClose, show }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [addedSchemas, setAddedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    'first_name',
    'last_name',
    'gender',
    'age',
    'account_name',
    'city',
    'state',
  ]);

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSchemaChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  const handleAddNewSchema = () => {
    if (selectedSchema) {
      // Add the selected schema to the list of added schemas
      setAddedSchemas((prevSchemas) => [...prevSchemas, selectedSchema]);

      // Remove the selected schema from available schemas
      setAvailableSchemas((prevSchemas) => prevSchemas.filter((schema) => schema !== selectedSchema));

      // Reset the selected schema in the dropdown
      setSelectedSchema('');
    }
  };

  const handleNewSchemaChange = (index, e) => {
    // Update the selected schema in the list of added schemas
    const updatedSchemas = [...addedSchemas];
    updatedSchemas[index] = e.target.value;
    setAddedSchemas(updatedSchemas);

    // Add the previously selected schema back to available schemas
    setAvailableSchemas((prevSchemas) => [...prevSchemas, selectedSchema]);

    // Remove the newly selected schema from available schemas
    setAvailableSchemas((prevSchemas) => prevSchemas.filter((schema) => schema !== e.target.value));
  };

  const handleSubmit = () => {
    // Prepare data in the required format
    const requestData = {
      segment_name: segmentName,
      schema: addedSchemas.map((schema) => ({ [schema]: schema.charAt(0).toUpperCase() + schema.slice(1).replace('_', ' ') })),
    };

    // Use the webhook URL obtained from https://webhook.site/
    const webhookURL = 'http://localhost:3001/webhook'

    // Send data to the server using the webhook URL
    fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data sent successfully:', data);
      })
      .catch(error => {
        console.error('Error sending data to server:', error);
      });

    // Close the popup
    handleClose();
  };

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <Paper elevation={3} >
    <div className={showHideClassName}>
      <section className="modal-main">
        <h2>Create a New Segment</h2>
        {/* <label> Enter the Name of the Segment</label> */}
       
          <TextField size="small" style={{width:'300px'}} id="outlined-basic" label="Enter segment name " variant="outlined" type='text' value={segmentName} onChange={handleSegmentNameChange} />
        
        <label>
        <p>To save your Segment, you need to add the schemas to build the query</p>
           <select className='dropdown' value={selectedSchema} onChange={handleSchemaChange}>
             <option  value=""> Select Schema</option>
            {availableSchemas.map((schema) => (
              <option key={schema} value={schema}>
                Label: {schema.charAt(0).toUpperCase() + schema.slice(1).replace('_', ' ')}, Value: {schema}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={handleAddNewSchema}>+ Add new schema</Button>
       
        <div className="blue-box">
          {addedSchemas.map((schema, index) => (
            <div key={index} className="added-schema">
              <select  className='dropdownn' value={schema} onChange={(e) => handleNewSchemaChange(index, e)}>
                <option value="">Select Schema</option>
                {availableSchemas.map((availableSchema) => (
                  <option key={availableSchema} value={availableSchema}>
                    Label: {availableSchema.charAt(0).toUpperCase() + availableSchema.slice(1).replace('_', ' ')}, Value: {availableSchema}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className='btnn'>
        <Button  variant="contained" color="success" onClick={handleSubmit}>Save Segment</Button>
        <Button variant="outlined" color="error" onClick={handleClose}>Close</Button>
        </div>
      </section>
    </div>
    </Paper>
  );
};

export default Popup;















