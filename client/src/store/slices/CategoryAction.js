
import axios from "axios";
import { setCategory } from "./category-Slice";



export const fetchCategory = () => async (dispatch) => {
    try {
      const Allcategory = await axios.get(`http://localhost:5001/api/categories/all` ).then((res) => {
        return res?.data;
    
      });
    
      dispatch(setCategory(Allcategory));
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };

  