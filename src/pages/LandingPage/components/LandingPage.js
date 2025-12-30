import { useNavigate } from "react-router-dom";
import Navbar from '../../../components/Navbar';
import styles from "../css/LandingPage.module.css";
// import styles from "../css/LandingPageLight.module.css";
import useAuthStore from '../../../store/authStore';
import { setStoredAccounts } from '../../../utils/accountStorage';
import Footer from '../../../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    setStoredAccounts([]);
  }

  return (
    <div className={styles.landingPage}>
      <Navbar />
      <div> hello</div>
      <Footer />
    </div>
  );
};

export { LandingPage };
