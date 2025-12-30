import useAuthStore from '../../store/authStore';
import { Navigate } from 'react-router-dom'; 
import { LandingPage } from '../../pages/LandingPage/components/LandingPage';

// Define the order of onboarding steps for sequential navigation
const ROUTE_ORDER = { '/': 0, 'create/space': 1, 'create/backup': 2, 'create/user': 3, 'create/invites': 4, 'completed': 5 };

const ProtectedRoute = ({ children, requiredStatus }) => {
  const { isAuthenticated, onboardingStatus, isInitialized, spaceID } = useAuthStore();

  if (!isInitialized) {
    return null;
  }

  // If user is not authenticated accessing a protected route, navigate to landing page
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // For new users without an onboardingStatus, allow them to start at create/space
  if (!onboardingStatus && requiredStatus === 'create/space') {
    return children;
  }

  // For onboarding routes, enforce sequential navigation
  if (requiredStatus.startsWith('create/')) {
    const currentStep = ROUTE_ORDER[onboardingStatus];
    const requestedStep = ROUTE_ORDER[requiredStatus];

    // Don't allow access to future steps
    if (requestedStep > currentStep) {
      return <Navigate to={`/${onboardingStatus}`} replace />;
    }

    // Don't allow access to previous steps
    if (requestedStep < currentStep) {
      // Onboarding completed but tries to access a previous step
      if (onboardingStatus === 'completed') {
        return <Navigate to={`/client/${spaceID}`} replace />;
      }
      return <Navigate to={`/${onboardingStatus}`} replace />;
    }
  }

  return children;
};

export { ProtectedRoute };