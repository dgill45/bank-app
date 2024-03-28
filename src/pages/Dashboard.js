import React, { useState, useEffect } from 'react';
import ButtonComponent from '../components/ButtonComponent';
import AccountDetails from './AccountDetails';
import BankApp from '../components/BankApp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

 // Assuming useAuth() gives you access to the logged-in user

const Dashboard = () => {
  const { customer, logout } = useAuth();
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

  const handleAccountClick = async (accountId) => {
      // Simulated API call to fetch account details
      try {
        const response = await fetch(`${apiUrl}/customers/${customer.id}/accounts/${accountId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const accountDetails = await response.json();
        // Redirect to individual account page
        navigate(`/account/${accountId}`, { state: { accountDetails } });
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

  const goToAccountForm = () => {
    // Redirect to the account creation page or handle account creation logic
    navigate('/create-account');
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard, {customer ? customer.first_name : "Customer"}</h1>
      {accounts.length > 0 ? (
        <div>
          <h4>Your Bank Accounts:</h4>
          {accounts.map((account) => (
            <div key={account.id} className="account-card" onClick={() =>handleAccountClick(account.id)}>
              <h3>Account: {account.account_type}</h3>
              <h4>Balance: {account.balance}</h4>
              <div>
                <h5>Recent Transactions:</h5>
                <ul>
                  {account.recent_transactions.map((transaction) => (
                    <li key={transaction.id}>
                      {transaction.transaction_type} - ${transaction.amount} on {new Date(transaction.created_at).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
              <ButtonComponent onClick={() => handleAccountClick(account.id)} text="View Account Activity" />
            </div>
          ))}
        </div>
        ) : (
          <div>
            <h2>You do not have any bank accounts.  </h2>
            <ButtonComponent onClick={goToAccountForm} text='Create New Account' />
          </div>
        )}
      
      <div>
        <ButtonComponent onClick={logout} text ="Logout" />
      </div>
    </div>
  );
};

export default Dashboard;
