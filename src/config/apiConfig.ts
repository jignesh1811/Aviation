const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  ENTERPRISE_CREATION: `${API_BASE_URL}/admin/enterprises`,  
  ADMIN_REGISTRATION: `${API_BASE_URL}/admin_registration`, 
  USER_REGISTRATION: `${API_BASE_URL}/user_registration`,  
};
