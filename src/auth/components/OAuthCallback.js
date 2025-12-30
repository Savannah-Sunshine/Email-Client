import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { initializeAuth, addAccount } = useAuthStore();
  const processedRef = useRef(false);

  useEffect(() => {
    const processOAuthCallback = async () => {
      if (processedRef.current) return;
      processedRef.current = true;

      const data = searchParams.get('data');
      if (!data) {
        navigate('/login');
        return;
      }

      try {
        const userData = JSON.parse(atob(data));
        const redirectUrl = userData.redirectUrl;
        const joinCode = redirectUrl?.split('/invite/')[1];
        
        if (userData.error === "Account already added") {
          localStorage.removeItem('pendingLoginEmail');
          localStorage.removeItem('returnPath');
          localStorage.removeItem('addingAccount');
          
          toast('This account has already been added');
          navigate(redirectUrl || '/', {
            replace: true,
            state: { inviteProcessed: !!joinCode }
          });
          return;
        }
        
        const sessionValid = await initializeAuth();
        
        if (!sessionValid) {
          toast.error('Session validation failed');
          navigate('/login');
          return;
        }
        
        // Add the account to activeAccounts
        await addAccount(userData.email);

        // Clean up stored email and flags
        localStorage.removeItem('pendingLoginEmail');
        localStorage.removeItem('returnPath');
        localStorage.removeItem('addingAccount');

        // Navigate to the redirect URL if it exists, otherwise go home
        navigate(redirectUrl || '/', {
          replace: true,
          state: { inviteProcessed: !!joinCode }
        });
      } catch (error) {
        console.error('OAuth callback error:', error);
        toast.error('Authentication failed');
        navigate('/login');
      }
    };

    processOAuthCallback();
  }, [searchParams, navigate]);

  return null;
};

export default OAuthCallback; 