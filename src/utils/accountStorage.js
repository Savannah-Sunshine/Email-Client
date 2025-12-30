const STORED_ACCOUNTS_KEY = 'stored_accounts_v1';

export const getStoredAccounts = () => {
  try {
    const stored = localStorage.getItem(STORED_ACCOUNTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading stored accounts:', error);
    return [];
  }
};

export const setStoredAccounts = (accounts) => {
  try {
    const accountsToStore = accounts.map(account => ({
      email: account.email,
      lastActiveSpace: account.lastActiveSpace,
      sessionId: account.sessionId,
      userID: account.userID
    }));
    localStorage.setItem(STORED_ACCOUNTS_KEY, JSON.stringify(accountsToStore));
  } catch (error) {
    console.error('Error storing accounts:', error);
  }
};

export const setCurrentAccountId = (accountId) => {
  localStorage.setItem('currentAccountId', accountId);
};

export const getCurrentAccountId = () => {
  return localStorage.getItem('currentAccountId');
}; 