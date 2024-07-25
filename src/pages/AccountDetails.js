import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useParams } from 'react-router-dom';

const AccountDetails = () => {
  const { customer } = useAuth();
  const location = useLocation();
  const { accountId } = useParams();
  const [account, setAccount] = useState(location.state?.accountDetails);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (!account) {
        try {
          const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;
          const response = await fetch(`${apiUrl}/customers/${customer.id}/accounts/${accountId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          setAccount(data);
        } catch (error) {
          console.error('Error fetching account details:', error);
        }
      }
    };
    if (!account) {
      fetchAccountDetails();
    }
  }, [account, customer.id, accountId]);

  // Guard clause in case accountDetails are not available
  if (!account) {
    return <div>No account details available.</div>;
  }

  return (
    <div>
      <h1>{account.account_type} Account Details</h1>
      <h2>Account Number: {account.id}</h2>
      <h2>Balance: {account.balance}</h2>

      <div>
        <h4>Transactions</h4>
        {account.transactions.length > 0 ? (
          <ul>
            {account.transactions.map((transaction, index) => (
              <li key={index}>
                <p>Type: {transaction.transaction_type}</p>
                <p>Amount: {transaction.amount}</p>
                <p>Date: {new Date(transaction.created_at).toLocaleDateString()}</p>
            {/* You can add more details as needed */}
              </li>
            ))}
          </ul>
        ) : ( <p>No transactions available.</p> )}
      </div>
    </div>
    );
  }

export default AccountDetails;

