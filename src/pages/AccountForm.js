import React, { useState } from 'react';

const AccountForm = () => {
    const [accountType, setAccountType] = useState('');
    const [initialDeposit, setInitialDeposit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Account Type:
      <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
        <option value="">Select Account Type</option>
        <option value="checking">Checking</option>
        <option value="savings">Savings</option>
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
