import { useDispatch } from "react-redux";
import { setProducts } from "./product-slice";
import axios from "axios";



export const fetchProducts = () => async (dispatch) => {
    try {
      // Fetch data from the determined API endpoint
      const productsData = await axios.get(`http://localhost:5000/api/` ).then((res) => {
        return res?.data;
        debugger
      });
        
      // Dispatch the setProducts action with the fetched data
      dispatch(setProducts(productsData));
    } catch (error) {
      // Handle any errors, maybe dispatch an error action
      console.error('Error fetching products:', error);
      // You could dispatch an error action here if needed
    }
  };

  