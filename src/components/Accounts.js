import React from 'react';

export const Accounts = () =>{
    const [accounts, setAccounts] = useState{[]};

    useEffect(() => {
        const customerId = getLoggedInCustomerId(); // Implement this function based on your auth system
        fetchAccountsForCustomer(customerId);
    })

    const fetchAccountsForCustomer = async (customerId) => {
        try {
          // Replace with the actual URL and ensure it includes the customerId
          // Adjust the URL as needed based on your API's endpoint structure
          const response = await axios.get(`http://localhost:3000/customers/${customerId}/accounts`);
          setAccounts(response.data);
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      };

    
    
    
    return (
        <div className ='accounts-container'>
            <h2>Accounts</h2>
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