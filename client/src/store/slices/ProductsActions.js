
import { setProducts } from "./product-slice";
import axios from "axios";



export const fetchProducts = (e) => async (dispatch) => {
    try {
      // e.preventDefault()
      const productsData = await axios.get(`http://localhost:5001/api/products/all` ).then((res) => {
        return res?.data;
    
      });       
       
      dispatch(setProducts(productsData));
      console.log("producttttttttt",productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };

  