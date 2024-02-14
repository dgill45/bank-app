import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  // Simulated API call to fetch user's bank accounts
  useEffect(() => {
    // Replace this with your actual API call to fetch the accounts
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/accounts');
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleAccountClick = (accountId) => {
    // Redirect to individual account page
    navigate.push(`/account/${accountId}`);
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <h2>Your Bank Accounts:</h2>
      {accounts.map((account) => (
        <div key={account.id} className="account-card">
          <h3>{account.name}</h3>
          <p>Balance: {account.balance}</p>
          <button onClick={() => handleAccountClick(account.id)}>View Transactions</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
