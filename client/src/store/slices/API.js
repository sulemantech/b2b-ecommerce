
import axios from 'axios';

const Login = 'http://localhost:5001/api/signin';

const api = axios.create({
  baseURL: Login,
  headers: {
    'Content-Type': 'application/json',
  },
});

const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
};
export {post};




const Registration= 'http://localhost:5001/api/signin/register';

const API_Registration = axios.create({
  baseURL: Registration,
  headers: {
    'Content-Type': 'application/json',
  },
});

const postRegistration = async (endpoint, data) => {
  try {
    const response = await API_Registration.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${endpoint}:`, error);
    throw error;
  }
};

export { postRegistration };
