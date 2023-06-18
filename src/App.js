import React, { useState, useEffect } from 'react';
import Form from './Form';
import Summary from './Summary';
import Home from './Home';
import Button from '@mui/material/Button';
import EditComponent from './EditComponent';
import './App.css';

function App() {
  const [formData, setFormData] = useState(null);
  const [page, setPage] = useState('home');
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem('bills'));
    if (storedBills) {
      setBills(storedBills);
    }
  }, []);

  const handleFormSubmit = (data) => {
    if (formData) {
      const updatedBills = bills.map((bill, index) => (index === formData.index ? data : bill));
      setBills(updatedBills);
      localStorage.setItem('bills', JSON.stringify(updatedBills));
    } else {
      const updatedBills = [...bills, data];
      setBills(updatedBills);
      localStorage.setItem('bills', JSON.stringify(updatedBills));
    }
    setPage('home');
    setFormData(null);
  };

  const handleEdit = () => {
    setPage('form');
  };

  const handleAddBill = () => {
    setPage('form');
    setFormData(null);
  };

  const handleEditBill = (index) => {
    setFormData({ ...bills[index], index });
    setPage('form');
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...bills];
    updatedBills.splice(index, 1);
    setBills(updatedBills);
    localStorage.setItem('bills', JSON.stringify(updatedBills));
  };

  const handleGoBack = () => {
    setPage('home');
    setFormData(null);
  };

  return (
    <div className='app-container'>
      <h1>Medical Bill Upload</h1>
      {page === 'home' && (
        <Home
          bills={bills}
          onAddBill={handleAddBill}
          onEditBill={handleEditBill}
          onDeleteBill={handleDeleteBill}
        />
      )}
      {page === 'form' && (
        <div>
          <Button onClick={handleGoBack} variant="contained">
            Back
          </Button>
          {formData ? (
            <EditComponent bill={formData} onSave={handleFormSubmit} onCancel={handleGoBack} />
          ) : (
            <Form onSubmit={handleFormSubmit} initialData={null} />
          )}
        </div>
      )}
      {page === 'summary' && (
        <div>
          <Button onClick={handleGoBack} variant="contained">
            Back
          </Button>
          <Summary formData={formData} onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
}

export default App;
