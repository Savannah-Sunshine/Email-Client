import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
// import styles from './NavbarLight.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <>
      <button onClick={handleGetStarted} className={styles.getStartedButton}>
        Log in
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <h1 className={styles.title}>Email Client</h1>
          <div className={styles.logo}>
          
            <img src="/logo-landing-page.png" alt="Email Client" />
          </div>
          <div className={styles.navLinks}>
            <a href="/mission">Whitepaper</a>
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
            <a href="/blog">About</a>
            <a href="/contact">Contact</a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar; 