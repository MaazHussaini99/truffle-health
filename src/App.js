import React, { useState, useEffect } from 'react';
import Form from './Form';
import Summary from './Summary';
import Home from './Home';
import Button from '@mui/material/Button';
import EditComponent from './EditComponent';
import './App.css';
import { auth } from './fire';
import Login from './Login';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [formData, setFormData] = useState(null);
  const [page, setPage] = useState('home');
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const storedBills = JSON.parse(localStorage.getItem('bills'));
    if (storedBills) {
      setBills(storedBills);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    getAuth();
    signInWithEmailAndPassword(auth, email, password)

      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleFormSubmit = (data) => {
    if (formData) {
      const updatedBills = bills.map((bill, index) =>
        index === formData.index ? data : bill
      );
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

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="app-container">
      {user ? (
        <>
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
                <EditComponent
                  bill={formData}
                  onSave={handleFormSubmit}
                  onCancel={handleGoBack}
                />
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
          <Button
            onClick={handleLogout}
            variant="contained"
            className="logout-button"
          >
            Logout
          </Button>
        </>
      ) : (
        <Login
          setUser={setUser}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          emailError={emailError}
          setEmailError={setEmailError}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
        />
      )}
    </div>
  );
}

export default App;
