import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

 // Assuming useAuth() gives you access to the logged-in user

const Dashboard = () => {
  const { customer } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  // Simulated API call to fetch user's bank accounts
  useEffect(() => {
    // Replace this with your actual API call to fetch the accounts
    const fetchAccounts = async () => {
      if (customer && customer.id) {
      try {
        const response = await fetch(`${apiUrl}/customers/${customer.id}/accounts`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
  }
    fetchAccounts();
  }, [customer]);

  const handleAccountClick = (accountId) => {
    // Redirect to individual account page
    navigate(`/account/${accountId}`);
  };

  const handleCreateAccount = () => {
    // Redirect to the account creation page or handle account creation logic
    navigate('/create-account');
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard, {customer ? customer.first_name : "Customer"}</h1>
      {accounts.length > 0 ? (
        <div>
          <h2>Your Bank Accounts:</h2>
          {accounts.map((account) => (
            <div key={account.id} className="account-card">
              <h3>{account.name}</h3>
              <p>Balance: {account.balance}</p>
              <button onClick={() => handleAccountClick(account.id)}>View Transactions</button>
            </div>
          ))}
        </div>
        ) : (
          <div>
            <h2>You do not have any bank accounts.  </h2>
            <button onClick={handleCreateAccount}>Create New Account</button>
          </div>
        )}
      </div>
  );
};

export default Dashboard;
