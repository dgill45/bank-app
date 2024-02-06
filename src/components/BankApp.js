// src/components/BankApp.js
import React, { useState } from 'react';
import BalanceDisplay from './BalanceDisplay';
import TransactionForm from './TransactionForm';


function BankApp() {
    const [balance, setBalance] = useState(0);

    const handleDeposit = amount => {
        setBalance(prevBalance => prevBalance + parseFloat(amount));
    };

    const handleWithdraw = amount => {
        setBalance(prevBalance => (prevBalance - parseFloat(amount) < 0 ? 0 : prevBalance - parseFloat(amount)));
    };

    return (
        <div>
            <h1>Welcome to BankApp</h1>
            <BalanceDisplay balance={balance} />
            <TransactionForm onDeposit={handleDeposit} onWithdraw={handleWithdraw} />
        </div>
    );
}

export default BankApp;
