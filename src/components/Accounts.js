import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

export const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const { customer } = useAuth();

    useEffect(() => {
      if (customer && customer.id) {
          fetchAccountsForCustomer(customer.id);
      }
    }, [customer]);
        
    const fetchAccountsForCustomer = async (customerId) => {
      try {
          const response = await axios.get(`${apiUrl}/customers/${customerId}/accounts`, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    
    return (
        <div className ='accounts-container'>
            <h2>{customer_firstname}'s Accounts</h2>
            <div className='accounts-list'>
                {accounts.map((account, index) =>(
                    <div key={index} className='account-card'>
                     <h4>LAD Bank Savings</h4>
                     <h1>{account.balance}</h1>
                     <h6> Available Balance</h6>
                    </div>
                    ))}
            </div>
        </div>
    )
}