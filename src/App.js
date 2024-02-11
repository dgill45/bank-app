import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BankApp from './components/BankApp';
import Landing from './pages/Landing';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Landing />
        <BankApp />
      </AuthProvider>
    </div>
  );
}

export default App;
