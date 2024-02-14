import React, { useState } from 'react';

const Transaction = () => {
  const [balance, setBalance] = useState(0);

  const deposit = (amount) => {
    setBalance(balance + amount);
  };

  const withdraw = (amount) => {
    if (balance >= amount) {
      setBalance(balance - amount);
    } else {
      console.log('Insufficient balance');
    }
  };

  const transfer = (amount, recipient) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      console.log(`Transferred ${amount} to ${recipient}`);
    } else {
      console.log('Insufficient balance');
    }
  };

  return (
    <div>
      <h2>Banking Transaction</h2>
      <p>Balance: {balance}</p>
      <button onClick={() => deposit(100)}>Deposit</button>
      <button onClick={() => withdraw(50)}>Withdraw</button>
      <button onClick={() => transfer(50, 'Recipient')}>Transfer</button>
    </div>
  );
};

export default Transaction;
