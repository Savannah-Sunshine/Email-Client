import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

// Component to initialize authentication state
const AuthInitializer = ({ children }) => {
  const { isInitialized, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isInitialized) {
    return null;
  }

  return children;
};

export default AuthInitializer; 