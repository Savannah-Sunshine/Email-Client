import { create } from 'zustand'
// import { getUserByAEmailAddress, getOnboardingStatus } from '../services/userService';
// import { getStoredAccounts, setStoredAccounts } from '../utils/accountStorage';

// TODO: This whole page needs to be tested thoroughly
const useAuthStore = create((set, get) => ({
  userID: null,
  emails: null,
  sessionId: null,
  isAuthenticated: false,
  onboardingStatus: '',
  isInitialized: false,
  activeEmails: [],

  setActiveEmails: (emails) => {
    set({ activeEmails: emails });
  },
  
  addEmail: async (newEmailAddress) => {
    // const currentEmails = get().activeEmails;
    // const existingEmail = currentEmails.find(emailAddress => emailAddress === newEmailAddress);

    // if (existingEmail) {
    //   throw new Error('Email already added');
    // }

    // try {
    //   const userID = await getUserByAEmailAddress(newEmailAddress);
    //   // const lastActiveSpace = await getLastActiveEmailSpace(userID); //todo: use to help with refresh?
    //   let onboardingStatus = '/email/newSpace';

    //   const newEmail = { userID, newEmailAddress, onboardingStatus };
    //   const newEmailsSpaces = [...currentEmails, newEmailAddress];
      
    //   // Auth store state
    //   get().setActiveEmails(newEmailsSpaces);
    //   set({
    //     currentAccount: newEmail,
    //     emailsAddress: newEmailAddress,
    //     userID: userID,
    //     onboardingStatus: onboardingStatus,
    //     isAuthenticated: true
    //   });

    //   // Local storage
    //   setStoredAccounts(newEmailsSpaces);

    // } catch (error) {
    //   console.error('Error adding account:', error);
    //   throw error;
    // }
  },

  switchEmailSpace: async (emailAddress) => {
    const currentEmails = get().activeEmails;
    
    const emailSpace = currentEmails.find(acc => acc.emailAddress === emailAddress);
    
    if (emailSpace) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}auth/switch-session`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ emailAddress })
        });
  
        if (!response.ok) {
          console.error('Switch session API failed:', response.status);
          throw new Error('Failed to switch session');
        }
  
        const userData = await response.json();
        
        set({ 
          currentAccount: emailSpace,
          email: userData.email,
          userID: userData.userID,
          // TODO: May need more data
          onboardingStatus: userData.onboardingStatus,
          isAuthenticated: true
        });
      } catch (error) {
        console.error('Error switching account:', error);
        throw error;
      }
    }
  },

  initializeAuth: async () => {
    // try {
    //   const response = await fetch(`${process.env.REACT_APP_API_URL}auth/check-session`, {
    //     credentials: 'include'
    //   });

    //   if (response.ok) {
    //     const userData = await response.json();
    //     const storedAccounts = getStoredAccounts();

    //     // Validate and fetch full details for stored accounts
    //     const validatedAccounts = await Promise.all(
    //       storedAccounts.map(async (stored) => {
    //         try {
    //           const userID = await getUserByAEmailAddress(stored.email);
              
    //           let userRole = null;
    //           let onboardingStatus = 'email/newSpace';

    //           if (lastActiveSpace) {
    //             onboardingStatus = await getOnboardingStatus(userID);
    //           }

    //           return {
    //             email: stored.email,
    //             userID,
    //             // todo: more?
    //             userRole,
    //             onboardingStatus
    //           };
    //         } catch {
    //           return null;
    //         }
    //       })
    //     );

    //     const activeAccounts = validatedAccounts.filter(Boolean);
    //     setStoredAccounts(activeAccounts);

    //     // Prioritize the stored current account
    //     const currentAccount = currentAccountId ? 
    //       activeAccounts.find(acc => acc.userID === currentAccountId) :
    //       activeAccounts.find(acc => acc.email === userData.email);

    //     if (currentAccount) {
    //       setCurrentAccountId(currentAccount.userID);
    //     }

    //     set({ 
    //       activeAccounts,
    //       currentAccount,
    //       email: currentAccount?.email || userData.email,
    //       // todo: more?
    //       onboardingStatus: currentAccount?.onboardingStatus || userData.onboardingStatus,
    //       isAuthenticated: true
    //     });
    //   }

    //   set({ isInitialized: true });
    //   return true;
    // } catch (error) {
    //   console.error('Auth initialization error:', error);
    //   set({ isAuthenticated: false, isInitialized: true });
    //   return false;
    // }
  },

  setOnboardingStatus: (status) => set({ onboardingStatus: status }),
  setUserID: (userID) => set({ userID }),
  
  terminateUserSession: async (accountToRemove) => {
    // const accounts = get().activeAccounts;
    // // Use either the passed account or current account
    // const accountToLogout = accountToRemove || get().currentAccount;
    
    // if (accountToLogout) {
    //   try {
    //     // Filter out the specific account we're logging out
    //     const remainingAccounts = accounts.filter(acc => acc.email !== accountToLogout.email);

    //     // Update store state and localStorage
    //     set({ activeAccounts: remainingAccounts });
    //     setStoredAccounts(remainingAccounts);
        
    //     if (remainingAccounts.length === 0) {
    //       set({ 
    //         isAuthenticated: false, 
    //         emails: null, 
    //         userID: null,
    //         emailSpaceID: null,
    //         onboardingStatus: null,
    //         currentAccount: null,
    //         sessionId: null
    //       });
          
    //       window.location.href = '/';
    //     }
    //   } catch (error) {
    //     console.error('Error in session termination:', error);
    //     throw error;
    //   }
    // }
  },

  clearCurrentSession: () => {
    // Clear only session-related data but keep account info
    set({
      isAuthenticated: false,
      sessionId: null,
    });
  },

  setEmailSpaces: (emailspaces) => {
    set(state => {
      const updatedAccounts = state.activeAccounts.map(account => ({
        ...account,
        emailspaces: account.email === state.email ? emailspaces : account.emailspaces
      }));
      
      return {
        activeAccounts: updatedAccounts
      };
    });
  }
}));

export default useAuthStore;