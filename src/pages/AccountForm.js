import React, { useState} from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

const AccountForm = () => {
    const [accountType, setAccountType] = useState('');
    const [initialDeposit, setInitialDeposit] = useState('');
    const { customer } = useAuth(); // Assuming you have a useAuth hook to get the customer from the context

    const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!customer || !customer.id) {
        alert("You must be logged in to create an account.");
        return;
    }
      const accountData = {
        account: {
          account_type: accountType,
          balance: initialDeposit,
          customerId: customer.id,
        } 
    };

      try {
          // Adjust the URL and data as needed for your API endpoint
          const response = await axios.post(`${apiUrl}/customers/${customer.id}/accounts`, accountData);
          console.log('Account created successfully', response.data);
          // Redirect or update UI upon successful account creation
          navigate('/dashboard')
      } catch (error) {
          console.error('Error creating account:', error);
          alert('Failed to create account. Please try again.');
      }
};
  return (
    <form onSubmit={handleSubmit}>
    <label>
      Account Type:
      <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
        <option value="">Select Account Type</option>
        <option value="Checking">Checking</option>
        <option value="Savings">Savings</option>
        {/* Add other account types as needed */}
      </select>
    </label>
    <br />
    <label>
      Initial Deposit:
      <input
        type="number"
        value={initialDeposit}
        onChange={(e) => setInitialDeposit(e.target.value)}
        min="0"  // Assuming you don't allow negative values
      />
    </label>
    <br />
    <button type="submit">Create Account</button>
  </form>
);
};
export default AccountForm;
