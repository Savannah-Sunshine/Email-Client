import styles from '../css/LoginForm.module.css';
import icon from '../../assets/icons/Google.svg';
import logo from '../../assets/icon.png' // !Todo, replace with svg
import { initiateGoogleLogin } from '../services/AuthService';

function LoginForm({ email, setEmail, handleLogin, error, redirectUrl }) {
  const isEmailValid = email.length > 0;  // Simple validation, you might want to add proper email validation

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email);
  };

  const handleGoogleLogin = () => {
    initiateGoogleLogin(redirectUrl);
  };

  return (
    <form onSubmit={onSubmit} className={styles.loginForm}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <h1 className={styles.loginForm__title}>Log in</h1>
      <input type="email" className={styles.emailInput}
        value={email}
        autoComplete="email"  
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        required
        maxLength={50}
      />
      <button 
        className={`${styles.secondary_button} ${isEmailValid ? styles.enabled : styles.disabled}`} 
        type="submit"
        disabled={!isEmailValid}
      >
        Continue
      </button>
      <p className={styles.or}>OR</p>
      <button 
        type="button"
        className={styles.secondary_button}
        onClick={handleGoogleLogin}
      >
        <img src={icon} alt="Google Icon" className={styles.googleIcon}/> 
        Log in with Google
      </button>

      <p className={styles.terms}>By continuing, you agree to our <a href="/privacy" className={styles.termsLink}>Terms and Conditions</a>.</p>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export { LoginForm };