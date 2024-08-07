import { setCategory } from './store/slices/category-Slice';
import axios from 'axios';
// export const APIHost = "http://localhost:5001"
export const APIHost = "https://devcares.com"




const selectCategory= `${APIHost}/api/products`;
// export const fetchProductsByCategories = async (selectedCategories, isSubCategory=false, offset, sortValue) => {
//   try {
//     var urlEndpoint = selectCategory
//     if(isSubCategory){
//       urlEndpoint = `${APIHost}/api/products/subCategoryProducts`
//     }
//     const response = await axios.get(`${urlEndpoint}/${selectedCategories}`, {
//       params: { offset, sortValue },
//     });
//     if (!response) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return response.data;
    
//   } catch (error) {
//     console.error('Error fetching products by categories:', error);
//     throw error;
//   }
// };
export const fetchProductsByCategories = async (selectedCategories, isSubCategory = false, offset, sortValue) => {
  try {
    let urlEndpoint;
    if (isSubCategory) {
      urlEndpoint = `${APIHost}/api/products/subCategoryProducts`;
    } else {
      urlEndpoint = selectCategory; // Assuming selectCategory is defined elsewhere
    }

    const response = await axios.get(`${urlEndpoint}/${selectedCategories}`, {
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




const getUser = `${APIHost}/api/user/profile`;

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



export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${APIHost}/api/categories/all`);    
    return response.data.filter(category => category.parentId === null);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};


export const fetchProducts = (page, pageSize) => async (dispatch) => {
  try {
    const productsData = await axios.get(`${APIHost}/api/products/clients/all`, {
      params: {
        page,
        pageSize,
      },
    }).then((res) => {
      return res?.data;
    });
    console.log("productAll", productsData);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const sendNotification = async (storedToken, notificationData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(notificationData),
    });

    if (response.ok) {
      console.log("Notification created successfully");
    } else {
      console.error("Failed to create notification");
    }
  } catch (error) {
    console.error("Error creating notification:", error.message);
  }
};


export const fetchNotifications = async (authToken) => {
  try {
    const notificationResponse = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/notifications/specific`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const notifications = await notificationResponse.json();
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};



export const registerUserSSO = async (userData) => {
  try {
    const response = await fetch(
      "http://localhost:5001/api/user/register/sso",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};
