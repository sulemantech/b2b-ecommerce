
import { setProducts } from "./product-slice";
import axios from "axios";



export const fetchProducts = (page, pageSize) => async (dispatch) => {
    try {
    
      const productsData = await axios.get(`${process.env.REACT_APP_PUBLIC_URL}/api/products/clients/all` ,{
        params: {
          page,
          pageSize,
        },
      }).then((res) => {
        return res?.data;
      });     
      dispatch(setProducts(productsData));
      console.log("productAll",productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };

  