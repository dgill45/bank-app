import React from 'react';
import ButtonComponent from './ButtonComponent';

const AccountCard = ({account, onViewAccountDetails }) => {

  const handleViewDetailsClick  = () => {
    console.log("Viewing account details for account:", account.id);
    onViewAccountDetails(account.id);
  };
    
    return (
        <div className="account-card">
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
          <ButtonComponent onClick={(handleViewDetailsClick) } text="View Account Activity" />
        </div>
      );
    };
    
    export default AccountCard;