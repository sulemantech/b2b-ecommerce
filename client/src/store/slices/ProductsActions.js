
import { setProducts } from "./product-slice";
import axios from "axios";



export const fetchProducts = () => async (dispatch) => {
    try {
      const productsData = await axios.get(`http://localhost:5001/api/products/all` ).then((res) => {
        return res?.data;
    
      });
        
       
      dispatch(setProducts(productsData));
      console.log("API FETCHING data",productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };

  