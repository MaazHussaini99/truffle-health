import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Form.css';

const Form = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    if (e.target.name === 'billImage') {
      const file = e.target.files[0];
      convertImageToBase64(file)
        .then((base64) =>
          setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: base64,
          }))
        )
        .catch((error) => console.error(error));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Box sx={{ marginTop: 4 }} className="form-container">
      <Typography variant="h6">Upload a Medical Bill</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Patient Name"
          name="patientName"
          value={formData.patientName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Hospital Name"
          name="hospitalName"
          value={formData.hospitalName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Date of Service"
          name="dateOfService"
          type="date"
          value={formData.dateOfService || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="Bill Amount"
          name="billAmount"
          type="number"
          value={formData.billAmount || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <input
          type="file"
          accept="image/*"
          name="billImage"
          onChange={handleChange}
          style={{ marginTop: '1rem' }}
        />
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Form;
