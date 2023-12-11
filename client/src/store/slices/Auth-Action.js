
import axios from 'axios';
import { login } from './Auth-slice';
import { logout } from './Auth-slice';


export const navigateAction = (path) => {
  return { type: 'NAVIGATE', payload: path };
};


const API_URL = 'http://localhost:5001/api/signin';

export const submitLoginAsync = (values) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;

    console.log(result.token);
    console.log('loginnnnnnnn', result);

    if (result.token) {
      dispatch(login(result.userData));
      //  navigate("/");
      dispatch(navigateAction("/"));
    } else {
      alert(result.message);
    }

    // Clear the form values
    // setValues({
    //   firstname: '',
    //   password: '',
    // });
  } catch (error) {
    console.error('Error during login:', error);
  }
};


export const logoutAsync = (token) => async (dispatch) => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(logout());
    dispatch(navigateAction("/"));
    console.log("logout session");
  } catch (error) {
    console.error('Error during logout:', error);
  }
};