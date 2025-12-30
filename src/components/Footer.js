import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Company</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Use Cases</h3>
          <ul>
            <li><a href="#">Government</a></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">Manufacturing</a></li>
            <li><a href="#">Healthcare</a></li>
            <li><a href="#">Financial Services</a></li>
            <li><a href="#">Other</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Terms & policies</h3>
          <ul>
            <li><a href="#">Terms of use</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerCopyright}>
          <span>Emails</span>
          <span className={styles.copyrightText}>© 2024 </span>
        </div>
        <div className={styles.socialLinks}>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Support</a>
          
          
       
        </div>
      </div>




    </footer>
  );
};

export default Footer; 