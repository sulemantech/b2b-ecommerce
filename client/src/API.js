
import axios from 'axios';
const APIHost = "http://localhost:5001"


const Login = `${APIHost}/api/signin`;
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




const Registration= `${APIHost}/api/signin/register`;
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




const userOrder = `${APIHost}/api/order/user`;
export const fetchUserOrders = async (token) => {
  try {
    const response = await fetch(userOrder, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
export const placeOrder = async (token, orderData) => {
  try {
    const response = await fetch(`${orderplace}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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




const getUser = `${APIHost}/api/signin/user/profile`;

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


