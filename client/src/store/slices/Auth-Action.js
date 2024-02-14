
import { login, logout } from './Auth-slice';
import { deleteAllFromCart } from '../slices/cart-slice';
import { deleteAllFromWishlist } from './wishlist-slice';
import {post} from '../../API';

export const navigateAction = (navigate, path) => {
  navigate(path);
};
export const submitLoginAsync = (values, navigate) => async (dispatch) => {

  try {
    const result = await post('/login', values);

    dispatch(login({ user: result.user, token: result.token, role: result.role }));
    
    console.log('Login successful:', result.token);
    
    // Redirect based on role
    if (result.role === 'admin') {
      console.log('Login roleeee:', result.role);
      console.log("admin running");
      //admin navgation setting here 
      // navigate('../../../../admin/src/pages/Dashboard/ECommerce');

    } else if (result.role === 'supplier') {
      console.log("user running");
      navigate('/');
    }

  }
  catch (error) {
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
