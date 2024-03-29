import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import BankApp from './components/BankApp';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path= '/' element= {<Landing />} />
            <Route path= '/signup' element= {<SignUp />} />
            <Route path= '/login' element= {<Login />} />
            <Route path= '/dashboard' element= {<Dashboard />} /> 
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
