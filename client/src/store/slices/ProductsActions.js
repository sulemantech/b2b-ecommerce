import axios from "axios";
import { setProducts } from "./product-slice";



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


// export const fetchProductsAction = (page, pageSize) => async (dispatch) => {
//   try {
//     const productsData = await fetchProducts(page, pageSize); // Call the fetchProducts function from the centralized API file
//     dispatch(setProducts(productsData));
//     console.log("productAll", productsData);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//   }
// };
