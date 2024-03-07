
import axios from "axios";
import { setCategory } from "./category-Slice";



export const fetchCategory = () => async (dispatch) => {
    try {
      const Allcategory = await axios.get(`https://devcares.com/api/categories/all` ).then((res) => {
        return res?.data;
    
      });
    
      dispatch(setCategory(Allcategory));
      console.log("allcategorie",Allcategory);
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };

  