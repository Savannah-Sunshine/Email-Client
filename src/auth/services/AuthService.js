const sendLoginLink = async (email) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending login link:', error);
    return false;
  }
};

const logout = async (email) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

const verifyToken = async (code, joinCode) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ code, joinCode }),
    });

    if (!response.ok) {
      return false;
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

const initiateGoogleLogin = async (redirectUrl) => {
  try {
    const state = JSON.stringify({
      redirectUrl: redirectUrl || '',
      cookies: {}
    });
    
    window.location.href = `${process.env.REACT_APP_API_URL}auth/google?prompt=select_account&state=${btoa(state)}`;
  } catch (error) {
    console.error('Error initiating Google login:', error);
    return false;
  }
};

export { sendLoginLink, logout, verifyToken, initiateGoogleLogin };