import React, { useState, useEffect } from 'react';
import AccountDetails from '../pages/AccountDetails';
import { useAuth } from '../context/AuthContext';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

function BankApp() {
    const { customer } = useAuth();
    const [accounts, setAccounts] = useState([]);

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
        }
    }
    useEffect(() => {
        fetchAccounts();
        }, [customer]);

    const handleTransaction = async (accountId, transactionType, amount, destinationAccountId = null) => {
        const transactionData = {
            transaction: {
                transaction_type: transactionType,
                amount: parseFloat(amount),
            }
        };

        try {
            if (destinationAccountId)   {
                transactionData.transaction.destination_account_id = destinationAccountId;
            }

            const response = await fetch(`${apiUrl}/customers/${customer.id}/accounts/${accountId}/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) throw new Error('Transaction processing failed');
            await fetchAccounts();
        } catch (error) {
            console.error('Error processing transaction:', error);
        }
    };
         
    return (
        <div>
        <h1>Welcome to LAD Bank</h1>
        {accounts.map((account) => (
            <AccountDetails 
                key={account.id} 
                account={account} 
                onTransaction={handleTransaction}
            />
        ))}
        </div>
            
    );
}

export default BankApp;
