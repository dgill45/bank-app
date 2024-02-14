import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Customer(){
    
    const [customers, setCustomers] = useState([]);
    
    const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/customers');
      setCustomers(response.data); // or set this data to a state variable
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  

    useEffect(() => {
        fetchCustomers();
    }, []);


  return (
    <div className="customer-container">
      <h2>Customer</h2>
        <div className="customer-list">
            <ul>
                {customers.map((customer, index) => {
                return <li key={index}>{customer.first_name} {customer.last_name}</li>;
                })}
            </ul>
        </div>
    </div>
  );
}