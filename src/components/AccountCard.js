import React from 'react';
import ButtonComponent from './ButtonComponent';

const AccountCard = ({account, onViewAccountDetails }) => {
    
    return (
        <div className="account-card" onClick={() => onViewAccountDetails(account.id)}>
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
          <ButtonComponent onClick={() => onViewAccountDetails(account.id)} text="View Account Activity" />
        </div>
      );
    };
    
    export default AccountCard;