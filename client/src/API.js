
import axios from 'axios';
// const APIHost = "http://localhost:5001"
const APIHost = "https://devcares.com"




const selectCategory= `${APIHost}/api/products/`;
export const fetchProductsByCategories = async (selectedCategories, offset, sortValue) => {
  try {
    const response = await axios.get(`${selectCategory}/${selectedCategories}`, {
      params: { offset, sortValue },
    });
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
    
  } catch (error) {
    console.error('Error fetching products by categories:', error);
    throw error;
  }
};



const Login = `${APIHost}/api/user`;
const api = axios.create({
  baseURL: Login,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
};




const Registration= `${APIHost}/api/user/register/`;
const API_Registration = axios.create({
  baseURL: Registration,
  headers: {
    'Content-Type': 'application/json',
  },
});
 export const postRegistration = async (endpoint, data) => {
  try {
    const response = await API_Registration.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
};




const userOrder = `${APIHost}/api/order/byrole`;
export const fetchUserOrders = async (storedToken) => {
  try {
    const response = await fetch(userOrder, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; 
  }
};





const orderplace= `${APIHost}/api/order`;
export const placeOrder = async (storedToken, orderData) => {
  try {
    const response = await fetch(`${orderplace}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};




const getUser = `${APIHost}/api/user/user/profile`;

export const getUserInformation = async (token) => {
  try {
    if (token) {
      const response = await fetch(`${getUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
};






