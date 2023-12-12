
import axios from 'axios';
import { login } from './Auth-slice';
import { logout } from './Auth-slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const navigateAction = (navigate, path) => {
  navigate(path);
};


const API_URL = 'http://localhost:5001/api/signin';

export const submitLoginAsync = (values, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, values, {
      headers: {
        'Content-Type': 'application/json',
        
      },
    });

    const result = response.data;

    if (result.token) {
      dispatch(login({ user: result.userData, token: result.token }));
      
     
      navigate('/');
    } else {
      alert(result.message);
    }

  } catch (error) {
    console.error('Error during login:', error);
  }
};




export const logoutAsync = (yourAuthToken) => async (dispatch) => {
  
  try {
    dispatch(logout());
    localStorage.clear(); 
    localStorage.removeItem('cart');
   
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
