import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = ({ bills, onAddBill, onEditBill, onDeleteBill }) => {
  const [selectedBill, setSelectedBill] = useState(null);

  const handleBillClick = (bill) => {
    setSelectedBill(bill);
  };

  const handleBackClick = () => {
    setSelectedBill(null);
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      {selectedBill ? (
        <Box>
          <Typography variant="h6">Bill Summary</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Patient Name:</strong> {selectedBill.patientName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Hospital Name:</strong> {selectedBill.hospitalName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Hospital Address:</strong> {selectedBill.hospitalAddress}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Date of Service:</strong> {selectedBill.dateOfService}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Bill Amount:</strong> {selectedBill.billAmount}
            </Typography>
            {selectedBill.billImage && (
              <img
                src={selectedBill.billImage}
                alt="Bill"
                style={{ width: '300px', height: '300px', objectFit: 'cover', marginTop: '1rem' }}
              />
            )}
          </Box>
          <Button onClick={handleBackClick} variant="contained" sx={{ marginTop: 2 }}>
            Back
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h6">Uploaded Bills</Typography>
          {bills.length === 0 ? (
            <Typography variant="body1">No bills uploaded.</Typography>
          ) : (
            <TableContainer sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Hospital Name</TableCell>
                    <TableCell>Date of Service</TableCell>
                    <TableCell>Bill Amount</TableCell>
                    <TableCell>Bill Image</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bills.map((bill, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleBillClick(bill)}
                      style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                    >
                      <TableCell>{bill.patientName}</TableCell>
                      <TableCell>{bill.hospitalName}</TableCell>
                      <TableCell>{bill.dateOfService}</TableCell>
                      <TableCell>${bill.billAmount}</TableCell>
                      <TableCell>
                        {bill.billImage && (
                          <img
                            src={bill.billImage}
                            alt="Bill"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => onEditBill(index)} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDeleteBill(index)} aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Button onClick={onAddBill} variant="contained" sx={{ marginTop: 2 }}>
            Add New Bill
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home;
