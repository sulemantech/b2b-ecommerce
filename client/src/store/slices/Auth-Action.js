
import axios from 'axios';
import { login } from './Auth-slice';
import { logout } from './Auth-slice';
import { deleteAllFromCart } from '../slices/cart-slice';
import { deleteAllFromWishlist } from './wishlist-slice';


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
      console.log(result.token);
      navigate('/');
    } else {
      alert(result.message);
    }

  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    dispatch(logout());

    localStorage.clear();
  
    dispatch(deleteAllFromCart());
    dispatch( deleteAllFromWishlist());
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
