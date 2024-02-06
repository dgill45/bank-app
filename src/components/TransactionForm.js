// src/components/TransactionForm.js
import React, { useState } from 'react';

function TransactionForm({ onDeposit, onWithdraw }) {
    const [amount, setAmount] = useState(0);

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <button onClick={() => onDeposit(amount)}>Deposit</button>
            <button onClick={() => onWithdraw(amount)}>Withdraw</button>
        </div>
    );
}

export default TransactionForm;
