import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import useThemeStore from './store/themeStore';

import AuthInitializer from './components/AuthInitializer';
import MobileBlocker from './components/MobileBlocker';
import { RootPage } from './pages/RootPage';


export default function App() {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <MobileBlocker>
      <AuthInitializer>
        <Router>
          <Routes>

            <Route path="/" element={<RootPage />} />
            {/* 
            <Route path="/login" element={<LoginView />} />
            <Route path="/logout" element={<LogoutView />} />
            <Route path="/privacy" element={<PrivacyPolicyView />} />
            <Route path="/create/user" element={<ProtectedRoute requiredStatus="create/user"><UserDetailsStep/></ProtectedRoute>} />

            <Route path="/email/:emailspaceID" element={
              <ProtectedRoute requiredStatus="completed"><HomeView /></ProtectedRoute>
            } />
            <Route path="/email/newSpace" element={<ProtectedRoute requiredStatus="completed"><CreateSpaceView /></ProtectedRoute>} />
            
            <Route path="/recovery" element={<KeyRecoveryPortal />} />

            <Route path="/oauth/callback" element={<OAuthCallback />} />

            <Route path="*" element={<ProtectedRoute requiredStatus="completed"><NotFoundView /></ProtectedRoute>} /> */}
          </Routes>
        </Router>
      </AuthInitializer>
      <ToastContainer position="top-right" autoClose={3000} />
    </MobileBlocker>
  );
}