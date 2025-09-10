export const getTokenFromStorage = () => {
  try {
    const tokenData = localStorage.getItem('authToken');
    if (!tokenData) return null;
    return JSON.parse(tokenData);
  } catch (error) {
    console.error("Error reading token from localStorage:", error);
    return null;
  }
};

export const isTokenValid = () => {
  const tokenData = getTokenFromStorage();
  
  if (!tokenData || !tokenData.token || !tokenData.expiry) {
    return false;
  }
  
  const now = new Date();
  const expiry = new Date(tokenData.expiry);
  
  // Check if token is expired
  if (now > expiry) {
    console.log("Token expired, removing from storage");
    localStorage.removeItem('authToken');
    return false;
  }
  
  return true;
};

export const clearExpiredToken = () => {
  if (!isTokenValid()) {
    localStorage.removeItem('authToken');
    return true;
  }
  return false;
};