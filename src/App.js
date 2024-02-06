// src/App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BankApp from './components/BankApp';
import Landing from './pages/Landing'

function App() {
  return (
    <div className="App">
      <Landing />
      <BankApp />
    </div>
  );
}

export default App;
