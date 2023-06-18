import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Summary = ({ formData, onEdit }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Summary</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Patient Name: {formData.patientName}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Date of Service: {formData.dateOfService}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Bill Amount: {formData.billAmount}
      </Typography>
      {formData.billImage && (
        <div>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Bill Image:
          </Typography>
          <img
            src={formData.billImage}
            alt="Bill"
            style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '1rem' }}
          />
        </div>
      )}
      <Button onClick={onEdit} variant="contained">
        Edit
      </Button>
    </Box>
  );
};

export default Summary;