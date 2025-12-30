import { useEffect } from 'react';
import useAuthStore from '../../../store/authStore';

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