
import axios from "axios";
import { setCategory } from "./category-Slice";



export const fetchCategory = (id) => async (dispatch) => {
    try {
      const Allcategory = await axios.get(`http://localhost:5000/api/categories/all` ).then((res) => {
        console.log("categoryyyyyyyyes",res.data);
        return res?.data;
        
    debugger
      });
    
      dispatch(setCategory(Allcategory));
      console.log("API FETCHING data",Allcategory);
    } catch (error) {
      console.error('Error fetching products:', error);
      
    }
  };

  