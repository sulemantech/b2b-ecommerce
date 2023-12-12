
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
      // axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
      dispatch(login({ user: result.userData, token: result.token }));
      
      console.log(result.token);
      navigate('/');
    } else {
      alert(result.message);
    }

    // Clear the form values
    // console.log("ffffff", values.firstname);
  } catch (error) {
    console.error('Error during login:', error);
  }
};




export const logoutAsync = (yourAuthToken) => async (dispatch) => {
  // const navigate = useNavigate();

  try {
    dispatch(logout());
    localStorage.clear(); 
    localStorage.removeItem('cart');
    // console.log("rrrrrrrrrrr",localStorage);
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
