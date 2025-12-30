import { useState, useEffect } from 'react';
import styles from './MobileBlocker.module.css';

const MobileBlocker = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobileMessage}>
        <h1>Desktop Only</h1>
        <p>This application is only available on desktop devices.</p>
        <p>Please use computer to access all features.</p>
      </div>
    );
  }

  return children;
};

export default MobileBlocker;