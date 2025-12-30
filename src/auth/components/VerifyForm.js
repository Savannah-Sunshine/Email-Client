import React, { useState, useEffect } from 'react';
import styles from '../css/VerifyForm.module.css';

function VerifyForm({ handleVerify, handleResend, message, error, email }) {
  const [code, setCode] = useState(Array(6).fill(''));
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(code.every((digit) => digit !== ''));
  }, [code]);

  const handleInputChange = (event, index) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    let newCode = [...code];

    if (value.length === 1) {
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if not last index
      if (index < 5) {
        event.target.nextElementSibling.focus();

      } else { // Automatically submit the form when the last digit is entered
        event.target.blur();  
        const fullCode = newCode.join('');
        handleVerify(fullCode);
      }
      
    } else if (value.length > 1) {
      // Handle pasting of a code with more than one character
      const pastedValue = value.slice(0, 6);
      newCode = pastedValue.split('');
      setCode(newCode);
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      event.preventDefault();

      // If current input field has value, clear it
      if (code[index] !== '') {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
        event.target.focus();
      } else if (index > 0) {
        // Move focus to previous input if current input is empty
        const prevInput = event.target.previousElementSibling;
        if (prevInput) {
          prevInput.focus();
          const newCode = [...code];
          newCode[index - 1] = '';
          setCode(newCode);
        }
      }
    }  
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    handleVerify(fullCode);
  };

  const handleResendClick = () => {
    handleResend();
    setCode(Array(6).fill(''));
  };

  return (
    <form onSubmit={onSubmit} className={styles.verifyForm}>
      <p className={styles.title}>Verify your email</p>
      <p className={styles.checkEmail}>
        Check <span className={styles.emailHighlight}>{email}</span> for the 6-digit code.
      </p>
      <div className={styles.codeInputs}>
        {code.map((value, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              maxLength={6} 
              value={value}
              onChange={(event) => handleInputChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={styles.codeInput}
              autoFocus={index === 0 && code.every(c => c === '')}
            />
          </React.Fragment>
        ))}
      </div>
      
      <button type="button" onClick={handleResendClick} className={styles.resendButton}>
        Not seeing email? Check spam or <span className={styles.resendLinkBtn}>resend link</span>
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
}

export { VerifyForm };