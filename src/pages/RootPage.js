import useAuthStore from '../store/authStore';
import { LandingPage } from './LandingPage/components/LandingPage';
import { Navigate } from 'react-router-dom';

const RootPage= () => {
  const { isAuthenticated, emailspaceID, onboardingStatus } = useAuthStore();
  
  if (!isAuthenticated) {
    return <LandingPage />;
  }
  
  if (onboardingStatus && onboardingStatus !== 'completed') {
    return <Navigate to={`/${onboardingStatus}`} replace />;
  }

  if (onboardingStatus === 'completed' && emailspaceID) {
    return <Navigate to={`/email/${emailspaceID}`} replace />;
  }

  return <Navigate to="/email/newSpace" replace />;
};

export { RootPage }; 