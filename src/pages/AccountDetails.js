import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const AccountDetails = () => {
  const location = useLocation();
  // Ensure that accountDetails are being passed correctly in the state when navigating to this component
  const accountDetails = location.state?.accountDetails;

  // Guard clause in case accountDetails are not available
  if (!accountDetails) {
    return <div>No account details available.</div>;
  }

  return (
    <div>
      <h1>Account Details</h1>
      <h2>Type: {accountDetails.account_type}</h2>
      <h3>Account Number: {accountDetails.account_number}</h3>
      <h3>Balance: ${accountDetails.balance}</h3>
      {/* You can add more details as needed */}
    </div>
  );
};

export default AccountDetails;

