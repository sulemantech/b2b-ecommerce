import { useDispatch } from "react-redux";
import { setProducts } from "./product-slice";
import axios from "axios";



export const fetchProducts = (id) => async (dispatch) => {
    try {
      const productsData = await axios.get(`http://localhost:5000/api/products/all` ).then((res) => {
        return res?.data;
    
      });
        
      dispatch(setProducts(productsData));
      console.log("API FETCHING data productaction, with images api",productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };

  