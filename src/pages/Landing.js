import React from 'react';
import './Landing.css';
import NavbarComponent from '../components/NavbarComponent';
import ButtonComponent from '../components/ButtonComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_LAD_BANK_API_BASE_URL;

function Landing() {

  let navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup')


    axios.post(`${apiUrl}/customers/`, )
    .then((response) => {
      console.log(response);
      navigate('/dashboard');
    }).catch(error => {
      console.error('Error during signup:', error);
    });
  };

  return (
    <div>
        <NavbarComponent />
        <h1>LAD Bank</h1>

      {/* Hero Section */}
      <header className='hero-section'>
        <div className= 'hero-content'>
          <h2 className='hero-title'>Welcome to LAD Bank</h2>
          <p className='hero-subtitle'>Your reliable partner in banking and finance.</p>
          <ButtonComponent className='hero-btn' onClick={goToSignUp}/>
        </div>
      </header>

      {/* Features Section */}
      <section id="features">
        <h3>Features</h3>
        <div>
          <div>
            <h4>Online Banking</h4>
            <p>Manage your finances anywhere, anytime.</p>
          </div>
          <div>
            <h4>Mobile App</h4>
            <p>Keep your bank in your pocket.</p>
          </div>
          <div>
            <h4>Customer Support</h4>
            <p>24/7 support for all your banking needs.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <h3>About LAD Bank</h3>
        <p>We are a leading bank with over 50 years of experience in helping individuals and businesses achieve their financial goals.</p>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <h3>Contact Us</h3>
        <p>Have questions? Our team is here to help. Reach out to us through any of the following channels:</p>
        <ul>
          <li>Email: support@LADBank.com</li>
          <li>Phone: 1-800-LADBANK</li>
          <li>Visit our local branches.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 LAD Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
