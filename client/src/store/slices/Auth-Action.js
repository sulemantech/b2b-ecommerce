
// import axios from 'axios';
// import { login } from './Auth-slice';
// import { logout } from './Auth-slice';
// import { deleteAllFromCart } from '../slices/cart-slice';
// import { deleteAllFromWishlist } from './wishlist-slice';


// export const navigateAction = (navigate, path) => {
//   navigate(path);
// };


// const API_URL = 'http://localhost:5001/api/signin';

// export const submitLoginAsync = (values, navigate) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, values, {
//       headers: {
//         'Content-Type': 'application/json',
        
//       },
//     });

//     const result = response.data;

//     if (result.token) {
//       dispatch(login({ user: result.userData, token: result.token }));
//       console.log(result.token);
//       dispatch(login({ user: result.userData,token: result.token }));
//       navigate('/');
//     } else {
//       alert(result.message);
//     }

//   } catch (error) {
//     console.error('Error during login:', error);
//   }
// };

// export const logoutAsync = () => async (dispatch) => {
//   try {
//     dispatch(logout());

//     localStorage.clear();
  
//     dispatch(deleteAllFromCart());
//     dispatch( deleteAllFromWishlist());
//   } catch (error) {
//     console.error('Error during logout:', error);
//   }
// };

// auth-actions.js
// Auth-actions.js


import { login, logout } from './Auth-slice';
import { deleteAllFromCart } from '../slices/cart-slice';
import { deleteAllFromWishlist } from './wishlist-slice';
import {post} from './API';

export const navigateAction = (navigate, path) => {
  navigate(path);
};
export const submitLoginAsync = (values, navigate) => async (dispatch) => {
  try {
    const result = await post('/login', values);

    dispatch(login({ user: result.user, token: result.token }));
    console.log('Login successful:', result.token);
    navigate('/');
  } catch (error) {
    alert(error.message);
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    const result = await logoutAsync();
    dispatch(logout());
    localStorage.clear();

    dispatch(deleteAllFromCart());
    dispatch(deleteAllFromWishlist());

    console.log('Logout successful:', result.success);
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
