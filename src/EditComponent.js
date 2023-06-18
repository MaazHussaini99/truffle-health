import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './EditComponent.css';

const EditComponent = ({ bill, onSave, onCancel }) => {
  const [editedBill, setEditedBill] = useState(bill);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBill((prevBill) => ({
      ...prevBill,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedBill);
  };

  return (
    <Box sx={{ marginTop: 4 }} className="edit-component-container">
      <Typography variant="h6">Edit Bill</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Patient Name"
          name="patientName"
          value={editedBill.patientName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Hospital Name"
          name="hospitalName"
          value={editedBill.hospitalName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Date of Service"
          name="dateOfService"
          type="date"
          value={editedBill.dateOfService}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Bill Amount"
          name="billAmount"
          type="number"
          value={editedBill.billAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2, marginRight: 2 }}>
          Save
        </Button>
        <Button onClick={onCancel} variant="outlined" sx={{ marginTop: 2 }}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default EditComponent;
